import React from 'react'
import Card from './Card'
import logo from '../assets/Quiz-O.png'
import useEventModal from '../utils/useLogin';
export default function Anonymous() {
    const { isOpen: isLoginOpen, toggle: toggleLogin } = useEventModal("login");
 
  return (
    <div  className="flex flex-col justify-center h-[80vh] items-center">
       <Card extra={"mt-5 px-5 pb-2 bg-purple-400 justify-center items-center rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100"}>
        <Card style={{background:'#000000'}} extra={"my-5 w-72 h-72 justify-start items-center bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90 border border-gray-100 rounded-full"}>
      <div className="relative">
           <img src={logo} className='w-48  rounded-full' alt="" />
        </div>
      <div className="flex absolute bottom-16 flex-col justify-center items-center">
      <span className="text-2xl pb-4 text-white whitespace-nowrap">Welcome</span>
        <p className="text-white text-sm"> 
            Please <span className="text-purple-400 cursor-pointer hover:underline" onClick={toggleLogin}>Login</span> to play the game
            </p> 
      </div>
        </Card></Card>
        </div>
  )
}
