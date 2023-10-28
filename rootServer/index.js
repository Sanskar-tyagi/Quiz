const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const cors = require("cors");
require('dotenv').config()
const {mongoURI} = require('./config/dev') 
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors()); 
 
const router = require("./routes/routes");
app.use("/", router);
 
mongoose.connect(
    mongoURI,
    { useNewUrlParser: true, useUnifiedTopology: true  },
    () => {
      console.log('Connected to MongoDB');
    }
  ); 
app.listen(process.env.PORT || 8080,() => {
    console.log("Backend Started!");
});