const mongoose = require("mongoose");
const questionSchema = new mongoose.Schema({
  value: Number,
  question: String,
  level: String,
  options: [
    {
      isCorrect: Boolean,
      option: String,
    },
  ],
});
const quizSchema = new mongoose.Schema({
  Language: String,
  questions: [questionSchema],
  participants: [{userId:Number,name:String,score:Number}],
});
module.exports = mongoose.model("Quiz", quizSchema);
