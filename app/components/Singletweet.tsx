"use client"
import React, {  useState } from 'react'
import font from 'next/font/local';
import { Post } from '../utils/types';
import { Datify, deleteLike, exampleUser, getCommentCount, GetPostLikes,  likePost } from '../utils/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {  usePathname, useRouter } from 'next/navigation';
import gsap from 'gsap';
import _Flip from 'gsap/Flip';
const Namex = font({ src: '../../public/Chirp-Bold.ebb56aba.woff2' });
const UserName = font({ src: '../../public/Chirp-Regular.80fda27a.woff2' });



const Like = ({ post_id, owner_of_post_id,dl }: {dl?:string, owner_of_post_id: string, post_id: string, user_id: string }) => {

  const LikedComponent = () => {
  return <svg fill="#ff3040" height="24" role="img" viewBox="0 0 48 48" width="24"><title>Unlike</title><path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>


  }

  const NeutralLike = () => {
    return <svg  className='text-black  dark:text-white' fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Like</title><path d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 0 1 3.679-1.938m0-2a6.04 6.04 0 0 0-4.797 2.127 6.052 6.052 0 0 0-4.787-2.127A6.985 6.985 0 0 0 .5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 0 0 3.518 3.018 2 2 0 0 0 2.174 0 45.263 45.263 0 0 0 3.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 0 0-6.708-7.218Z"></path></svg>

  }

  const [isLiked, setisLiked] = useState<boolean>(false);
  const [countLikes, setCountLikes] = useState<number>(0);
  const { info } = exampleUser()
  const { name, username, image } = info;
  const {  } = useQuery({
    queryKey: ['likes', usePathname()],
    queryFn: () => GetPostLikes(post_id, setCountLikes, info.id, setisLiked),
  });
  const router = useRouter();
  const handleLike = () => {
    if(!name||!username||!image){
      router.push('/signup');
      return;
    }
    if (!isLiked) {
      likePost({ user_id: info.id, post_id: post_id, owner_of_post_id: owner_of_post_id, name, username, image })
      setisLiked(true);
      setCountLikes((prev) => prev + 1)
    } else if (isLiked) {
      deleteLike({ user_id: info.id, post_id: post_id });
      setisLiked(false);
      setCountLikes(prev => prev - 1)
    }

  }

  return <div onClick={handleLike} className='flex items-center min-w-[48px] cursor-pointer minh-[24px]'>
    {isLiked ? <LikedComponent /> : <NeutralLike />}
    <p className={`text-sm dark:text-white px-[.25rem] text-black ${UserName.className}`}>{dl&&dl.length>1?dl:countLikes}</p>

  </div>
}

const Comment = ({ post_id,dc}: {dc?:string, ownerid: string, post_id: string }) => {
  const { data} = useQuery({
    queryKey: ['comments', post_id],
    queryFn: () => getCommentCount(post_id)
  });

  return <Link href={`/Comment/${post_id}`} className=' dark:text-white items-center min-w-[48px] cursor-pointer  flex  min-h-[24px]'>
    <svg className='text-black dark:text-white' fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><path d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
    <p className={`text-sm dark:text-white ml-[.3em] px-[.25rem] text-black ${UserName.className}`}>{dc&&dc.length>1?dc:data}</p>
  </Link>
}

const Verified = () => {
  return <svg className='w-[16.05px] mr-[.3em] h-[16.05px]' fill='#1d9bf0' viewBox="0 0 22 22"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
}
const Media = ({ media, Name }: { Name: string, media: string }) => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const [parent,setparent] = useState<HTMLDivElement>()
  const Flip = (e: React.MouseEvent<HTMLImageElement>) => {
    gsap.set('#par', { opacity: 1, y: 0 })
    const state = _Flip.getState(e.currentTarget);
    if (!isModal) {
      e.currentTarget.classList.add('modal');
      document.getElementById('par')?.appendChild(e.currentTarget);

    } else {
      e.currentTarget.classList.remove('modal')

      parent?.appendChild(e.currentTarget)
      gsap.set('#par', { y: 1000, opacity: 0 })
    }
    _Flip.from(state, {
      duration: 0.6,
      ease: 'power2.inOut',
      scale: true,
      fade: true,
      absolute: true,
      onComplete: () => {
        setIsModal(!isModal)
      }
    })
  }

  return <div id={`mediaman-${Name}`} onLoad={(e) => {setparent(e.currentTarget); e.currentTarget.style.minHeight = `${e.currentTarget.offsetHeight}px` }} className={`w-full  cursor-pointer  overflow-hidden  rounded-[1em] mt-[.75rem]  max-h-[516px]`}>
    <div onClick={Flip} className='w-full border dark:border-[#3F3E47] border-[#EDEDF5] rounded-[1em] overflow-hidden h-fit'>
      <img className='w-full object-cover h-auto' src={media} alt={Name} />

    </div>


  </div>
}
function Singletweet({ Name, id, user_image, username, created_at, post, media, user_id: owner_id,dc,dl }: Post) {
  const { info } = exampleUser();

  return (
    <div  className={`w-full  px-[.5rem] bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5]  border-t border-b  `}>
      <div className={`h-full py-[.75rem] head-child flex min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>

        <div className='basis-[40px] mr-[.5rem]'>
          <div className='rounded-full  bg-black dark:bg-white w-[40px] h-[40px]'>
            <Link className='w-full h-full' href={`/profile/${owner_id}`}>
              <img className='w-full h-full object-cover rounded-full' src={user_image} alt="user" />
            </Link>

          </div>
        </div>
        <div className='flex-1 pr-[1em] h-full'>
          <div className='w-full h-full flex flex-col'>


            <div className='flex flex-wrap mb-[2px] items-center'>
              <Link href={`/profile/${owner_id}`} className={`${Namex.className} underline text-[.9375rem]`}>{Name}</Link>
              <Verified />
              <span className={`text-[#536471] text-[.9375rem] ${UserName.className}`}>@{username}</span>
              <div className='bg-[#536471] w-[4px] h-[4px] rounded-full mx-[.2em]'></div>
              <span className={`text-[#536471] ml-[.3em] text-[.9375rem] ${UserName.className}`}>{Datify(created_at)}</span>
            </div>
            <div>
              <p className={`${UserName.className} text-[.9375rem]`}>{post}</p>
            </div>
            <div id='man' className='w-fit h-fit'>
              {media && <Media Name={Name} media={media} />}
            </div>
            <div className='flex items-center mt-[1em] gap-[1.5em] h-[2rem]'>


              <Like dl={dl} owner_of_post_id={owner_id} post_id={id} user_id={info.id} />

              <Comment dc={dc} ownerid={owner_id} post_id={id} />









            </div>

          </div>


        </div>


      </div>
    </div>
  )
}

export default Singletweet
