import React from 'react'
import Button from './Button'
import ColorStats from './ColorStats'
import Card from './Card'

import {GrScorecard} from 'react-icons/gr'
import {IoLanguageOutline} from 'react-icons/io5'
import {GiConsoleController} from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'
import Avatar from './Avatar'

export default function UserMenu({user}) {
    const navigate=useNavigate(); 
  return (
    <div className="flex flex-col justify-center items-center">
    <Card extra={"mt-5 px-5 pb-2 bg-purple-400 justify-center items-center rounded-md gap-5 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100"}>
      <Avatar title={`Welcome ${user.name}`}/>
    <div className="flex md:flex-row flex-col gap-4 py-2">
    <ColorStats score={user?.HighestScore} icons={<GrScorecard size={"22px"}color="white"/>}color={"text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"} title={"HighScore"}>
     
      </ColorStats> 
      <ColorStats score={user.Languages.length}  icons={ <IoLanguageOutline size={"22px"}/>} color={"  bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"} title={"Languages known"}>
        </ColorStats>
      <ColorStats score={user.totalQuiz} icons={  <GiConsoleController size={"26px"}/>} color={" bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"} title={"Quizes Given"}>
  
      </ColorStats >
    </div>

  <Button  title={"Take a quiz"} onClick={()=>{navigate('/QuizMenu')}}/>
  </Card>
  </div>
  )
}
