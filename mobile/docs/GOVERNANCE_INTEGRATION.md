# Governance Integration - Production Implementation

## ✅ REAL BLOCKCHAIN INTEGRATION

### API Endpoints Used

**1. Fetch Active Proposals:**
```
GET https://rpc.aequitasprotocol.zone:1317/cosmos/gov/v1beta1/proposals?proposal_status=2
```
- Status 2 = PROPOSAL_STATUS_VOTING_PERIOD
- Returns all proposals currently in voting period

**2. Fetch Vote Tally:**
```
GET https://rpc.aequitasprotocol.zone:1317/cosmos/gov/v1beta1/proposals/{proposal_id}/tally
```
- Returns current vote counts (yes/no/abstain/veto)
- Updated in real-time as votes are submitted

### Vote Submission

**Transaction Type:** `/cosmos.gov.v1beta1.MsgVote`

**Vote Options:**
- 1 = YES
- 2 = ABSTAIN
- 3 = NO
- 4 = VETO (no with veto)

**Example Transaction:**
```typescript
const voteMsg = {
  typeUrl: '/cosmos.gov.v1beta1.MsgVote',
  value: {
    proposalId: '1',
    voter: 'aequitas1abc...',
    option: 1, // YES
  },
};

const fee = {
  amount: [{ denom: 'urepar', amount: '5000' }],
  gas: '200000',
};

const result = await client.signAndBroadcast(
  voterAddress,
  [voteMsg],
  fee,
  'Vote yes on proposal 1'
);
```

## Fallback Behavior

**If blockchain is unreachable:**
- Shows 2 example proposals clearly labeled as examples
- Prevents voting on example proposals
- Displays helpful error message: "Cannot vote on example proposals. Connect to live chain for real governance."

**Once blockchain is live:**
- Automatically fetches real proposals
- Users can vote with real transactions
- Votes are recorded on-chain permanently

## User Experience

### Loading Proposals
```typescript
const proposals = await GovernanceService.getActiveProposals();
```
1. Attempts to connect to REST API
2. If successful, fetches all voting-period proposals
3. For each proposal, fetches current tally
4. Falls back to examples if connection fails

### Submitting Vote
```typescript
const result = await GovernanceService.voteOnProposal(
  proposalId,
  'yes',
  voterAddress,
  walletSigner
);

if (result.success) {
  console.log('Vote submitted! TX:', result.txHash);
} else {
  console.error('Vote failed:', result.error);
}
```

## Production Readiness

✅ **Real API calls** - Connects to Cosmos SDK REST endpoints  
✅ **Real transactions** - Signs and broadcasts MsgVote  
✅ **Error handling** - Graceful fallback to examples  
✅ **User feedback** - Clear success/error messages  
✅ **Type safety** - Full TypeScript type checking  

## Testing Checklist

- [ ] Verify REST API is accessible at port 1317
- [ ] Create test proposal on testnet
- [ ] Submit vote from mobile app
- [ ] Verify transaction appears on block explorer
- [ ] Check vote tally updates correctly
- [ ] Test offline fallback behavior
- [ ] Validate error messages

## Future Enhancements

1. **Proposal Details Screen**
   - Full description with Markdown rendering
   - Voting history
   - Proposer information
   - Deposit details

2. **Proposal Creation**
   - Submit new proposals from mobile
   - Deposit management
   - Community signaling

3. **Delegation**
   - Delegate voting power
   - View delegations
   - Claim rewards

4. **Push Notifications**
   - New proposal alerts
   - Voting deadline reminders
   - Proposal outcome notifications
