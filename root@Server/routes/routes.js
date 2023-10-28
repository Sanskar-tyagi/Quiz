const express = require("express");

const router = express.Router();  
const {RegisterUser} = require("../controllers/index");
const {getUser} = require("../controllers/index");
// const {CreateQuiz} = require("../controllers/index"); 
const {getQuiz} = require("../controllers/index"); 
const {getAllLanguages} = require("../controllers/index"); 
const {updateUser} = require("../controllers/index");  
const {updateScores} = require("../controllers/index");  
const {getParticipantsByLanguage} = require("../controllers/index");  
const {updateDB} = require("../controllers/index");  

router.post("/SignUp", RegisterUser );
router.post("/getUser", getUser ); 
router.post("/getQuiz", getQuiz );
router.post("/participants", updateScores ); 
router.post("/getLang", getAllLanguages );
router.post("/updates", updateUser );
router.post("/getLeader", getParticipantsByLanguage );
router.post("/updateDB", updateDB ); 
module.exports = router;