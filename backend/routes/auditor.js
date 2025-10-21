const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');
const path = require('path');

/**
 * Run Cerberus Auditor on uploaded files
 * POST /api/auditor/scan
 */
router.post('/scan', async (req, res) => {
  try {
    const { files, threatLevel } = req.body;

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files provided for audit' });
    }

    const auditorPath = path.join(__dirname, '../../auditor/orchestrator.py');
    const python = spawn('python3', [auditorPath, '--files', files.join(','), '--threat-level', threatLevel || 'medium']);

    let output = '';
    let errorOutput = '';

    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    python.on('close', (code) => {
      if (code !== 0) {
        console.error('Auditor error:', errorOutput);
        return res.status(500).json({ 
          error: 'Auditor scan failed', 
          details: errorOutput 
        });
      }

      try {
        const results = JSON.parse(output);
        res.json({
          success: true,
          timestamp: new Date().toISOString(),
          results
        });
      } catch (parseError) {
        console.error('Failed to parse auditor output:', output);
        res.status(500).json({ 
          error: 'Failed to parse audit results',
          rawOutput: output
        });
      }
    });

  } catch (error) {
    console.error('Auditor scan error:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * Get audit history
 * GET /api/auditor/history
 */
router.get('/history', async (req, res) => {
  try {
    const fs = require('fs').promises;
    const reportsPath = path.join(__dirname, '../../auditor/reports');

    const files = await fs.readdir(reportsPath);
    const reports = [];

    for (const file of files) {
      if (file.endsWith('.json')) {
        const content = await fs.readFile(path.join(reportsPath, file), 'utf8');
        reports.push(JSON.parse(content));
      }
    }

    res.json({
      success: true,
      count: reports.length,
      reports: reports.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    });

  } catch (error) {
    console.error('Failed to fetch audit history:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * NFT Auction endpoints
 */
router.post('/nft/auction/create', async (req, res) => {
  try {
    const { nft_id, starting_bid, min_increment, duration_hours } = req.body;

    res.json({
      success: true,
      auction_id: `auction-${Date.now()}`,
      nft_id,
      starting_bid,
      min_increment,
      ends_at: Date.now() + (duration_hours * 3600000)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/nft/auction/:auction_id/bid', async (req, res) => {
  try {
    const { auction_id } = req.params;
    const { bid_amount, bidder } = req.body;

    res.json({
      success: true,
      auction_id,
      current_bid: bid_amount,
      bidder,
      timestamp: Date.now()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/nft/auctions/active', async (req, res) => {
  try {
    res.json({
      auctions: [
        {
          id: 'auction-1',
          nft_id: 'nft-1',
          current_bid: '600000',
          min_bid_increment: '50000',
          bidder_count: 12,
          ends_at: Date.now() + 86400000
        }
      ]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;