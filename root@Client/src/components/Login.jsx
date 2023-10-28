import React, { useEffect, useState } from 'react'
import Card from './Card'
import Input from './Input'
import { IoMdClose } from "react-icons/io";
import Button from './Button';
import useEventModal from '../utils/useLogin';
import { firbaseauth } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login(props) {
 const { isMOpen, handleClose, user }=props 
 const { isOpen: isSignupOpen, toggle: toggleSignup } = useEventModal("signup");const [email, Setemail] = useState(""); const [pass, usepass] = useState("");
 const handleLogin = async (event) => {
  event.preventDefault();
  try {
    const mail = email;
    const password = pass;
    await signInWithEmailAndPassword(firbaseauth, mail, password); 
    handleCut();
  } catch (error) { 
    alert(error);
  }
};
  const [showModal, setShow] = useState();
  useEffect(() => {
    setShow(!isMOpen);
  }, [isMOpen]);
  const handleCut = () => {
    setShow(false);
    setTimeout(() => {
      handleClose();
    }, 300);
  };
  if (!isMOpen) {
    return null;
  }
  return (
    <div
    className={`
     text-black
bg-neutral-800/50 fixed  
inset-0 
z-50
flex 
items-center 
justify-center 
overflow-hidden 
overflow-y-auto
overflow-x-hidden 
outline-none
focus:outline-none
`}
  >
    <div
      className="
relative 
my-6
mx-auto
h-full
w-full
md:h-auto
md:w-4/6 
lg:h-auto 
lg:w-3/6
xl:w-2/5
"
    >
    <Card extra={`  translate
      h-full
      duration-300
      ${!showModal ? "translate-y-0" : "translate-y-full"}
      ${!showModal ? "opacity-100" : "opacity-0"}   mt-5 py-6 px-2 bg-purple-400  rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}>
 <div className="flex     relative  w-full border-b pb-2 border-gray-100 items-center justify-center">
 <button
                  className="
              border-0
              p-1 
              absolute left-1
              transition
              hover:opacity-70 
            "  onClick={handleCut}
                >
                  <IoMdClose fill="red" size={25} />
                </button>
  <div className="flex flex-col gap-2  justify-center items-center">
    <img src="" alt="" />
  <h1 className='text-3xl font-semibold  text-white'>Login in </h1> 

    </div>
   
  </div>
     <div className="flex justify-start items-center px-6 gap-5 flex-col">
  
        <div className="flex gap-2 py-2 w-80  justify-end items-center">
        <span className='text-white'>
        Email:</span><Input action={ (e) => {
    Setemail(e.target.value);
  }} title={"Email"}/>
        </div> 
         <div className="flex gap-2 w-80   py-2 justify-end items-center">
        <span className='text-white'>
        Password:</span><Input action={(e) => {
    usepass(e.target.value);
  }} title={"Password"}/>
        </div>
     </div>
     <div className="flex  flex-col gap-2  justify-center pt-5 items-center border-t border-gray-100">
    <Button title={"Login in "} onClick={(e)=>{
      handleLogin(e)
    }}> 
    </Button>
    <div className="flex gap-2 text-white">
  Don't have an account? <span className="text-purple-300 cursor-pointer hover:underline" onClick={toggleSignup}>Sign up Here...</span>
  </div>
     </div>
    </Card>
    </div>
    </div>
  )
}
