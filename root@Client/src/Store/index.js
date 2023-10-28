import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "./Slice/Modal";
import scoreReducer from '../Store/Slice/Score'
import quizReducer from '../Store/Slice/QuizSlice'
import userReducer from '../Store/Slice/Userslice'
const store = configureStore({
  reducer: {
    users:userReducer,
    modals: modalReducer,
    score: scoreReducer,
    quiz: quizReducer,
  },
 
});

export default store;