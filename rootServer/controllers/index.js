const Quizmodel = require("../models/Quizmodel");
const userModel = require("../models/userModel");

const RegisterUser = async (req, res) => {
  const { email, name } = req.body;
  try {
    if (!email || !name) {
      return res.status(400).json({
        success: false,
        message: "Name and Email are required to save a user",
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with the same email already exists",
      });
    }
    const user = new userModel({ email, name, isAdmin: true });
    await user.save();
    res
      .status(201)
      .json({ success: true, message: "User successfully registered" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while registering the user",
    });
  }
};
const getUser = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: `User not found ${email}` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error retrieving user data:", error);
    res
      .status(500)
      .json({ message: "Error retrieving user data from the database" });
  }
};

const getAllLanguages = async (req, res) => {
  try {
    const languagesWithParticipants = await Quizmodel.aggregate([
      {
        $group: {
          _id: "$Language", // Group by the Language field
          participants: { $sum: "$participants" }, // Sum the participants field
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          language: "$_id", // Rename _id to language
          participants: 1, // Include the participants field
        },
      },
    ]);

    res.json(languagesWithParticipants);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching languages." });
  }
};
const updateScores = async (req, res) => {
  const {Language,user, _id, score } = req.body;

  try {
    const quiz = await Quizmodel.findOne({Language}); // Find the quiz by lang
  
   console.log('in quizz');
    // Check if the participant already exists in the participants array
    const existingParticipant = quiz.participants.find(participant => participant.userId === _id);

    if (existingParticipant) {
      // If the user exists, update the score only if it's higher
      if (score > existingParticipant.score) {
        existingParticipant.score = score;
      }
    } else {
      // If the user doesn't exist, add them as a new participant
      quiz.participants.push({ userId: _id, score,user });
    }

    // Save the updated quiz
    await quiz.save();

    res.json({ message: "Quiz information updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while updating user information." });
  }
};
// const updateDB = async (req, res) => {
//   const { Language, updates } = req.body;  
//   try {
//     const quiz = await Quizmodel.findOne({ Language }); // Find the quiz by lang

//     if (!quiz) {
//       return res.status(404).json({ error: "Quiz not found." });
//     }
 
//     for (const update of updates) {
//       const { name, score } = update;
//       console.log("updated",name);
//         quiz.participants.push({ score, name }); 
//     } 
//     await quiz.save();

//     res.json({ message: "Quiz information updated." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "An error occurred while updating user information." });
//   }
// };

const getParticipantsByLanguage = async (req, res) => {
  const {language} = req.body;   
  try { 
    const participants = await Quizmodel.find({ Language: language }, 'participants'); 
    const participantsArray = participants.map(quiz => quiz.participants); 
    const flattenedParticipants = [].concat(...participantsArray); 
    return res.status(200).json(flattenedParticipants);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching participants.', error: error.message });
  }
};
const updateUser = async (req, res) => {
  const { Language, email, currentScore } = req.body;

  try {
    // Find the user by email
    const user = await userModel.findOne({ email });
    // User already exists
    // Update totalQuiz
    if (user.totalQuiz) {
      user.totalQuiz++;
    } else {
      user.totalQuiz = 1;
    }
    // Check the highest score
    if (currentScore > user.HighestScore) {
      user.HighestScore = currentScore;
      user.highestScoreLang = Language;
    }
    // Check if the user has taken a quiz in this language before
    const langInfo = user.Languages.find((lang) => lang.Language === Language);
    if (langInfo) {
      // If the user has taken this language quiz before, update the values
      langInfo.quizTaken++;
      if (currentScore > langInfo.highestScore) {
        langInfo.highestScore = currentScore;
      }
     
    } else {
      // If it's a new language for the user, create a new entry
      user.Languages.push({
        Language,
        quizTaken: 1, 
        highestScore: currentScore,
      });
    }
    await user.save();
    res.json({ message: "User information updated." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user information." });
  }
};
// const CreateQuiz = async (req, res) => {
//   const data = req.body;
//   try {
//     if (!data) {
//       return res
//         .status(400)
//         .json({
//           success: false,
//           message: `Data is required to create Quiz ${data}`,
//         });
//     }

//     // Check if a quiz with the same language already exists
//     const existingQuiz = await Quizmodel.findOne({ Language: data.Language });

//     if (existingQuiz) {
//       // If the quiz exists, add the new questions to it
//       existingQuiz.questions = [...existingQuiz.questions, ...data.questions];
//       await existingQuiz.save();
//       res
//         .status(200)
//         .json({ success: true, message: "Quiz updated with new questions" });
//     } else {
//       // If the quiz does not exist, create a new one
//       const quiz = new Quizmodel({
//         Language: data.Language,
//         questions: data.questions,
//       });
//       await quiz.save();
//       res
//         .status(201)
//         .json({ success: true, message: "Quiz created successfully" });
//     }
//   } catch (error) {
//     console.error("Error during creation:", error);
//     res
//       .status(500)
//       .json({
//         success: false,
//         message: "An error occurred while registering the user",
//       });
//   }
// };
const getQuiz = async (req, res) => {
  const { Language } = req.body;
  try {
    const quiz = await Quizmodel.findOne({ Language });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    if (!Array.isArray(quiz.questions)) {
      return res
        .status(500)
        .json({ message: "Quiz questions are not iterable" });
    }
    res.status(200).json(quiz);
  } catch (error) {
    console.error("Error retrieving quiz data:", error);
    res
      .status(500)
      .json({ message: "Error retrieving quiz data from the database" });
  }
};

module.exports = {
  RegisterUser,
  getUser,
  getQuiz,
  getAllLanguages,
  updateScores,
  updateUser,getParticipantsByLanguage,updateDB
};
