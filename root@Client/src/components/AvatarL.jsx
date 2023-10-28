import React from 'react'

export default function AvatarL({title ,extra,score}) {
  return (
    <div className={`flex px-5 relative group flex-col justify-center items-center ${extra}`}> 
    <img class="w-32  h-32 p-1 bg-black rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src={`https://api.multiavatar.com/${title}.svg`} alt="Bordered avatar"/>
    <div className="flex justify-center w-32 items-center cursor-pointer absolute text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-3 py-1 text-center -bottom-1"> 
      <span className="text-sm whitespace-nowrap">HighScore : {score}</span>
    </div>
    <div className="flex gap-3 whitespace-nowrap z-40 justify-center items-center group-hover:opacity-100 group-hover:scale-100 scale-0 origin-bottom-right transition-all duration-300 ease-in-out opacity-0 -left-14 -top-5 bg-white min-w-32 rounded-lg text-black px-3 py-1  absolute">
   <p className='text-lg font-semibold'>User :</p>
   <span className='text-gray-500'> {title} </span>
    </div>
          </div>
  )
}
