import { initializeApp } from "firebase/app"; 
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAguUqAt8ElvOm3oNNXhHNjfxD8VczfZNU",
  authDomain: "quiz-0-ce628.firebaseapp.com",
  projectId: "quiz-0-ce628",
  storageBucket: "quiz-0-ce628.appspot.com",
  messagingSenderId: "1016405067992",
  appId: "1:1016405067992:web:343bac21f0d186b708afad"
};
 
const app = initializeApp(firebaseConfig);
export const firbaseauth = getAuth(app);