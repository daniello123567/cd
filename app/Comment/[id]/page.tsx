"use client"
import { useParams, useRouter } from 'next/navigation'
import React, { SetStateAction, useState } from 'react'
import font from 'next/font/local';
import { useQuery } from '@tanstack/react-query';
import { Datify, deleteComment, exampleUser, getComments, getSinglePost, ReplyFunc } from '@/app/utils/utils';
import { Comment, Post } from '@/app/utils/types';
import Link from 'next/link';
import { supabase } from '@/app/utils/utils';
import Loading from '@/app/components/Loading';
const UserName = font({ src: '../../../public/Chirp-Regular.80fda27a.woff2' });
const ChirpBold = font({ src: '../../../public/Chirp-Bold.ebb56aba.woff2' })

const Header = () => {
  return <div className='h-[53px] z-50 top-[.5rem] border dark:border-[#3F3E47] border-[#EDEDF5] left-0 fixed bg-white dark:bg-[#000] w-screen'>
    <div className='w-full h-full border-l border-r dark:border-[#3F3E47] border-[#EDEDF5] mx-auto md:max-w-[598px]'>
      <div className='flex pl-[3em] px-[.5rem] flex-row  h-full items-center'>
          <Link href={'/'} className='h-full w-[56px] cursor-pointer flex justify-start items-center'>
                      <svg className='text-black dark:text-white' fill='currentColor' width={20} height={20} viewBox="0 0 24 24" aria-hidden="true"  ><g><path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path></g></svg>

          </Link>
        <p className={`${ChirpBold.className} text-[20px]`}>Post</p>
      </div>
    </div>
  </div>
}
const Media = ({ media, Name }: { Name: string, media: string }) => {
  return <div className='w-full  overflow-hidden min-h-[6em] rounded-[1em] mt-[.75rem] border dark:border-[#3F3E47] border-[#EDEDF5] max-h-[516px]'>
    <img className='w-full object-cover h-auto' src={media} alt={Name} />
  </div>
}
const Verified = () => {
  return <svg className='w-[16.05px] mr-[.3em] h-[16.05px]' fill='#1d9bf0' viewBox="0 0 22 22"><g><path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path></g></svg>
}

