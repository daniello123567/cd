"use client"
import React, { useEffect, useState } from 'react'
import font from 'next/font/local';
import { exampleUser,  newNotys,  notificationStore, supabase,fetchAllusersNotifications } from '../utils/utils';
import Link from 'next/link';
import Loading from '../components/Loading';
const UserName = font({src:'../../public/Chirp-Regular.80fda27a.woff2'});
const ChirpBold = font({src:'../../public/Chirp-Bold.ebb56aba.woff2'});

const FollowN = ({image,username,sender}:{sender:string,image:string,username:string})=>{
  const {info} = exampleUser()
  return <div className='w-full border-b dark:border-[#3F3E47] border-[#EDEDF5]  p-[1em] flex gap-[8px] h-[88px]'>
<svg width={22} height={22} className='text-[#1d9bf0]' fill='currentColor' viewBox="0 0 24 24"><g><path d="M17.863 13.44c1.477 1.58 2.366 3.8 2.632 6.46l.11 1.1H3.395l.11-1.1c.266-2.66 1.155-4.88 2.632-6.46C7.627 11.85 9.648 11 12 11s4.373.85 5.863 2.44zM12 2C9.791 2 8 3.79 8 6s1.791 4 4 4 4-1.79 4-4-1.791-4-4-4z"></path></g></svg>
 <div className='flex h-full flex-col'>
  <div className='h-[32px] w-[32px] bg-yellow-700 rounded-full'>
    <img className='w-full h-full object-cover' src={image} alt={username} />
  </div>
 <p className={'text-[15px] flex gap-[.2em]'}>
  <Link href={`profile/${sender}`} className={`${ChirpBold.className} hover:underline cursor-pointer `}>@{info.username===username?'you':username}</Link>
  <span className={`${UserName.className}`}>followed you{info.username===username&&'rself'}</span>
 </p>
 </div>
  </div>
}
const LikeN = ({image,username,sender}:{sender:string,image:string,username:string})=>{
    const {info} = exampleUser()

  return <div className='w-full border-b dark:border-[#3F3E47] border-[#EDEDF5]  p-[1em] flex gap-[8px] h-[88px]'>
<svg className='text-[#f91880]' fill='currentColor' width={22} height={22} viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path></g></svg>
 <div className='flex h-full flex-col'>
  <div className='h-[32px] overflow-hidden w-[32px] bg-yellow-700 rounded-full'>
    <img className='w-full h-full object-cover' src={image} alt={username} />

  </div>
 <p className={'text-[15px] flex gap-[.2em]'}>
  <Link href={`profile/${sender}`} className={`${ChirpBold.className} hover:underline cursor-pointer `}>@{info.username===username?'you':username}</Link>
  <span className={`${UserName.className}`}>Liked Your {info.username===username&&'own'} Post</span>
 </p>
 </div>
  </div>
}
const Comment = ({image,username,sender}:{sender:string,image:string,username:string})=>{
      const {info} = exampleUser()

  return <div className='w-full border-b dark:border-[#3F3E47] border-[#EDEDF5]  p-[1em] flex gap-[8px] h-[88px]'>
                <svg className='text-[#6e18f9]' height={22} width={22} fill='currentColor' viewBox="0 0 24 24" aria-hidden="true"><g><path d="M1.751 10c0-4.42 3.584-8 8.005-8h4.366c4.49 0 8.129 3.64 8.129 8.13 0 2.96-1.607 5.68-4.196 7.11l-8.054 4.46v-3.69h-.067c-4.49.1-8.183-3.51-8.183-8.01zm8.005-6c-3.317 0-6.005 2.69-6.005 6 0 3.37 2.77 6.08 6.138 6.01l.351-.01h1.761v2.3l5.087-2.81c1.951-1.08 3.163-3.13 3.163-5.36 0-3.39-2.744-6.13-6.129-6.13H9.756z"></path></g></svg>
 <div className='flex h-full flex-col'>

  <div className='h-[32px] overflow-hidden w-[32px] bg-yellow-700 rounded-full'>
    <img className='w-full h-full object-cover' src={image} alt={username} />

  </div>
 <p className={'text-[15px] flex gap-[.2em]'}>
  <Link href={`profile/${sender}`} className={`${ChirpBold.className} hover:underline cursor-pointer `}>@{info.username===username?'you':username}</Link>
  <span className={`${UserName.className}`}>Commented Your {info.username===username&&'own'} Post</span>
 </p>
 </div>
 </div>
}



