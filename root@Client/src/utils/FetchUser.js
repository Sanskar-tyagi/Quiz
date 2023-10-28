import axios from "axios";
import { setUser } from "../Store/Slice/Userslice";

export default async  function FetchUser ( email, dispatch ) {
   await axios
    .post("https://quizbackend-5adb.onrender.com/getUser", { email: email })
    .then((response) => {
      console.log("User got successfully:",response); 
      dispatch(setUser(response.data));
    })
    .catch((error) => {
      console.error("Error getting user:", error);
    });
}