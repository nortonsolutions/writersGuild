/**
 * Database strategy - Norton 2025
 * Based on Mongoose.
 * Writers Guild Platform - Books, Authors, Modules, Discussion Rooms
 */
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});

module.exports = function (mongoose, callback) {

    const CONNECTION_STRING = process.env.DB || "mongodb://localhost:27017/WritersGuild";

    // Module content schema - supports various types (Chapter, Instructional, Project, etc.)
    const moduleQuestionSchema = mongoose.Schema({
      type: { type: String, required: true, default: 'single' },
      question: { type: String, required: true },
      choices: [{
        text: String,
        correct: Boolean
      }],
      imageLocation: String,
      videoLocation: String,
      answerTextRegex: String,
      answerEssayRegex: String
    })


    const moduleSchema = mongoose.Schema({
      name: { type: String },
      moduleType: { type: String, default: 'chapter' }, // chapter, instructional, project, quiz
      questions: {type: [moduleQuestionSchema], default: []},
      description: String,
      timeLimit: Number,
      maxAttempts: Number,
      minPassingGrade: Number
    })

    const QuizModel = mongoose.model('Quiz', moduleSchema);

    // const userQuizQuestionSchema = mongoose.Schema({
    //   questionId: { type: String, required: true },
    //   answer: [Boolean],
    //   answerText: String,
    //   answerEssay: String,
    //   projectFile: String,
    //   correct: Boolean
    // })

    const userQuizSchema = mongoose.Schema({
      courseId: { type: String, required: true },
      quizId: { type: String, required: true },
      quizName: { type: String, required: true },
      answers: Object,
      date: Date,
      score: Number,
      timePassed: Number
    })

    const userSchema = mongoose.Schema({
      username: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      roles: {type: [String], default: ['student']}, // 'student', 'author', 'admin'
      quizzes: {type: [userQuizSchema], default: []},
      projects: [{
        courseId: String,
        quizId: String,
        file: String,
        date: Date
      }],
      firstname: String,
      surname: String
    })
    
    const UserModel = mongoose.model('User', userSchema);

    const replySchema = mongoose.Schema({
      text: { type: String, required: true },
      created_on: Date,
      author: { type: String, required: true },
      reported: { type: Boolean, default: false }
    })
  
    const ReplyModel = mongoose.model('Reply', replySchema);

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

    const ThreadModel = mongoose.model('Thread', threadSchema);

    const courseSchema = mongoose.Schema({
      name: { type: String, required: true, unique: true }, // Book title
      homeContent: String,
      description: String,
      instructors: [{ // Authors of the book
        instructorId: String,
        instructorName: String
      }],
      studentIds: [String], // Readers/collaborators
      quizIds: [{ // Modules (chapters, etc.)
        quizId: String,
        sortKey: Number
      }],
      currentTermStartDate: Date,
      ignftEnabled: { type: Boolean, default: true } // IGNFT support for discussion rooms
    })

    const CourseModel = mongoose.model('Course', courseSchema);

    const clientOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    mongoose.connect(CONNECTION_STRING, clientOptions)

    .then(
      (db) => {
        callback(db);
      },
  
      (err) => {
          console.log('Database error: ' + err.message);
      }
    ); 

}