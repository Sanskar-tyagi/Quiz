import { createSlice } from '@reduxjs/toolkit';

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    quizData: null,
    language: null,
  },
  reducers: {
    setQuizData: (state, action) => { 
      state.quizData = action.payload; 
    },
    setLanguage: (state, action) => {
      state.language = action.payload;
    },
    resetQuiz:(state)=>{
state.language=null
state.quizData=null
    }
  },
});

export const { setQuizData, setLanguage,resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
