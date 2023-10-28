import axios from "axios";
import { setUser } from "../Store/Slice/Userslice";

export default async  function FetchUser ( email, dispatch ) {
   await axios
    .post("http://localhost:8080/getUser", { email: email })
    .then((response) => {
      console.log("User got successfully:",response); 
      dispatch(setUser(response.data));
    })
    .catch((error) => {
      console.error("Error getting user:", error);
    });
}