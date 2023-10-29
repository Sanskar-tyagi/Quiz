import Navbar from '../components/Navbar';
import Card from '../components/Card'; 
import Select from '../components/Select'; 
import toast  from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { useEffect, useState } from 'react';
import { getLang } from '../utils/getLang';
import { resetQuiz } from '../Store/Slice/QuizSlice';

export default function QuizMenu(props) {
  const user = useSelector((state) => state.users.user); 
  const [lang,setLang]=useState(); 
  console.log(lang,'lag');
     async function fetchData () {
      if (!lang) {
        const data =await getLang();
        setLang(data);
      }
    }
    useEffect(()=>{
      fetchData();
      resetQuiz()
      toast.dismiss();
    },[])
 
  return (
    <div> 
         
          <Navbar user={user}/>
       <div className="flex flex-col justify-center items-center"> 
 <Card extra={"mt-5 text-white px-5 pb-2 bg-purple-400 justify-center items-center rounded-md gap-5 bg-clip-padding  bg-opacity-10 border border-gray-100"}>
<div className="flex justify-center items-center px-6 ">
 <button class="cursor-pointer group block px-5 py-2 rounded-md bg-black text-white mt-4 text-4xl font-semibold shadow-2xl hover:scale-110 transition active:scale-90">
  <span  >Select a Language to learn</span> 
</button>
</div>
<div className="flex flex-col gap-4 mt-5">
<div className="grid grid-cols-3 gap-5">
{lang ? lang.map((e)=>{
return <Select lang={e.language}  participants={e.participantsCount}  solved={"1"} total={"50"}/>
}) :<>Please wait while we fetch all the Languages for quiz..</>}
</div>
<div className="flex justify-between">
   <div className="flex items-center ml-3">
    <h1 className="text-lg text-yellow-400">More Language coming soon..</h1>
   </div>
  <Button title={'Request a Language'}/>
</div>
</div>
   </Card>
    </div> 
    </div>
  )
}
