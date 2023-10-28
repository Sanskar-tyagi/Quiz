import React, { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import Dropdown from '../DropDown';
import toast, { Toaster } from 'react-hot-toast';

export default function Add() {
  // Define the initial state object with empty values
  const [questionData, setQuestionData] = useState({
    value: 1,
    language: "",
    question:"",
  });

  const [optionData, setOptionData] = useState([
    {
      option: '',
      idx:0, 
      isCorrect: false,
    },
    {
      option: '',
      idx:1, 
      isCorrect: false,
    },
    {
      option: '',
      idx:2, 
      isCorrect: false,
    },
    {
      option: '',
      idx:3,
      isCorrect: false,
    },
  ]);

   

  const handleQuestionData = (e, type) => {
    const value = e.target.value;
    if (type === "question") {
      setQuestionData({
        ...questionData,
        question: value
      });
    } else if (type === "value") {
      setQuestionData({
        ...questionData,
        value: value
      });
    }
  }; 
  const[correct,setCorrect]=useState();
  const handleCorrect=(correct)=>{
    const updatedOptionData = optionData.map((option) => ({
      ...option,
      isCorrect: option.idx === correct,
    }));
    setOptionData(updatedOptionData);
  }
  const[language,setLang]=useState("");
  const handleFormSubmit = async () => {
    // Check if the question, value, and correct option are not empty
    if (
      !questionData.question ||
      questionData.value === "" ||
      correct === undefined||language===""
    ) {
      alert("Please fill in all required fields before submitting.");
    } else {
      handleCorrect(correct);
      const newQuestionData = {
        lang: language,
        value: questionData.value,
        question: questionData.question,
        options: optionData,
      };
      try {
        const response = await axios.post('https://quizbackend-5adb.onrender.comupdates/updateQ', {
        newQuestionData
       });
       
       if (response.status === 200) {
         toast.success('saved sucessfully..',1000)
     setTimeout(()=>{
       nav('/');
     },1000)}
   } catch (error) {
     alert(error.message)
   }
    }
  };
   
  const handleOptionData = (e, idx) => {
    const value = e.target.value;
    const updatedOptionData = [...optionData];
    updatedOptionData[idx].option = value;
    setOptionData(updatedOptionData);
  };
  let opt="A";
  return (
    <div>
       <h1 className='text-lg text-white mb-4'>Fill in the options</h1>
       <Toaster
          toastOptions={{ 
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
      <div className="flex gap-4">
        
        <Input title={'Question'} value={questionData.question} action={(e) => handleQuestionData(e,"question")} />
        <Input title={'value'} type={"number"} value={questionData.value} action={(e) => handleQuestionData(e,"value")}  />
      </div>
       <div className="flex flex-col">
       <h1 className='text-lg text-white mt-4'>Fill in the options</h1>

       <div className="grid mt-3 grid-cols-2 gap-4">
       {optionData.map((item,idx)=>{
        return  <Input  title={`${idx+1} `}  action={(e) => handleOptionData(e, idx)} />
        })}
       </div>
       </div>

      <div className="mt-5">
   <div className="flex w-full justify-between">
   <Dropdown classNames={"py-2 top-8 -left-[100px] z-50 absolute w-max"}
            button={
              <button
                className="
          border-0
          p-1   
          bg-black rounded-lg
          transition
          group
          text-white
          hover:opacity-70 
        "
              >
               Correct option -{opt}
              </button>
            }
          >
            <div className="flex text-black w-32 cursor-pointer flex-col justify-start  rounded-md z-50 bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <ul>
                <li
                  onClick={()=>{setCorrect(0);opt="A"}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
                  A
                  </li>
                  <li
                  onClick={()=>{setCorrect(1); opt="B"}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
                  B
                  </li>  <li
                  onClick={()=>{setCorrect(2); opt="C"}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
               C
                  </li>  <li
                  onClick={()=>{setCorrect(3);opt="D"}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
                  D
                  </li>
        </ul>
        </div>
      </Dropdown>
      <Dropdown classNames={"py-2 top-8 -left-[100px] z-50 absolute w-max"}
            button={
              <button
                className="
          border-0
          p-1   
          bg-black rounded-lg
          transition
          group
          text-white
          hover:opacity-70 
        "
              >
               Language selected:  {language}
              </button>
            }
          >
            <div className="flex text-black w-32 cursor-pointer flex-col justify-start  rounded-md z-50 bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:text-white dark:shadow-none">
              <ul>
                <li
                  onClick={()=>{setLang("English");}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
                  English
                  </li>
                  <li
                  onClick={()=>{setLang("French");}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
                French
                  </li>  <li
                  onClick={()=>{setLang("Spanish");}}
                  className="hover:bg-black/40 px-5 py-2  hover:text-white"
                >
               Spanish
                  </li>  
        </ul>
        </div>
      </Dropdown>
   </div>
      </div>
      <Button title={"Submit"} onClick={handleFormSubmit}></Button>
    </div>
  );
}
