"use client"
import React,{useEffect,useState} from 'react'
import './globals.css'
import { exampleUser,  newNotys, fetchAllusersNotifications, notificationStore, supabase } from './utils/utils'
import Header, { Logo, Nav } from './components/Header'
import { mode } from './utils/store';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import gsap from 'gsap';
import { usePathname } from 'next/navigation'
import Newpost from './components/Newpost'
import Imagemodal from './components/Imagemodal'
import { Flip } from 'gsap/Flip'
import { ScrollTrigger } from 'gsap/all'
function RootLayout({ children }: { children: React.ReactNode }) {
  const {info} = exampleUser();
   const { isDarkMode } = mode();
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode)
  }, [isDarkMode]);

  const client = new QueryClient();

const {allNotifications,setAllNotifications} = notificationStore();
const [count,setCount] = useState<number>(0)
const {setCounter,counter} = newNotys()
const id = exampleUser((state)=>state.info.id);
useEffect(()=>{
  setCounter(count)
},[count])

  useEffect(()=>{
    gsap.registerPlugin(Flip,ScrollTrigger);

gsap.set(['#modalImage','#par'],{y:1000,opacity:0})
gsap.set(['#blur','#post'],{
   opacity:0,
   y:1000
})



    gsap.timeline().fromTo('#logo2',{
          y:200,
          opacity:0,
          ease:"power3.inOut"
 },{opacity:1,y:0,duration:1}).to('#loader',{
  y:-700,
  opacity:0
 },"+=1.4").fromTo('#logo',{
          y:200,
          opacity:0,
          ease:"power3.inOut"
 },{opacity:1,y:0,duration:1});

    (async()=>{
       const UsersNotifications = await fetchAllusersNotifications(id)
    if(!UsersNotifications)return;
    setAllNotifications([...UsersNotifications]);
     const unreads = UsersNotifications.filter(noty=>noty.is_seen===false);
    setCount((prev)=>prev + unreads.length);
    setCounter(counter + unreads.length)
    })()

    const chanel = supabase.channel('notifications').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' },
      (payload) => {
        if(payload.new.rx_user_id ===info.id && payload.new.is_seen===false){
          const notification = payload.new;
          setCount((prev)=>prev + 1);
          setCounter(counter + 1)
          const {post_id,action,username,image,id} = notification;
          if(notification.action === 'follow'){
            console.log(`${notification.sender_user_id} followed you`);
          } else if(notification.action === 'like'){
            setAllNotifications([...allNotifications,{id:id,image:image,username:username,action:action,postid:post_id}]);
          } else if(notification.action === 'comment'){
            console.log(`${notification.sender_user_id} commented on your post`);
          }
        }
      }
    ).subscribe();


    return () => {
      supabase.removeChannel(chanel);
    };
  },[]);

useEffect(()=>{



const TakeHeaderup=()=>{
  gsap.to('#header',{y:-8})
}
const bringbackheader = ()=>{
  gsap.to('#header',{y:0})
}
ScrollTrigger.create({
  trigger:'#whole-news',
  start:'top top',
  onEnter:()=>{
   TakeHeaderup()
  },
  onLeaveBack:()=>{
  bringbackheader()
  },

});
},[usePathname()]);



const pathname = usePathname()
  return (
    <QueryClientProvider client={client}>
    <html>
      <head>
        <title>CD</title>
        <link rel="shortcut icon" href="https://assets.chanhdai.com/images/favicon.svg" type="image/x-icon" />
      </head>
      <body style={{backgroundColor:isDarkMode?'var(--color-dark)':'var(--color-light'}}>
          <Header/>
        {children}
        {
        pathname!=='/signup'&&pathname!=='/signin'

        &&<Nav/>}
        <Newpost/>
        <Imagemodal/>
        <div id='loader' className='fixed z-50 top-0 h-screen w-full flex items-center justify-center bg-white'>
          <Logo si='logo2'/>
        </div>
      </body>
    </html>
    </QueryClientProvider>
  )
}

export default RootLayout
