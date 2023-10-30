import React from 'react'

export default function ColorStats(props) {
    const{color,icons,score,title}=props;
  return (
    <div className={`flex bg-opacity-60 flex-col gap-2 justify-center items-center max-w-sm p-6 ${color} `}>
{icons && <div className="flex flex-col-reverse justify-center items-center gap-2">
{icons}
  </div>   }
  <div className="flex bg-yellow-500 justify-center items-center rounded-full ring-2 ring-yellow-300  w-24 h-24"><p class="text-4xl bg-white flex justify-center items-center w-16 h-16 text-center rounded-full  text-purple-600">{score?score:'0'}</p></div>
<p class="text-xl font-semibold text-gray-800  tracking-tight ">{title}</p>
    </div>
  )
}
