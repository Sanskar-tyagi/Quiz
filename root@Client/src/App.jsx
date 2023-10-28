import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main"; 
import PageNotFound from "./Pages/PageNotFound";
import Quiz from "./Pages/Quiz";
import { firbaseauth } from "./utils/firebase";
import { onAuthStateChanged } from "firebase/auth";
import QuizMenu from "./Pages/QuizMenu";
import Result from "./Pages/Result";
import { useDispatch } from "react-redux"; 
import FetchUser from "./utils/FetchUser"; 
import LeaderBoard from "./Pages/LeaderBoard";
import Admin from "./Pages/Admin";
 

function App() {  
  const dispatch = useDispatch();
   useEffect(() => {
    onAuthStateChanged(firbaseauth, async(user) => {
      if (user) { 
        await FetchUser(user.email, dispatch); 
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/" element={<Main  />}></Route> 
        <Route path="/Quiz" element={<Quiz />}></Route> 
        <Route path="/QuizMenu" element={<QuizMenu  />}></Route> 
        <Route path="/Result" element={<Result />}></Route> 
        <Route path="*" element={<PageNotFound />} /> 
        <Route path="/Leaderboard" element={<LeaderBoard />} /> 
        <Route path="/Admin" element={<Admin />} /> 
      
      </Routes>
    </BrowserRouter>  
  )
}

export default App
