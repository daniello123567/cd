"use client"
import React, {  useState } from 'react'
import font from 'next/font/local';
import { exampleUser, supabase } from '../utils/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const extHeavy = font({ src: "../../public//chirp-extended-heavy-web.woff2" })
const UserName = font({ src: '../../public/Chirp-Regular.80fda27a.woff2' });
const ChirpBold = font({ src: '../../public/Chirp-Bold.ebb56aba.woff2' })

function Page() {

const [logininfo,setlogininfo] = useState<{username:string,password:string}>({username:'',password:''});
const [loading,setloading] = useState<boolean>(false)
const [errors,setError] = useState<string>('')
const {setInfo} = exampleUser();
const router = useRouter()
const checkifcorrect = async()=>{
  setloading(true)
  const {data,error} = await supabase.from('users').select().eq('UserName',logininfo.username).single();
  setloading(false)
  if(data){
    const {password,UserName,image:profilephoto,Name,id} = data;
    if(logininfo.password===password){
          setInfo({name:Name,username:UserName,image:profilephoto,id:id});
          router.push('/')
    }else{
     setError('incorrect password and cresidentials');
     setlogininfo({username:'',password:''});return;
    }
  }else if(error){
   setError(error.message);return;
  }else{
   setError('User Not Found!,Please check well or sign up');
   return;
  }

}
  return (
    <div className={`w-full dark:text-white h-screen  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  min-h-screen`}>
      <div className={`h-full pt-[4rem] pb-[4em] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>
         <div className='w-full h-full flex justify-center items-center'>

          <div className='w-[80%] p-[2em] dark:bg-[#000] bg-white rounded-[1em] h-fit'>
            <div className='flex'>

                     <p className={`${extHeavy.className} mb-[1em] text-[23px]`}>Sign in to CD</p>
    <svg className='w-[2em] h-[2em] text-black dark:text-white' fill="currentColor" height="200px" width="200px" version="1.1" viewBox="0 0 512 512" ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <path d="M377.141,170.492V121.14C377.141,54.343,322.796,0,256,0S134.86,54.343,134.86,121.14v49.352 c-36.292,6.614-63.9,38.439-63.9,76.611v221.357c0,24.007,19.531,43.539,43.538,43.539h283.003 c24.007,0,43.539-19.532,43.539-43.539V247.103C441.04,208.931,413.433,177.106,377.141,170.492z M203.709,121.14 c0-28.833,23.457-52.292,52.291-52.292c28.833,0,52.292,23.457,52.292,52.292v48.068H203.709V121.14z M287.554,350.925v41.999 c0,17.426-14.127,31.554-31.553,31.554c-17.426,0-31.554-14.127-31.554-31.554v-41.999c-12.938-9.638-21.32-25.053-21.32-42.427 c0-29.202,23.672-52.874,52.874-52.874c29.2,0,52.874,23.672,52.874,52.874C308.874,325.872,300.492,341.287,287.554,350.925z"></path> </g> </g> </g></svg>
            </div>
{errors&&<p className={`text-red-600 ${ChirpBold.className}`}>{errors}</p>}
            <input onChange={(e)=>setlogininfo({...logininfo,username:e.currentTarget.value})} className={`${UserName.className} h-[60px] dark:border-[#3F3E47] border-[#EDEDF5] p-[8px] rounded-[4px] border w-full`} placeholder='UserName' type="text" />
           <input onChange={(e)=>setlogininfo({...logininfo,password:e.currentTarget.value})} className={`${UserName.className} h-[60px] mt-[1em] dark:border-[#3F3E47] border-[#EDEDF5] p-[8px] rounded-[4px] border w-full`} placeholder='Password' type="text" />
     <Link className={`${UserName.className}`} href={`/signup`}><p>OR <span className='text-sky-500 text-sm underline'>sign up</span></p></Link>
    <button onClick={checkifcorrect} className={`${ChirpBold.className} cursor-pointer mt-[2em] h-[34px] flex items-center justify-center w-full rounded-full bg-black text-white dark:bg-white dark:text-black`}>{loading?          <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:'sign in'}</button>

          </div>
         </div>
        </div>
      </div>
  )
}

export default Page
