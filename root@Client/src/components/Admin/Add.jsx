import React, { useState } from 'react';
import Input from '../Input';

export default function Add() {
  // Define the initial state object with empty values
  const [questionData, setQuestionData] = useState({
    value: 1,
    language: "",
  });

  const [optionData, setOptionData] = useState([
    {
      option: '',
      isCorrect: false,
    },
    {
      option: '',
      isCorrect: false,
    },
    {
      option: '',
      isCorrect: false,
    },
    {
      option: '',
      isCorrect: false,
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({
      ...questionData,
      [name]: value,
    });
  };

  const handleOptionChange = (index, e) => {
    const { name, type, checked } = e.target;
  
    if (type === 'checkbox' && checked) {
      const updatedOptionData = optionData.map((option, i) =>
        i === index ? { ...option, [name]: checked } : { ...option, [name]: false }
      );
      setOptionData(updatedOptionData);
    } else {
      const { value } = e.target;
      const updatedOptionData = optionData.map((option, i) =>
        i === index ? { ...option, [name]: value } : option
      );
      setOptionData(updatedOptionData);
    }
  };
  

  const handleFormSubmit = () => {
    console.log("Question Data:", questionData);
    console.log("Option Data:", optionData);
  };

  // Render the component with the state data
  return (
    <div>
      <div className="flex">
        <Input title={'Question'} action={(e) => handleInputChange(e)} />
        <Input title={''} />
      </div>
      {optionData.map((option, index) => (
        <div className="flex" key={index}>
          <Input
            title={`Option ${index + 1}`}
            action={(e) => handleOptionChange(index, e)}
            value={option.option}
          />
          <Input
            title={'Is Correct'}
            type="checkbox"
            checked={option.isCorrect}
            action={(e) => handleOptionChange(index, e)}
          />
        </div>
      ))}
      <button onClick={handleFormSubmit}>Submit</button>
    </div>
  );
}
