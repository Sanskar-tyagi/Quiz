import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Admin/Header";
import Navbar from "../components/Navbar"; 
import Add from "../components/Admin/Add";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function Admin() {
  const user = useSelector((state) => state.users.user); 
  const nav=useNavigate();
  useEffect(()=>{
  if(user){
    if(!user.isAdmin){
        nav('/')
     }
  }else{
    setTimeout(()=>{
      nav('/')
    },1000)
  }
  })
   
  return <div>
    <Navbar user={user}/>
    <div className="flex flex-col justify-center items-center">
  <Card extra={"flex flex-col justify-center items-center mt-5 px-5 pb-2 bg-purple-400   rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100"}>
    
  <Header/>
 
<Add/>
  </Card>
  </div>
  </div>;
}
