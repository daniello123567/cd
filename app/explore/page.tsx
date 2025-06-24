"use client"
import { useQuery } from '@tanstack/react-query';
import font from 'next/font/local';
import { SetStateAction,  useState } from 'react';
import { SearchUsers, TrendingNews } from '../utils/utils';
import { user } from '../utils/types';
import Link from 'next/link';
const UserName = font({src:'../../public/Chirp-Regular.80fda27a.woff2'});
const ChirpBold = font({src:'../../public/Chirp-Bold.ebb56aba.woff2'})

const SearchIcon = ()=>{
  return <svg height={13.3167} width={13.3167} className='absolute top-[.8em] left-[1.2em] text-black dark:text-white' fill='currentColor' viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
}
const Trending = ({title,image,time}:{title:string,image:string,time:string})=>{
  return <div className='w-full p-[1em] h-fit'>
       <p className={`${ChirpBold.className} text-[1.0625rem]`}>{title}</p>
       <div className='flex gap-[.4em] mt-[.2em] items-center'>
        <div className='w-[22px] bg-red-700 rounded h-[22px]'></div>
          <span className={`text-[.8125rem] ${UserName.className} text-[#536471]`}>{time}</span>
       </div>
       <div className='w-[100%] overflow-hidden h-[9em] rounded mt-[.5em] bg-red-600'>
        <img className='w-full h-full object-cover' src={image} alt={title} />
       </div>
  </div>
}

const Result = ({image,username,name,user_id}:{image:string,username:string,name:string,user_id:string})=>{
  return <Link href={`/profile/${user_id}`} className='h-[65.0667px] hover:bg-gray-100 cursor-pointer active:bg-gray-100 gap-[8px] flex items-center w-full'>
         <div className='w-[40px] overflow-hidden h-[40px] bg-amber-600 rounded-full'>
          <img src={image} alt='' />
         </div>
 <div className='flex text-[.9375rem] flex-col'>
  <p className={`${ChirpBold.className}`}>{name}</p>
  <p className='text-[#536471] '>@{username}</p>
 </div>
  </Link>
}

const Cancelwords = ({setSearch}:{setSearch:React.Dispatch<SetStateAction<string>>})=>{
  return <svg onClick={()=>{setSearch('');document.getElementById('searchinput')?.focus()}} width={18.8} height={18.8} className='absolute cursor-pointer  top-[.6em] right-[1em]' viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M12 1.75C6.34 1.75 1.75 6.34 1.75 12S6.34 22.25 12 22.25 22.25 17.66 22.25 12 17.66 1.75 12 1.75zm3.71 12.54l-1.42 1.42-2.29-2.3-2.29 2.3-1.42-1.42 2.3-2.29-2.3-2.29 1.42-1.42 2.29 2.3 2.29-2.3 1.42 1.42-2.3 2.29 2.3 2.29z"></path></g></svg>
}
const Suggestion = ({isPending,data}:{isPending:boolean,data:user[]|undefined})=>{
  return <div className={`${UserName.className}  flex justify-center items-center`}>
       <div className="min-h-[5rem] p-[1em] dark:bg-[#000] max-h-[26rem] overflow-y-auto dark:shadow-white/30 shadow-2xl rounded-[8px] absolute top-[3em] bg-white w-[90%]">
        <p className={`${ChirpBold.className} text-[1.25rem]`}>Results</p>
        <hr className='border mb-[.5em] border-[#EDEDF5]  dark:border-[#3F3E47] mt-[.3em] '/>
       <div className='flex flex-col'>
        {!isPending? data?.map((user)=>{return <Result key={user.id} name={user.Name} user_id={user.id} image={user.image} username={user.UserName} />}):<svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
}{!isPending&&data?.length==0&&<p className='text-center text-[.8125rem] text-[#536471]'>No results found</p>}
       </div>
       </div>
  </div>
}




export default function Page() {
  const [searchTerm,setSearchTerm] = useState<string>('');
  const {data,isPending} = useQuery({
    queryKey:[searchTerm],
    queryFn:()=>SearchUsers(searchTerm)
  });


  return <div className={`w-full dark:text-white bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  h-fit`}>
    <div className={`h-full pb-[4em] pt-[4rem] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>

 <div className="w-full flex flex-col justify-center pb-[1em]  h-fit pt-[.5em] ">
        <div className='w-full px-[.5rem]  h-fit relative'>
                  <input id='searchinput' value={searchTerm} onChange={(e)=>setSearchTerm(e.currentTarget.value)} className={`${UserName.className} placeholder:text-[.8125rem] h-[40px]  pl-[2em] dark:text-white rounded-full outline-0 border dark:border-[#3F3E47] border-[#EDEDF5] w-full`} placeholder="search" type="text" />
<SearchIcon/>
{searchTerm.length!==0&&<Suggestion data={data} isPending={isPending}/>}
{searchTerm.length!==0&&<Cancelwords setSearch={setSearchTerm}/>}
        </div>
  <hr className=' dark:border-[#3F3E47] mt-[1em] w-full  border-[#EDEDF5]' />
 <p className={`${ChirpBold.className} px-[.5rem]  mt-[.6rem] text-[1.25rem]`}>Today&apos;s News</p>
<div className='grid w-full  grid-cols-2'>
  {TrendingNews.map((news)=>{
  return <Trending key={news.Title} image={news.Image} title={news.Title} time={news.Time}/>
 })}
</div>

 </div>


    </div>
  </div>
}
