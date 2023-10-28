import React, { useEffect, useState } from "react";  
import Navbar from "../components/Navbar";  
import UserMenu from "../components/UserMenu";
import Anonymous from "../components/Anonymous";
import Login from "../components/Login";
import  { Toaster } from "react-hot-toast";

import useEventModal from "../utils/useLogin";
import SignUp from "../components/SignUp"; 
import { useSelector } from "react-redux";

export default function Main(props) {
  const{...rest}=props
  const user = useSelector((state) => state.users.user);

console.log(user);
  const { isOpen: isLoginOpen, toggle: toggleLogin } = useEventModal("login");
  const { isOpen: isSignupOpen, toggle: toggleSignup } = useEventModal("signup");
  return <div>
    <Navbar user={user}/>
    <Toaster
          toastOptions={{ 
            style: {
              border: "1px solid #713200",
              padding: "16px",
              color: "#713200",
            },
          }}
        />
    <SignUp isMOpen={isSignupOpen} handleClose={toggleSignup}  />
    <Login isMOpen={isLoginOpen} handleClose={toggleLogin} />
    {user ? <UserMenu user={user}/>:<Anonymous/>}
   

  </div>;
}
