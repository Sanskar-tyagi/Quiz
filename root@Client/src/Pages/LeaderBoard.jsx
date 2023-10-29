import React, { useEffect, useState } from 'react'
import Card from '../components/Card'
import { getLang } from '../utils/getLang';
import Dropdown from '../components/DropDown';
import { getLeader } from '../utils/FetchLeaderBoard';
import AvatarL from '../components/AvatarL';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { CgTrophy } from 'react-icons/cg';

export default function LeaderBoard() {
  const user = useSelector((state) => state.users.user);
  let i=3;
    const[lang,setLang]=useState();
    async function fetchData () {
        if (!lang) {
          const data =await getLang();
          setLang(data.data);
        }
        const data= await getLeader(Language);
         setLeaders(data);
    }
    const [Language,setLanguage]=useState("English");
      useEffect(()=>{
       fetchData();
      },[Language])
const[Leaders,setLeaders]=useState(); 
  return (
    <div>
        <Navbar user={user}/>
        <div className="flex justify-center items-center"> 
        <Card   extra={ 
              "my-5 min-w-[40vw] xl:w-[50vw] w-full text-white px-10 pb-2 bg-purple-600 justify-center items-center rounded-md gap-5 bg-clip-padding  backdrop-filter backdrop-blur-lg bg-opacity-30  "
            } >
<div className="flex  w-full h-14 justify-center items-center rounded-b-lg">

     <h1 className=' text-yellow-400 text-2xl  font-semibold'> LeaderBoard 
       </h1>
      <CgTrophy className='text-yellow-400' size={30}/> 
</div>
      <Dropdown  classNames={"py-2  md:-top-[18px] top-[10px] left-20 md:left-24 z-50 absolute w-max"} button={<div className='absolute whitespace-nowrap rounded-lg  bg-purple-300 px-5 py-2 text-sm   md:-top-16 font-semibold -top-5 left-10 md:left-32 text-black'>Language : {Language}</div>}>
        <div className="flex flex-col bg-white text-black justify-center items-center rounded-md">
        {  lang?.map((item)=>{
            return   <span onClick={()=>{setLanguage(item?.language)}} className=' py-1.5 cursor-pointer px-5 border-b border-gray-200'>{item?.language}</span>
        })}
        </div>
      </Dropdown>
     
<div className="flex flex-col gap-10   justify-center items-center">
<div className="flex">
   { Leaders?.slice(0, 1).map((item)=>{
        return <div className={`flex  relative rounded-lg  bg-golden py-2   justify-between`}>{item.isTrue && <>
        <div className="block top-1 left-1 absolute z-30  p-1 max-h-min h-[35px] rounded-lg bg-yellow-400"><CgTrophy size={30}/></div>
        </>} <AvatarL title={item?.name} score={item?.score}></AvatarL>      {item?.name===user?.name && <div className='absolute -left-4 -top-8 text-black -z-10  rounded-xl px-1.5 py-1.5 bg-white/20 '>you
        </div>}  </div>
   
      } ) 
      } 
   </div>
   <div className="flex gap-10">
   { Leaders?.slice(1, 3).map((item)=>{
        return <div className={`flex  relative rounded-lg  mb-3  justify-between `}>{item.isTrue && <>
        <div className="block top-1 left-1 absolute z-30  p-1 max-h-min h-[35px] rounded-lg bg-yellow-400"><CgTrophy size={30}/></div>
        </>} <AvatarL title={item?.name} score={item.score}></AvatarL>   {item?.name===user?.name && <div className='absolute -left-4 -top-8 text-black -z-10  rounded-full px-1.5 py-1.5 bg-white/20 '>you
        </div>}  </div>
      } ) 
      } 
   </div>
  
   { Leaders?.slice(3).map((item)=>{
    i++;
        return( <div className='flex  relative mt-2 mb-3 rounded-lg w-full   justify-between'> 
          {item?.name===user?.name && <div className='absolute -left-10 -top-8 text-black -z-10  rounded-xl px-1.5 py-1.5 bg-white/20 '>you
        </div>}
         <div className={`flex justify-between w-full h-[32px] items-center cursor-pointer absolute text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600   hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-3 py-1 text-center -bottom-1`}> 
    <span className='text-lg '>Rank:  {i}</span> <span className="text-sm whitespace-nowrap px-2">HighScore : {item.score}</span>
    </div>  </div>
  )

} ) 
      } 
</div>
        </Card>
        </div>
    </div>
  )
}
