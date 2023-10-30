import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth"; 
import React, { useEffect, useState } from 'react'
import Card from './Card'
import Input from './Input'
import { IoMdClose } from "react-icons/io";
import Button from './Button';
import toast from "react-hot-toast";

// import { CSSTransition } from "react-transition-group";
import { firbaseauth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import useEventModal from "../utils/useLogin";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import FetchUser from "../utils/FetchUser";
import { useDispatch } from "react-redux";
export default function SignUp(props) {
  const { isOpen: isLoginOpen, toggle: toggleLogin } = useEventModal("login"); 
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false)
  const dispacth=useDispatch();
  const[showPass,setShowPass]=useState(false);
  const [userName, setuserName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPass] = useState("");
   const handleDB=async()=>{
    const userData={
      email:email.toLowerCase(),name:userName
    }
    axios.post('https://quizbackend-5adb.onrender.com/SignUp',userData).then(response => {
      console.log('User created successfully:', response.data);
    })
    .catch(error => {
      console.error('Error creating user:', error);
    });
   }
  const handlesignup = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(firbaseauth, email, password); 
      toast.success(`You've signed up sucessfully !`, {
        duration: 1500,
      }); 
     const repsonse= await handleDB();
      toast.promise(
        repsonse,
         {
           loading: 'setting up DB...',
           success: <b>Settings saved!</b>,
           error: <b>Could not save.</b>,
         }
       )
       await FetchUser(email,dispacth);
        toast.success(`You're set to Rock!`, {
          duration: 500,
        });
         
     setLoading(false);
     handleCut()
    } catch (error) {
      alert(error);
    }
  }; 
   const { isMOpen, handleClose, user }=props 
    const [showModal, setShow] = useState();
    useEffect(() => {
      setShow(!isMOpen);
    }, [isMOpen]);
    const handleCut = () => {
      setShow(false);
      setuserName('')
      setPass('')
      setMail('')
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
        ${!showModal ? "opacity-100" : "opacity-0"}   mt-5 py-6 px-2 bg-purple-600  rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100`}>
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
    <h1 className='text-3xl font-semibold  text-white'>Sign Up </h1> 
  
      </div>
     
    </div>
       <div className="flex justify-center items-center px-6 gap-5 flex-col">
       <div className="flex gap-2 py-2 w-96  justify-center items-center">
          <span className='text-white'>
          Name:</span><Input value={userName} action={(e) => {
    setuserName(e.target.value);
  }}  title={"Username"}/>
          </div>
          <div className="flex gap-2 py-2 w-96   justify-center items-center">
          <span className='text-white'>
          Email:</span><Input value={email} action={(e) => {
    setMail(e.target.value);
  }} title={"Email"}/>
          </div> 
          <div className="flex w-96    py-2 justify-center items-center">
           <div className="flex w-96    py-2 justify-center gap-1 items-center">
          <span className='text-white'>
          Password:</span><Input type={!showPass&&'password'} value={password} action={(e) => {
    setPass(e.target.value)
  }} title={"Password"}/>
  </div>
          <div onClick={()=>{setShowPass(!showPass)}}>{showPass?<AiFillEye color="white" size={24}/>:<AiFillEyeInvisible color="white" size={24}></AiFillEyeInvisible>}</div>
          </div>
       </div>
       <div className="flex flex-col  justify-center pt-5 items-center border-t border-gray-100">
      <Button disable={loading} onClick={handlesignup} title={loading?<div className="flex gap-2">   <div class="animate-spin ease-linear rounded-full w-5 h-5 border-t-2 border-b-2 border-white ml-3"></div>Signing you...</div>:"Sign Up"}> 
      </Button>
  <div className="flex gap-2 text-white">
  Already have an account? <span className="text-purple-300 cursor-pointer hover:underline" onClick={toggleLogin}>Login</span>
  </div>
       </div>
      </Card>
      </div>
      </div>
    )
  }
   
