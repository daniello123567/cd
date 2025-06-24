"use client"
import React from 'react'
import font from 'next/font/local';
import Singletweet from '@/app/components/Singletweet';
import { useQuery } from '@tanstack/react-query';
import { getUserPosts, getUserProfile } from '@/app/utils/utils';
import { useParams } from 'next/navigation';
import Loading from '@/app/components/Loading';

const UserName = font({src:'../../../public/Chirp-Regular.80fda27a.woff2'});
const ChirpBold = font({src:'../../../public/Chirp-Bold.ebb56aba.woff2'})

function Page() {
const id = useParams().id;
const {data:userposts,isPending} = useQuery({
  queryKey:['userPost'],
  queryFn:()=>getUserPosts(String(id))
})
const {data:userprofile,isPending:UPpending} = useQuery({
  queryKey:["userprofile"],
  queryFn:()=>getUserProfile(String(id))
});
if(!userprofile)return;
const {Name,UserName:username,Bio,image,cover_photo} = userprofile?.[0];



return (
     <div className={`w-full dark:text-white bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  min-h-screen`}>
    <div className={`h-full pb-[4em] pt-[4rem] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex flex-col py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>
{UPpending?<div className='h-[5em] w-full flex justify-center items-center'>
  <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>

</div>:<div className='w-full relative bg-white h-fit'>
  <div className='w-full bg-gray-200 overflow-hidden h-[8.5em] sm:h-[199.333px]'>
     {cover_photo&&<img className='w-full h-full object-cover' src={cover_photo?cover_photo:''} alt={Name} />}
  </div>
 <div className={`sm:w-[133.5px]   overflow-hidden sm:top-[7.9em] border-2 border-white absolute top-[6em] left-[1em]  w-[5em] h-[5em] sm:h-[133.5px] bg-red-500 rounded-full`}>
      <img className='w-full h-full object-cover' src={image} alt={Name} />
        <div className='w-full z-50 bg-blue-600 h-full'>hello</div>
 </div>
</div>}
<div className='w-full p-[1em] mt-[3em] sm:mt-[4em]'>
  <div></div><p className={`text-[20px] ${ChirpBold.className}`}>{Name}</p>
  <p className={`${UserName.className} text-[15px] text-[#536471]`}>@{username}</p>
<p className={`text-[15px] ${UserName.className}`}>{Bio}</p>
<p className={`text-[15px] ${ChirpBold.className} dark:border-[#3F3E47] border-[#EDEDF5] pb-[.5em] mt-[1em] border-b`}>Posts</p>
</div>
{isPending?<div className='h-[5em] w-full flex justify-center items-center'>
  <svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>

</div>:<div className='flex flex-col'>
  {isPending?<Loading/>:userposts?.map((post)=>{
    return <Singletweet dc={post.dc} dl={post.dl} key={post.id} media={post.media} user_id={post.user_id} user_image={post.user_image} post={post.post} Name={post.Name} username={post.username} created_at={post.created_at} id={post.id}/>
  })}
</div>}
{!isPending&&userposts?.length==0&&<div className='w-full h-[5em] flex flex-col items-center '>
  <p className={`text-sm ${UserName.className} text-gray-600 mb-[.5em]`}>No post(s) yet</p>
  <p className={`text-sm ${UserName.className} text-black`}>click on &apos;NEW POST&apos; to begin.</p>

  </div>}
</div></div>
  )
}

export default Page
