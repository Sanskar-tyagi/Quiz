import React from 'react'

export default function Avatar({title ,extra}) {
  return (
    <div className={`flex mt-10 relative flex-col justify-center items-center ${extra}`}> 
    <img class="w-32  h-32 p-1 bg-black rounded-full ring-2 ring-gray-300 dark:ring-gray-500" src="https://png.pngtree.com/png-clipart/20221207/ourmid/pngtree-fashion-boy-avatar-png-image_6514592.png" alt="Bordered avatar"/>
    <div className="flex justify-center items-center cursor-pointer absolute text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-3 py-1.5 text-center -bottom-1"> 
      <span className="text-sm whitespace-nowrap">{title}</span>
    </div>
          </div>
  )
}
