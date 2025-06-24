
"use client"
import React from 'react'
import Singletweet from './Singletweet'
import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts } from '../utils/utils';
import { Post } from '../utils/types';
import Loading from './Loading';
import gsap from 'gsap'
import { useEffect } from 'react'




function Home() {




  const {data:posts,isPending} = useQuery({
  queryKey:['posts'],
  queryFn:()=>fetchAllPosts()
})




useEffect(()=>{
const medias = document?.querySelectorAll('#man');
medias.forEach((media)=>{
gsap.to(media,{
  scale:1,
  scrollTrigger:{
    trigger:media,
    start:'top 90%',
    end:'top 60%',
    scrub:true,
  }
})
})
},[isPending,posts])
  return (
 <div  className='mx-[.5rem] md:mx-auto md:max-w-[598px] pt-[6rem] md:w-full border dark:border-[#3F3E47] border-[#EDEDF5] min-h-[100vh] '>

   <div id='whole-news' className='bg-transparent gap-1 pt-6 flex flex-col  absolute top-[3rem] left-0 w-[100%] h-fit'>







    {!isPending&&posts?posts.map((post:Post)=>{
      return <Singletweet media={post.media} created_at={post.created_at} post={post.post} id={post.id} Name={post.Name} username={post.username} user_image={post.user_image} key={post.id} user_id={post.user_id}/>
    }):<Loading/>}


   </div>
</div>
  )
}

export default Home
