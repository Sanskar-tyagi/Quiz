import React from 'react' 
import {FaUsers} from 'react-icons/fa'
import {PiPencilLineLight} from 'react-icons/pi'
import SlideBtn from './SlideBtn'
import { useDispatch  } from 'react-redux'
import {setLanguage  } from '../Store/Slice/QuizSlice'
import { useNavigate } from 'react-router-dom'  
export default function Select(props) {
    const{participants, lang,solved,total}=props
    const dispatch = useDispatch();
    const navigate=useNavigate(); 
    const handleSubmit = () => {
        dispatch(setLanguage(lang));  
        navigate('/Quiz');
      }; 
  return (
    <div className='flex gap-5 justify-between items-center bg-gradient-to-tr from-purple-200 via-purple-400 to-purple-800 w-full  py-3 px-5 rounded-xl'>
 <div className="flex flex-col text-gray-900 gap-3 font-semibold justify-center items-start">
 <h1 className='text-2xl'>{lang}</h1>
 <div className=" flex justify-start items-center gap-5">
<div className="flex flex-col ">
<h1 className="text-lg ml-2 flex justify-start items-center gap-2"> <FaUsers size={25} className='text-green-600'/>{participants}  </h1>
 <p className='text-sm  font-normal mt-2 underline'>  Participants</p>
</div>
<div className="flex flex-col">
<h1 className="text-lg flex ml-3 justify-start items-center gap-2"> <PiPencilLineLight  size={25} className='text-gray-500'/>{solved}  </h1>
 <p className='text-sm  font-normal mt-2 underline'> Your Attempts</p>
</div>
 </div>
 </div>
 <SlideBtn onClick={handleSubmit} title={"Attempt Test"}/>
    </div>
  )
}
