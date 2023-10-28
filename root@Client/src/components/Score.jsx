import React from 'react' 
export default function Score({percent,title,score,total}) {
    const circumference=50*2*Math.PI;
  return (
    <div class="flex items-center justify-between flex-wrap max-w-sm w-full px-10 bg-white shadow-xl rounded-2xl h-20"
    
    >
       <div class="flex items-center justify-center -m-6 overflow-hidden bg-white rounded-full">
         <svg class="w-32 h-32 transform translate-x-1 translate-y-1" x-cloak aria-hidden="true">
           <circle
             class="text-gray-300"
             stroke-width="10"
             stroke="currentColor"
             fill="transparent"
             r="50"
             cx="60"
             cy="60"
             />
           <circle
  className="text-blue-600"
  strokeWidth={10}
  strokeDasharray={circumference}
  strokeDashoffset={circumference - (percent / 100) * circumference}
  strokeLinecap="round"
  stroke="currentColor"
  fill="transparent"
  r={50}
  cx={60}
  cy={60}
/>          </svg>
         <span class="absolute text-2xl text-blue-700"  >{percent} %</span>
       </div>
     <div className="flex">
     <p class="ml-2 text-sm font-medium text-gray-600 sm:text-xl"> You scored {score} out of {total}</p>  
     </div>
   </div>
 
  )
}