const CommentDeleter = ({idofcomment,comments,setcomments,postid,ownerofcomment}:{postid:string,ownerofcomment:string,idofcomment:string,setcomments:React.Dispatch<SetStateAction<Comment[]>>,comments:Comment[]})=>{
  const handleDelete =async ()=>{
      deleteComment(idofcomment);
      await supabase.from('notifications').delete().eq('post_id', postid).eq('rx_user_id', ownerofcomment)

     const newComents = comments.filter((comment)=>{
      if(comment.id!==idofcomment)return comment;
     });
     setcomments([...newComents])
  }
  return <svg onClick={handleDelete} width={18.75} height={18.75}  className='absolute cursor-pointer right-[1em]' fill='#f4212e' viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M16 6V4.5C16 3.12 14.88 2 13.5 2h-3C9.11 2 8 3.12 8 4.5V6H3v2h1.06l.81 11.21C4.98 20.78 6.28 22 7.86 22h8.27c1.58 0 2.88-1.22 3-2.79L19.93 8H21V6h-5zm-6-1.5c0-.28.22-.5.5-.5h3c.27 0 .5.22.5.5V6h-4V4.5zm7.13 14.57c-.04.52-.47.93-1 .93H7.86c-.53 0-.96-.41-1-.93L6.07 8h11.85l-.79 11.07zM9 17v-6h2v6H9zm4 0v-6h2v6h-2z"></path></g></svg>
}
const SingleComment = ({comments,setcomments,user_id,Name,User_image,reply,created_at,Username,id}:Comment&{setcomments:React.Dispatch<SetStateAction<Comment[]>>,comments:Comment[]})=>{
 const {info}= exampleUser();
 const postid = useParams().id;
 if(!postid)return;
 return <div className={`h-fit relative py-[.75rem] head-child flex min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>
    {info.id==user_id&&<CommentDeleter postid={String(postid)} ownerofcomment={info.id} comments={comments} setcomments={setcomments} idofcomment={id}/>
    }<div className='basis-[40px] mr-[.5rem]'>
          <div className='rounded-full  bg-black dark:bg-white w-[40px] h-[40px]'>
            <img className='w-full h-full object-cover rounded-full' src={User_image} alt={Name} />
          </div>
        </div>
        <div className='flex-1 pr-[1em] h-full'>
          <div className='w-full h-full flex flex-col'>


            <div className='flex mb-[2px] items-center'>
              <p className={`${ChirpBold.className} text-[.9375rem]`}>{Name}</p>
              <Verified />
              <span className={`text-[#536471] text-[.9375rem] ${UserName.className}`}>@{Username}</span>
              <div className='bg-[#536471] w-[4px] h-[4px] rounded-full mx-[.2em]'></div>
              <span className={`text-[#536471] ml-[.3em] text-[.9375rem] ${UserName.className}`}>{Datify(created_at)}</span>
            </div>
            <div>
              <p className={`${UserName.className} text-[.9375rem]`}>{reply}</p>
            </div>
           </div>

</div>


      </div>
}


const CommentInput = ({comments,setcomments,setReply,reply,Postid,ownerofpost}:{ownerofpost:string,setcomments:React.Dispatch<SetStateAction<Comment[]>>,comments:Comment[],setReply:React.Dispatch<SetStateAction<string>>,reply:string,Postid:string})=>{
 const [loading,setisLoading] = useState<boolean>(false)
 const {info} = exampleUser()
 const {name,username,image,id} = info;
 const router = useRouter();
  return <div className='h-[68px] mb-[.5rem] border-b dark:border-[#3F3E47] border-[#EDEDF5] gap-[.5em] w-full flex items-center'>
 <div className='h-[40px] overflow-hidden w-[40px] rounded-full bg-yellow-700'>
  <img src={image} alt={name} />
 </div>
  <input  value={reply} onChange={(e)=>setReply(e.currentTarget.value)} className={`h-[28px] ${UserName.className} flex-1 outline-0 placeholder:text-[20px] `} placeholder='reply to @Daniel' type="text" />
 <button disabled={reply.length==0}
 onClick={async()=>{
  if(!name||!username||!image){
      router.push('/signup');
      return;
    }
 const newData = await ReplyFunc({Name:name,User_image:image,Username:username,setReply:setReply,setLoading:setisLoading,user_id:info.id,reply:reply,post_id:String(Postid)});
  const { data: error } = await supabase.from('notifications').insert({
      sender_user_id: id, rx_user_id: ownerofpost, post_id:Postid, action: 'comment', is_seen: false,
      name: name, username: username, image: image
    });
    console.log(error)
 if(newData)
 setcomments([newData,...comments]);

  } }className={`${ChirpBold.className} ${reply.length==0&&'bg-gray-400 disabled'}  ${loading&&'disabled bg-gray-200 '} w-[74.7333px] flex cursor-pointer items-center justify-center text-white dark:bg-white dark:text-black h-[36px] bg-black rounded-full`}>{loading?<svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
:'Reply'}</button>
 </div>
}


function Page() {
  const [reply,setReply] = useState<string>('');
  const [commenttos,setcomments] = useState<Comment[]>([]);
  const Postid = useParams().id;
  const {isPending,data} = useQuery({
    queryKey:['singlepost'],
    queryFn:()=>getSinglePost(String(Postid))
  });
  const {isPending:commentsPending} = useQuery({
    queryKey:['comments'],
    queryFn:()=>getComments(String(Postid),setcomments),

  })
  if(isPending)return <Loading/>
const {user_image,username,Name,post,media,created_at,user_id:ownerofpost} = data?.[0] as Post;


  return (
    <div className={`w-full  dark:text-white bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  min-h-screen`}>
      <div className={`h-full pb-[7em] pt-[4rem] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>
        <Header />

        <div className='w-full h-fit px-[1em] py-[1em] bg-white dark:bg-[#000]'>
          <div className='flex gap-[8px] h-[42px]'>
  <div className='w-[40px] overflow-hidden rounded-full h-[40px] bg-blue-900'>
    <img className='w-full h-full object-cover' src={user_image} alt={Name} />
  </div>
  <div className='flex flex-col h-full text-[.9375rem] justify-between '>
    <div className='flex items-center gap-[.4rem]'>
      <p className={`${ChirpBold.className} `}>{Name}</p>
              <Verified />
</div>    <p className={`${UserName.className} text-[#536471]`}>@{username}</p>
  </div>
 </div>
           <div className={`${UserName.className} mt-[1em] text-[1.0625rem]`}>{post}</div>
 {media&&<Media media={media} Name={Name}/>}

 <p className={`${UserName.className} underline text-[#536471] text-[15px] mt-[.5rem]`}>{Datify(created_at)}</p>
<CommentInput ownerofpost={ownerofpost} comments={commenttos} setcomments={setcomments}   reply={reply} Postid={String(Postid)} setReply={setReply}/>


 {commentsPending?<Loading/>:commenttos?.map((comment:Comment)=>{
  return <SingleComment setcomments={setcomments} comments={commenttos} post_id={comment.post_id} created_at={comment.created_at} user_id={comment.user_id} reply={comment.reply} Username={comment.Username} id={comment.id} Name={comment.Name} User_image={comment.User_image} key={comment.id} />
 })}

        </div>


      </div>

    </div>
  )
}

export default Page
