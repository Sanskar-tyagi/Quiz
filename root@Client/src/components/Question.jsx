import React, { useEffect, useState } from "react";

export default function Question(props) {
  const { question, values, onSelectOption,select }= props;
   
  return (
    <div>
      <h1 className="text-3xl py-4 rounded-b-xl px-5 mb-5 bg-gray-500 ">Q: {question}</h1>
      <div className="flex flex-col gap-4 md:px-5 md:mx-5 ">
        {values?.map((item) => {  
          return (
            <div
              className="flex  items-center rounded-xl bg-purple-400 py-1 px-2 gap-4"
              onClick={() => onSelectOption(item._id)}
              key={item?.option}
            >
              <label className="container">
                <input
                  type="radio" 
                  name={`question_${question}`} // Use a unique name for each question
                  onChange={() => onSelectOption(item._id)}
                  checked={select &&select===item._id}
                />
                <div className="checkmark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon"
                    viewBox="0 0 512 512"
                  >
                    <title>Checkmark</title>
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="32"
                      d="M416 128L192 384l-96-96"
                    ></path>
                  </svg>
                </div>
              </label>
              <li className="list-none">
                <span className="text-2xl">{item?.option?.replace(/"/g, '')}</span>
              </li>
            </div>
          );
        })}
      </div>
    </div>
  );
}
