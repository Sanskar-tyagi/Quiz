const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalQuiz: Number,
  HighestScore: Number,
  isAdmin: Boolean,
  highestScoreLang: String,
  Languages: [
    {
      Language: String,
      quizTaken: Number,
      highestStreak: Number,
      highestScore: Number,
    },
  ], 
});
module.exports = mongoose.model("User", userSchema);
