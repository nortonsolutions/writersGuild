## Writer's Guild Platform

#### Copyright Norton 2025

<img src="courseApp_1.png" width="400"/>
<img src="courseApp_2.png" width="400"/>
<img src="courseApp_3.png" width="400"/>

### Platform Overview

**Writer's Guild** is an innovative platform designed for writers and creators to publish, collaborate, and receive feedback on their work. Originally evolved from a course-delivery system (Quizzap!), it has been transformed into a dynamic platform for creative content where authors can:

- **Publish Books**: Organize writing projects as "Books" with multiple modules
- **Create Chapters**: Utilize the Chapter module type alongside other content types
- **Facilitate Discussion**: Each module can have its own discussion room for feedback and editing
- **IGNFT Integration**: Discussion rooms are implemented as IGNFTs (Interoperable Generative NFTs), enabling a living, morphous standard where content can be blocked and chained

### Key Concepts

#### Terminology Mapping
- **Authors** (formerly Teachers): Content creators who publish books
- **Books** (formerly Courses): Publishing projects containing modules
- **Modules**: Various content types including:
  - **Chapter Modules**: Traditional book chapters for narrative content
  - **Instructional Modules**: Educational or tutorial content
  - **Project Modules**: Submission-based modules for creative work
  - **Quiz Modules**: Assessment and feedback modules
- **Discussion Rooms**: Per-module feedback and collaboration spaces
- **Readers/Collaborators** (formerly Students): Community members engaging with content

#### IGNFT (Interoperable Generative NFT)
Each discussion room is an IGNFT, creating a living, morphous ecosystem where:
- Content can be uniquely identified and tracked
- Discussions can be blocked and chained for versioning
- Creative work maintains provenance and attribution
- Community feedback becomes part of the creative artifact

### Technical Stack

The platform is built with:

* **Backend**: Node.js with Express
* **Database**: MongoDB with Mongoose ODM
* **Authentication**: Passport.js with local strategy
* **View Engine**: Handlebars (HBS)
* **UI Framework**: Bootstrap with jQuery

### Core Features

1. **User Authentication & Roles**
   * Login/register system
   * Role-based access (reader, author, admin)
   
2. **Book Management**
   * Creating and managing books
   * Assigning authors to books
   * Reader enrollment and collaboration

3. **Module System**
   * Multiple module types (Chapter, Instructional, Project, Quiz)
   * Module creation and editing
   * Timer functionality for timed modules
   * Submission tracking for project modules
   * Grading and feedback mechanisms

4. **Discussion Rooms (IGNFT-enabled)**
   * Thread creation per module/chapter
   * Replies with community engagement (upvoting/downvoting)
   * Moderation features
   * IGNFT metadata for blockchain integration

5. **Content Organization**
   * Modules organized within books
   * Media support (images, videos)
   * Rich text editing capabilities

-----

### Setup and Configuration

This version assumes MongoDB is up and running on port 27017
and uses the DB called "WritersGuild" (wiredtiger) by default.

Extract cdn.zip in current folder to create /cdn directory.

### Versioning:

- 1.0.0: (2021) Initial version as Quizzap!
- 1.0.1: (May 2024) Updated readme
- 2.0.0: (October 2025) **Transformed to Writer's Guild Platform**
  - Teacher → Author role
  - Course → Book concept
  - Module types expanded (Chapter, Instructional, Project, Quiz)
  - IGNFT integration for discussion rooms
  - Platform repositioned for writers and creators

---

### Migration Notes

For existing Quizzap! installations migrating to Writer's Guild:
- The database connection string defaults to "WritersGuild" but can be configured via environment variables
- User roles: 'teacher' role is now 'author' (backward compatible)
- Course data structures are now called "Books" in documentation but maintain database compatibility
- Discussion rooms now support IGNFT metadata fields for blockchain integration

---

Only applicable to pm2-windows-service:

Auto-startup for pm2.exe service configured with pm2-windows-service module:

Launched Git Bash in Administrative Mode, then ran the following:

[ /c/util/courseApp/utils/yarn-pm2-windows-service/node_modules/pm2-windows-service ]

$ bin/pm2-service-install -n pm2
? Perform environment setup (recommended)? Y
? Set PM2_HOME? Y
? PM2_HOME value: c:\util\courseApp\utils\node
? Set PM2_SERVICE_SCRIPTS (the list of start-up scripts for pm2)? N
? Set PM2_SERVICE_PM2_DIR (the location of the global pm2 to use with the service? Y
? Specify the directory containing the pm2 version to be used by the service:
C:\util\courseApp\utils\node\node_modules\pm2

PM2 service installed and started.

Then again in administrative mode,

$ sc \\DESKTOP-83JAE79 config pm2.exe depend= MongoDB

To check pm2 services, login to cmd or bash in Administrative mode.

$ pm2 start /c/util/courseApp/server.js -i 1 --name courseApp
$ pm2 save

(The 'pm2 save' will cause pm2 to pick up from where it leaves off on the next restart.)

---

Manual startup of the production server:

Assuming the MongoDB process is running, start Writer's Guild with:

pm2 start writersGuild

... which essentially runs "node /c/util/writersGuild/server.js" in daemon mode.

---

Logs are in C:\util\courseApp\utils\node\logs

---

Development mode (only applicable if you have the ./utils directory tree)

If you want to run in development mode with a standalone DB (mmapv1),
you can startup a local MongoDB using 'startDB.bat' instead (port 27018).
This DB has some data loaded already in the "nortonQuiz" DB instance.
Use F5 in Visual Studio Code to launch with .env settings.

---

TODO: Precompile the babelscript.  Currently only used for React timer component.

DeprecationWarning: Mongoose: mpromise (mongoose's default promise library)
is deprecated, plug in your own promise library instead:
http://mongoosejs.com/docs/promises.html

Express-Session Warning: connect.session() MemoryStore
is not designed for a production environment, as it will leak memory,
and will not scale past a single process.
