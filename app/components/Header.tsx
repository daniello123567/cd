import React from 'react'
import { mode } from '../utils/store'
import Link from 'next/link';
import { exampleUser, newNotys } from '../utils/utils';
import gsap from 'gsap';
import { useRouter } from 'next/navigation';

function Logo({si}:{si?:string}) {
  const { isDarkMode } = mode();

  return <svg id={!si?'logo':si} className={`w-[64px] opacity-0 ${isDarkMode ? 'text-white' : 'text-black'}  h-[32px]`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 256" ><path d="M192 256H64v-64h128v64ZM448 64H320v128h128v64H256V0h192v64ZM64 192H0V64h64v128ZM512 192h-64V64h64v128ZM192 64H64V0h128v64Z" fill="currentColor"></path></svg>
}

const Sun = () => {
  return <svg className='w-[1em]  h-[1em]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path>
    <path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path>
    <path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path>
    <path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path>
    <path d="m19.07 4.93-1.41 1.41"></path></svg>
}

const Moon = () => {
  return <svg className='w-[1em] dark: text-white h-[1em]' xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9"></path><path d="M20 3v4">
  </path><path d="M22 5h-4"></path></svg>
}

function Switcher() {
  const { isDarkMode, setIsDarkMode } = mode();

  return <div onClick={setIsDarkMode} className={`w-[36px] dark:border-[#3F3E47] flex items-center justify-center hover:cursor-pointer rounded-full border border-[#EDEDF5] h-[36px]`}>
    {!isDarkMode ? <Sun /> : <Moon />}
  </div>
}

function Header() {
  const {info} = exampleUser()
  return (
    <div id='header' className={`w-full   overflow-hidden bg-white z-50 dark:bg-[#000] dark:border-[#3F3E47] border-[#EDEDF5] fixed top-[.5rem] px-[.5rem] border-t border-b  h-[3rem]`}>
      <div className={`h-full  z-50  dark:border-[#3F3E47]  head-child flex justify-between items-center mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>
        <Logo />
       <div className={`${info.name&&info.username&&'gap-[1em]'} pr-[1.5em]  flex items-center justify-between`}>
{info.name&&info.id&&<Link href={`/profile/${info.id}`} className='w-[40px] overflow-hidden bg-red-600 rounded-full h-[40px]'>
          <img src={info.image} alt={info.name} />
          </Link>}
        </div>
      </div>
    </div>
  )
}


const HomeIcon = () => {
  return <div className='p-[15px]  hover:px-[20px] dark:hover:bg-black hover:mr-1 text-zinc-600 hover:text-zinc-900 relative group transition-all duration-[300ms] hover:bg-[#ededed] rounded-[15px]'>
    <svg className='text-black dark:text-white' fill='currentColor' width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" ><g><path d="M21.591 7.146L12.52 1.157c-.316-.21-.724-.21-1.04 0l-9.071 5.99c-.26.173-.409.456-.409.757v13.183c0 .502.418.913.929.913h6.638c.511 0 .929-.41.929-.913v-7.075h3.008v7.075c0 .502.418.913.929.913h6.639c.51 0 .928-.41.928-.913V7.904c0-.301-.158-.584-.408-.758zM20 20l-4.5.01.011-7.097c0-.502-.418-.913-.928-.913H9.44c-.511 0-.929.41-.929.913L8.5 20H4V8.773l8.011-5.342L20 8.764z"></path></g></svg>
  </div>
}
const Search = () => {
  return <div className='p-[15px] dark:hover:bg-black hover:px-[20px] hover:mr-1 text-zinc-600 hover:text-zinc-900 relative group transition-all duration-[300ms] hover:bg-[#ededed] rounded-[15px]'>
    <svg className='text-black dark:text-white' fill='currentColor'  width="20" height="20" viewBox="0 0 24 24"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>

  </div>
}
const Notification = () => {
  const {counter} = newNotys()

  return <div className='p-[15px]  dark:hover:bg-black hover:px-[20px] hover:mr-1 text-zinc-600 hover:text-zinc-900 relative group transition-all duration-[300ms] hover:bg-[#ededed] rounded-[15px]'>
    <svg className='text-black dark:text-white' fill='currentColor' width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><g><path d="M19.993 9.042C19.48 5.017 16.054 2 11.996 2s-7.49 3.021-7.999 7.051L2.866 18H7.1c.463 2.282 2.481 4 4.9 4s4.437-1.718 4.9-4h4.236l-1.143-8.958zM12 20c-1.306 0-2.417-.835-2.829-2h5.658c-.412 1.165-1.523 2-2.829 2zm-6.866-4l.847-6.698C6.364 6.272 8.941 4 11.996 4s5.627 2.268 6.013 5.295L18.864 16H5.134z"></path></g></svg>
   {counter!==0&&<div className='w-[18px] h-[18px] flex text-[11px] border border-white text-white items-center justify-center absolute top-0 right-[.3em] rounded-full bg-[#1d9bf0]'>{counter}</div>}
  </div>
}




const icons = [
  { function: "/", ele: <HomeIcon /> },
  { function: "justthere", ele: <div className="h-5 w-[1px] bg-zinc-200 md:mx-2"></div> },

  { function: "explore", ele: <Search /> },
  { function: "notification", ele: <Notification /> },
];


function Nav() {
const {info} = exampleUser()
const router = useRouter();
const OpenPost = ()=>{
  if(!info.name){
    router.push('/signup');
    return;
  }
  gsap.timeline().set('#blur',{
    opacity:1,
    display:"block",
    y:0
  }).to('#post',{
    y:0,
    ease:'none',
    opacity:1,
  })
}
  return <div id='nav' className={'fixed   bottom-[10px] md:bottom-[25px] w-full z-40 flex justify-center p-4'}>
    <div className='gap-1 flex items-center  dark:bg-white/10 dark:border-none border border-zinc-200 py-6 px-[.5em] rounded-[20px] h-[64px] bg-white/50 backdrop-blur-sm'>


      {icons.map((icon) => {
        return <Link href={`/${icon.function}`} className='cursor-pointer' key={icon.function}>{icon.ele}</Link>
      })}
      <div className="h-5 w-[1px] mr-[.5em] bg-zinc-200 md:mx-2"></div>
        <Switcher />

      <div onClick={OpenPost} className='bg-black text-nowrap cursor-pointer text-white  py-[14px] px-[20px] md:px-[22px] rounded-[14px] text-sm hover:opacity-90 duration-[300ms]  transition-all hover:px-[28px] ml-2 md:ml-1'>
        New Post

      </div>
    </div>
  </div>
}
export { Nav,Logo }
export default Header
