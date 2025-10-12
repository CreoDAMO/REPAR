
import { create } from 'ipfs-http-client';

// Connect to a public IPFS gateway (can be replaced with your own node)
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

/**
 * Upload evidence to IPFS
 * @param {File|Blob|string} content - The content to upload
 * @returns {Promise<string>} The IPFS hash (CID)
 */
export async function uploadToIPFS(content) {
  try {
    const result = await client.add(content);
    return result.path; // Returns the IPFS hash (CID)
  } catch (error) {
    console.error('Error uploading to IPFS:', error);
    throw error;
  }
}

/**
 * Get IPFS gateway URL for a hash
 * @param {string} hash - The IPFS hash (CID)
 * @returns {string} The gateway URL
 */
export function getIPFSUrl(hash) {
  return `https://ipfs.io/ipfs/${hash}`;
}

/**
 * Upload JSON data to IPFS
 * @param {Object} data - JSON data to upload
 * @returns {Promise<string>} The IPFS hash (CID)
 */
export async function uploadJSONToIPFS(data) {
  const content = JSON.stringify(data, null, 2);
  return uploadToIPFS(content);
}

/**
 * Fetch content from IPFS
 * @param {string} hash - The IPFS hash (CID)
 * @returns {Promise<string>} The content
 */
export async function fetchFromIPFS(hash) {
  try {
    const chunks = [];
    for await (const chunk of client.cat(hash)) {
      chunks.push(chunk);
    }
    return new TextDecoder().decode(chunks[0]);
  } catch (error) {
    console.error('Error fetching from IPFS:', error);
    throw error;
  }
}

export default {
  uploadToIPFS,
  uploadJSONToIPFS,
  fetchFromIPFS,
  getIPFSUrl
};
