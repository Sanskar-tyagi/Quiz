import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { setredScore, setTotal } from "../Store/Slice/Score";
import Question from "../components/Question";
import Card from "../components/Card";
import Btn from "../components/Btn";
import { GrFormNextLink, GrFormPreviousLink } from "react-icons/gr";
import { CgMenuLeft } from "react-icons/cg";
import { getQuiz } from "../utils/FetchQuiz";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Dropdown from "../components/DropDown";
import organize from "../utils/useOrganize";
import axios from "axios";
export default function Quiz() {
  const user = useSelector((state) => state.users.user);
  const Language = useSelector((state) => state.quiz.language);
  const dispatch = useDispatch();
  const quiz = useSelector((state) => state.quiz.quizData);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const currentQuestion =quiz && quiz[currentQuestionIndex] ;  
  const [scores, setScore] = useState({
  score: [], 
});  
console.log(scores);
const level=user?.highestScore>6?"Medium":user?.highestScore>10?"Hard":"Easy";
  const nav = useNavigate();
  useEffect(() => {
    if (Language && !quiz) {
      handlequiz(Language);
    }
    if(!Language){
      nav('/Quizmenu')
    }
    toast.dismiss();
  }, [quiz]);
  async function handlequiz(lang) {
    if (lang) {
      const data = await getQuiz(lang);
      organize(data, dispatch,level);
    } 
  }
  const handleScore=()=>{
    let sum = 0;
    let total=0;
    quiz.forEach(item=>{
     total+=item.value
    })
   scores.score.forEach(item => { 
     sum += item.score;
   }); 
   return {sum,total}
  }
  const handledis=()=>{
  const{sum,total}=  handleScore()  
    dispatch(setredScore(sum));
    dispatch(setTotal(total)); 
    handleQuit();
  } 
  const handleQuit = async () => { 
    const{sum,total}=  handleScore() 
    console.log('in quit');
    toast.loading('saving your sore..',1000)
    try { 
      const response = await axios.post('https://quizbackend-5adb.onrender.com/participants', {Language,  
      id:user._id,  
        score:sum,
        user:user.name
      });  
     
      if (response.status === 200) {
        try {
             const response = await axios.post('https://quizbackend-5adb.onrender.com/updates', {
              email:user.email, 
              language:Language,
              currentScore:sum  // Send the calculated total
            });
            
            if (response.status === 200) {
              toast.success('saved sucessfully..',1000)
          setTimeout(()=>{
            nav('/result');
          },1000)}
        } catch (error) {
          alert(error.message)
        }
      } else { 
        console.error('Failed to update scores in the database.'); 
      }
    } catch (error) {
      console.error('An error occurred while updating scores:', error);
      // Handle other errors, e.g., network issues or server errors
    }
  };
  const [select, setSelect] = useState();
  const handleSelectOption = (optionId) => {
    setSelect(optionId);
  };
  const handleNext = () => {
    if(currentQuestionIndex===quiz.length-1){
      handledis();
    }
    if(select===null){
      setCurrentQuestionIndex(currentQuestionIndex+1);
      return
    }
    const isCorrect = currentQuestion?.options.find(
      (option) => option._id === select
    )?.isCorrect;
    const value =currentQuestion?.value;
    const score = { value: value, score: isCorrect ? value : 0 };
    setCurrentQuestionIndex(currentQuestionIndex+1); 
    setScore((prevScores) => {
      const newScore = { ...prevScores }; 
      newScore.score = [...prevScores.score, score];
      return newScore;
    });  

  };  
  const handlePrev = () => { 
    if(currentQuestionIndex>0){ 
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setScore((prevScores) => {
        const newScore = { ...prevScores }; 
        newScore.score.pop(); 
        return newScore;
      });
    }else{
      alert('opss first question')
    }
     
  }; 
  return (
    <div>
      <Toaster />
      <Navbar user={user} />
      <div className="flex flex-col justify-center items-center">
        {quiz ? (
        currentQuestionIndex<quiz.length ?  <Card
        extra={
          "mt-5 text-white px-5 pb-2 bg-purple-400 justify-center items-center rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 "
        }
      >
        <div className="flex w-full justify-between items-center gao-4">
          <button class="cursor-pointer px-5 py-2 text-white mx-4 mt-4 text-4xl font-bold  ">
            <span>{quiz?.lang} Triva </span>
          </button>
          <Dropdown
            classNames={"py-2 top-8 -left-[100px] z-50 absolute w-max"}
            button={
              <button
                className="
          border-0
          p-1   
          bg-black rounded-lg
          transition
          group
          hover:opacity-70 
        "
              >
                <CgMenuLeft color="" size={25} />
              </button>
            }
          >
            <div className="flex text-black w-32 cursor-pointer flex-col justify-start  rounded-md z-50 bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <ul>
                <li
                  onClick={()=>{handledis();}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
                  Close test
                </li>
                <li className="hover:bg-black/40 px-5 py-2  hover:text-white">
                  Share test
                </li>
                <li className="hover:bg-black/40 px-5 py-2  hover:text-white">
                  Report test
                </li>
                <li className="hover:bg-black/40 px-5 py-2  hover:text-white">
                  Help
                </li>
              </ul>
            </div>
          </Dropdown>
        </div>
        <Card
          extra={
            "mt-5 text-white px-5 pb-2 bg-purple-400 justify-center items-center rounded-lg gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 "
          }
        >
            <Question
              select={select}
              question={currentQuestion?.question}
              values={currentQuestion?.options}
              onSelectOption={handleSelectOption}
            />
        </Card>
        <div className="flex gap-6">
          <Btn
            onClick={() => {
               handlePrev()
            }}
            icon={
              <GrFormPreviousLink size={22} color="white" fill="white" />
            }
            title={"Previous"}
          ></Btn>
          <div className="flex gap-2 justify-center items-center bg-white text-black px-2 rounded-md" >
            {currentQuestionIndex}/{quiz.length-1}
          </div>
          <Btn
            onClick={() => {
              handleNext();
            }}
            icon={<GrFormNextLink size={22} color="white" fill="white" />}
            title={currentQuestionIndex < 21 ? "Next" : "Sumbit Test"}
          ></Btn>
        </div>
      </Card>:<Card extra={
            "mt-5 text-white px-5 pb-2 bg-purple-400 justify-center items-center rounded-lg gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100 "
          }>Wohoo!!</Card>
        ) : (
          <Card
            extra={
              "mt-5 min-w-96 h-96 text-white px-5 pb-2 bg-purple-400 justify-center items-center rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100"
            }
          >
            <h1 className="text-2xl font-bold italics flex gap-4 items-end">
              Please wait while we load ur Quiz
              <div class="flex flex-row gap-2">
                <div class="w-2 h-2 rounded-full bg-blue-700 animate-bounce"></div>
                <div class="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div class="w-2 h-2 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </h1>
            <div class="animate-pulse flex flex-col items-center gap-4 w-60">
              <div>
                <div class="w-48 h-6 bg-slate-400 rounded-md"></div>
                <div class="w-28 h-4 bg-slate-400 mx-auto mt-3 rounded-md"></div>
              </div>
              <div class="h-7 bg-slate-400 w-full rounded-md"></div>
              <div class="h-7 bg-slate-400 w-full rounded-md"></div>
              <div class="h-7 bg-slate-400 w-full rounded-md"></div>
              <div class="h-7 bg-slate-400 w-1/2 rounded-md"></div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
