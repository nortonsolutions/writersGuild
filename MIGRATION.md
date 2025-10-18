# Migration Guide: Quizzap! → Writer's Guild

## Overview

This document explains the transformation from Quizzap! (course-delivery system) to Writer's Guild (collaborative writing platform) and provides guidance for existing installations.

## Version Information

- **Previous Version**: Quizzap! 1.0.1
- **New Version**: Writer's Guild 2.0.0
- **Release Date**: October 2025

## Conceptual Changes

### Terminology Mapping

| Quizzap! (Old) | Writer's Guild (New) | Purpose |
|----------------|----------------------|---------|
| Teacher | Author | Content creators who publish books |
| Course | Book | Publishing projects with multiple modules |
| Quiz | Module | Content units (chapters, projects, etc.) |
| Student | Reader/Collaborator | Community members engaging with content |
| Message Board | Discussion Room (IGNFT) | Feedback and collaboration spaces |

## Technical Changes

### Database

**Default Database Name Changed**:
- Old: `CourseApp`
- New: `WritersGuild`

**Schema Enhancements** (backward compatible):

1. **Module Schema** (formerly Quiz):
   ```javascript
   // New field
   moduleType: { type: String, default: 'chapter' }
   // Options: 'chapter', 'instructional', 'project', 'quiz'
   ```

2. **Thread Schema** (Discussion Rooms):
   ```javascript
   // New fields for IGNFT support
   ignftId: String,
   ignftMetadata: Object
   ```

3. **Course Schema** (Books):
   ```javascript
   // New field
   ignftEnabled: { type: Boolean, default: true }
   ```

4. **User Schema**:
   ```javascript
   // New role option
   roles: ['student', 'teacher', 'author', 'admin']
   // 'author' role now supported alongside 'teacher'
   ```

### Code Changes

- **Package Name**: `courseapp` → `writersguild`
- **Default Port**: Still 3000 (unchanged)
- **API Endpoints**: No changes (backward compatible)
- **Authentication**: Now accepts both 'teacher' and 'author' roles

## Migration Steps

### For Existing Installations

If you're running Quizzap! 1.0.x and want to migrate to Writer's Guild 2.0.0:

#### 1. Backup Your Data
```bash
# Backup MongoDB database
mongodump --db CourseApp --out /backup/quizzap-backup-$(date +%Y%m%d)
```

#### 2. Update Code
```bash
git pull origin main
npm install
```

#### 3. Database Migration (Optional)

You can continue using the `CourseApp` database:
```bash
# In .env file
DB=mongodb://localhost:27017/CourseApp
```

Or migrate to the new `WritersGuild` database:
```bash
# In .env file
DB=mongodb://localhost:27017/WritersGuild

# Copy data from old to new database
mongodump --db CourseApp --out /tmp/quizzap-data
mongorestore --db WritersGuild /tmp/quizzap-data/CourseApp
```

#### 4. Update User Roles (Optional)

If you want to use the new 'author' terminology:
```javascript
// MongoDB shell or Node.js script
db.users.updateMany(
  { roles: 'teacher' },
  { $addToSet: { roles: 'author' } }
)
```

Note: Both 'teacher' and 'author' roles are supported, so this is optional.

#### 5. Restart Application
```bash
npm start
# or
pm2 restart writersGuild
```

### For New Installations

1. Clone the repository
2. Install dependencies: `npm install`
3. Extract cdn.zip: `unzip cdn.zip`
4. Configure MongoDB in `.env`:
   ```
   DB=mongodb://localhost:27017/WritersGuild
   PORT=3000
   SESSION_SECRET=your-secret-here
   ```
5. Start the application: `npm start`

## Breaking Changes

**None**. All changes are backward compatible.

### What Still Works

- ✓ All existing API endpoints
- ✓ Existing user accounts and authentication
- ✓ All course/book data structures
- ✓ Quiz/module functionality
- ✓ Message board/discussion room features
- ✓ 'teacher' role (alongside new 'author' role)
- ✓ Existing database collections and documents

## New Features

### IGNFT Support

Discussion rooms now support IGNFT (Interoperable Generative NFT) metadata:

```javascript
// Example IGNFT metadata structure
{
  ignftId: "ignft-abc123-xyz789",
  ignftMetadata: {
    version: "1.0.0",
    contentHash: "sha256-...",
    contributors: ["author1", "author2"],
    creativeType: "chapter"
  }
}
```

### Module Types

Modules can now be classified:
- **chapter**: Traditional book chapters
- **instructional**: Tutorial or educational content
- **project**: Submission-based creative projects
- **quiz**: Assessment and feedback modules

## Documentation

- `readme.md` - Complete platform overview
- `IGNFT.md` - Detailed IGNFT concept documentation
- `MIGRATION.md` - This file

## Configuration

### Environment Variables

No changes to environment variables. All existing configurations work:

```bash
# .env file
DB=mongodb://localhost:27017/WritersGuild  # or CourseApp
PORT=3000
HOSTNAME=localhost
SESSION_SECRET=your-secret
NODE_ENV=production
SHOW_ANSWERS_ON_REVIEWS=false
```

## Testing

Run tests to verify migration:
```bash
npm test
```

Expected results:
- Unit tests: All passing
- Functional tests: May fail without MongoDB running (expected)

## Support

For issues or questions about migration:
1. Check existing issues on GitHub
2. Review documentation in readme.md and IGNFT.md
3. Create a new issue with details about your setup

## Rollback

If you need to rollback to Quizzap! 1.0.1:

1. Restore database backup:
   ```bash
   mongorestore --db CourseApp /backup/quizzap-backup-YYYYMMDD/CourseApp
   ```

2. Checkout previous version:
   ```bash
   git checkout v1.0.1
   npm install
   ```

3. Update `.env` to use CourseApp database
4. Restart application

## Future Enhancements

Planned features for Writer's Guild:
- Full blockchain integration for IGNFTs
- Smart contracts for royalty distribution
- Decentralized storage (IPFS/Arweave)
- Cross-platform IGNFT federation
- AI-assisted content generation

---

**Important**: This migration is non-destructive. Your existing data remains intact and functional. The changes are primarily conceptual (terminology) and additive (new fields and features).
