# IGNFT Integration - Writer's Guild

## What is IGNFT?

**IGNFT** stands for **Interoperable Generative NFT** - a living, morphous standard that enables content to be uniquely identified, tracked, blocked, and chained in a decentralized ecosystem.

## IGNFT in Writer's Guild

In the Writer's Guild platform, each **Discussion Room** is implemented as an IGNFT, creating a unique digital artifact that encompasses:

- The creative content (chapter, module, or project)
- Community discussions and feedback
- Editing history and versioning
- Attribution and provenance data

## Key Features

### 1. Content Identification
Each discussion room has a unique IGNFT identifier (`ignftId`) that:
- Permanently identifies the content and its discussions
- Enables cross-platform referencing
- Maintains integrity across versions

### 2. Blocking and Chaining
IGNFTs can be **blocked** and **chained** to create:
- **Version Control**: Track changes and revisions over time
- **Branching**: Allow multiple creative directions from the same source
- **Merging**: Combine feedback and edits from different contributors
- **History**: Maintain complete provenance of creative decisions

### 3. Morphous Standard
The IGNFT standard is "morphous" (shape-changing), meaning:
- It adapts to different content types (chapters, projects, instructional content)
- It supports various collaboration patterns
- It remains flexible for future creative workflows
- It integrates with emerging blockchain and Web3 technologies

### 4. Living Artifacts
Unlike static NFTs, IGNFTs are **living artifacts** that:
- Evolve with community feedback
- Grow through collaborative editing
- Maintain relationships to other IGNFTs
- Preserve the creative journey, not just the final product

## Technical Implementation

### Database Schema

Each thread (discussion room) in the Writer's Guild includes IGNFT fields:

```javascript
const threadSchema = mongoose.Schema({
  courseId: { type: String, required: true }, // references Book (bookId)
  text: { type: String, required: true },
  created_on: Date,
  bumped_on: Date,
  status: String,
  author: { type: String, required: true },
  reported: { type: Boolean, default: false },
  replies: {type: [replySchema], default: []},
  ignftId: String, // IGNFT identifier for blockchain/chaining
  ignftMetadata: Object // IGNFT metadata for morphous standard
})
```

### IGNFT Metadata Structure

The `ignftMetadata` field can contain:

```javascript
{
  version: "1.0.0",
  previousVersionId: "ignft-abc123", // for chaining
  contentHash: "sha256-hash-of-content",
  contributors: ["author1", "author2"],
  blockchainReference: "ipfs://...",
  creativeType: "chapter|project|instructional",
  status: "draft|review|published",
  branches: ["ignft-xyz789"], // alternate versions
  mergedFrom: ["ignft-def456"] // sources of merged content
}
```

## Use Cases

### 1. Collaborative Writing
- Multiple authors work on different branches of a story
- Each branch is its own IGNFT
- Authors can merge branches, creating a chain of creative decisions

### 2. Feedback Integration
- Readers provide feedback in discussion rooms
- Each feedback session creates a new block in the IGNFT chain
- Authors can see how their work evolved based on community input

### 3. Rights and Attribution
- IGNFTs maintain provenance of creative contributions
- Contributors are permanently recorded in the chain
- Creative rights can be transparently tracked and honored

### 4. Cross-Platform Publishing
- IGNFTs can be referenced across different platforms
- Content maintains its identity regardless of where it's displayed
- Readers can verify authenticity and trace creative lineage

## Future Enhancements

The IGNFT system in Writer's Guild is designed to evolve:

1. **Blockchain Integration**: Full integration with Ethereum, Polygon, or other blockchain networks
2. **Smart Contracts**: Automated royalty distribution based on contribution tracking
3. **Decentralized Storage**: Integration with IPFS or Arweave for permanent content storage
4. **Cross-Platform Federation**: Enable IGNFTs to work across multiple creative platforms
5. **AI Integration**: Use IGNFT metadata to train and attribute AI-assisted content generation

## Getting Started with IGNFTs

For Writers and Authors:
1. Create a Book in Writer's Guild
2. Add Chapters or Modules
3. Enable discussion rooms for each module
4. Each discussion room automatically becomes an IGNFT
5. Use the IGNFT ID to reference your work externally
6. Track feedback and versioning through the IGNFT chain

For Developers:
- See database.js for schema implementation
- IGNFT metadata is stored in the Thread model
- API endpoints in apiMessageBoard.js handle IGNFT operations
- Future updates will add REST/GraphQL APIs for IGNFT management

## Philosophy

The IGNFT concept in Writer's Guild embodies the idea that:

> "Creative work is not a fixed artifact but a living conversation between creator and community."

By making discussion rooms into IGNFTs, we recognize that:
- Feedback is part of the creative process
- The journey matters as much as the destination
- Attribution should include everyone who shapes the work
- Creative content should be portable, verifiable, and eternal

---

For more information, see:
- `readme.md` - Platform overview
- `database.js` - Schema implementation
- `routes/apiMessageBoard.js` - Discussion room API