function Page() {
  const {allNotifications,setAllNotifications} = notificationStore()
  const {setCounter} = newNotys();
  const [loading,setloading] = useState<boolean>(false);
  const {info} = exampleUser();
  const {id} = info;

useEffect(()=>{
(async()=>{
  setloading(true)
       const UsersNotifications = await fetchAllusersNotifications(id)
    if(!UsersNotifications)return;
    setAllNotifications([...UsersNotifications]);
    setloading(false);
    })()

},[])

 useEffect(()=>{



  const idsOfUserNotification = allNotifications.map((noty)=>{return noty.id});
  const MarkNotyARead = async()=>{
    const {data} = await supabase.from('notifications').update({is_seen:true}).in('id',[...idsOfUserNotification]);
    return data;
  }
 MarkNotyARead()
  setCounter(0)

 },[allNotifications]);
if(loading)return <Loading/>
console.log(info)
  return (
     <div className={`w-full dark:text-white bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  h-screen`}>
    <div className={`h-full pt-[4rem] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>

 <div className={'h-full w-full bg-white dark:bg-[#000]'}>

 <div className='flex border-b pb-[.5em] items-center px-[1em] dark:border-[#3F3E47] border-[#EDEDF5] justify-between'>
   <p className={`${ChirpBold.className}  text-[1.25rem]`}>Notifications</p>


  <svg fill="currentColor" height="20" role="img" viewBox="0 0 96 96" width="20"><circle cx="48" cy="48" fill="none" r="47" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    </circle>
    <path d="M48 34.4A13.185 13.185 0 0 0 37.473 29a12.717 12.717 0 0 0-6.72 1.939c-6.46 3.995-8.669 12.844-4.942 19.766 3.037 5.642 16.115 15.6 20.813 19.07a2.312 2.312 0 0 0 2.75 0c4.7-3.47 17.778-13.428 20.815-19.07 3.728-6.922 1.517-15.771-4.943-19.766A12.704 12.704 0 0 0 58.527 29 13.193 13.193 0 0 0 48 34.4Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path></svg>

    </div>
    {allNotifications.map((notfication)=>{
      if(notfication.action === 'follow'){
        return <FollowN sender={String(notfication.sender_user_id)} image={notfication.image} username={notfication.username}  key={notfication.username}/>
      }else if(notfication.action === 'like'){
        return <LikeN sender={String(notfication.sender_user_id)} image={notfication.image} username={notfication.username}  key={notfication.username}/>
      }
      else if(notfication.action === 'comment'){
        return <Comment sender={String(notfication.sender_user_id)} image={notfication.image} username={notfication.username}  key={notfication.username}/>
      }
    })}

       {allNotifications.length === 0 && <div className='w-full flex-col h-full flex items-center justify-center'>
        <p className={`${UserName.className} text-[1.25rem]`}>Activities on your posts will appear here.</p>
        {info.username.length==0&&info.name.length==0&&
   <div className={`${UserName} text-[15px]`}>
    You Appear to have signed out,
    <div className='w-[10em] flex justify-between'><Link href={'/signin'} className='text-sky-500 underline'>Sign in</Link>
    OR
    <Link href={'/sign out'} className='text-sky-500 underline'>Sign Up</Link>

    </div>
   </div>
   }  </div>}



 </div>

</div></div>
  )
}

export default Page
