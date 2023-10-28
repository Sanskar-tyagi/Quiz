import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import Avatar from "../components/Avatar";
import Score from "../components/Score";
import SlideBtn from "../components/SlideBtn";
import ColorStats from "../components/ColorStats";
import { GiDiamondTrophy } from "react-icons/gi";
import { GrNext } from "react-icons/gr";
import { resetScore } from "../Store/Slice/Score";
import { useNavigate } from "react-router-dom";
import { resetQuiz } from "../Store/Slice/QuizSlice";

export default function Result() {
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();
  const total= useSelector((state) => state.score.total);
  const end = Date.now() + 15 * 100;
  const nav=useNavigate();
  const colors = ["#bb0000", "#ffffff"];
  const sum = useSelector((state) => state.score.score); 
  let language;
  useEffect(()=>{
    toast.dismiss();
    if(!language && !lang){
      nav('/quizMenu')
    }
      if(lang){
        language=lang; 
    setTimeout(()=>{
      dispatch(resetQuiz());
    },2000)}
  },[])
  if (sum > 4) {
    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  }
  const lang=useSelector((state) => state.quiz.language);
  const percent = ((sum /total) * 100).toFixed(0); 
  return (
    <div>
      {" "}
      <Navbar user={user} />
      <div className="flex flex-col justify-center items-center">
        {sum!==undefined ? (
          <Card
            extra={
              " mt-1 text-white w-[80] md:w-[60vw] lg:w-[40vw] px-5 pb-2 bg-purple-400 justify-center items-center rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100"
            }
          >
            <div className="flex flex-col w-full justify-start items-center px-6 ">
              <span class=" group block px-5 py-2 rounded-md  text-teal-500 mt-4 text-4xl font-bold">
                Result
              </span>
              <Avatar extra={"mt-2"} title={`You Rock  ${user.name}`} />
            </div>
            <div className="flex flex-col w-full justify-start items-center gap-8">
              <h1 className="text-lg mb-3">
                You just gave{language} Quiz
              </h1>
              <Score percent={percent} score={sum} total={total} title={"Score"} />
              <ColorStats
                score={<GiDiamondTrophy />}
                color={
                  "bg-gradient-to-r  w-full py-2 rounded-lg from-green-200 via-green-400 to-green-500 flex-row justify-between"
                }
                title={
                  <span className="cursor-pointer flex justify-start relative group" onClick={()=>{
                    nav('/Leaderboard')
                  }}>
                    <span className="flex -ml-2 justify-center items-center gap-2 opacity-100 group-hover:opacity-90 duration-200 bg-yellow-400 rounded-lg p-2">
                      {" "}
                      View LeaderBoard
                      <GrNext />{" "}
                    </span>{" "}
                  </span>
                }
              />
              <SlideBtn title={"Invite Friends"} />
            </div>
          </Card>
        ) : (
          <>You need to give a quiz to view Result{s} </>
        )}
      </div>
    </div>
  );
}
