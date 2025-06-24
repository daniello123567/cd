import React from 'react'
import font from 'next/font/local';
const UserName = font({ src: '../../public/Chirp-Regular.80fda27a.woff2' });
const ChirpBold = font({ src: '../../public/Chirp-Bold.ebb56aba.woff2' })


const SingleMessage = () => {
  return <div className='w-full p-[1em] dark:border-[#3F3E47] border-[#EDEDF5] border-b flex gap-[8px] h-[4.5667rem]'>
    <div className='w-[40px] rounded-full h-[40px] bg-red-700'></div>
    <div className={'text-[15px] flex flex-col gap-[.2em]'}>
      <div className={`${ChirpBold.className} flex-1 items-center flex cursor-pointer `}>
          <p className='mr-[.4em]'>Daniel</p>
          <p className={`${UserName.className} text-[#536471] text-[.9375rem]`}>@Username</p>
          <div className='w-[4px] rounded-full mx-[.25rem] h-[4px] bg-[#536471]'></div>
          <p className={`${UserName.className} text-[#536471] text-[.9375rem]`}> jun 15</p>
      </div>
      <p className={`${UserName.className} text-[#536471] text-[.9375rem]`}>hi dann...</p>
    </div>
            <svg className='ml-auto hover:cursor-pointer text-black dark:text-white' fill='currentColor' width={18.75} height={18.75} viewBox="0 0 24 24"><g><path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"></path></g></svg>

  </div>
}
const SearchIcon = () => {
  return <svg height={13.3167} width={13.3167} className='absolute top-[.8em] left-[1.2em] text-black dark:text-white' fill='currentColor' viewBox="0 0 24 24" aria-hidden="true"><g><path d="M10.25 3.75c-3.59 0-6.5 2.91-6.5 6.5s2.91 6.5 6.5 6.5c1.795 0 3.419-.726 4.596-1.904 1.178-1.177 1.904-2.801 1.904-4.596 0-3.59-2.91-6.5-6.5-6.5zm-8.5 6.5c0-4.694 3.806-8.5 8.5-8.5s8.5 3.806 8.5 8.5c0 1.986-.682 3.815-1.824 5.262l4.781 4.781-1.414 1.414-4.781-4.781c-1.447 1.142-3.276 1.824-5.262 1.824-4.694 0-8.5-3.806-8.5-8.5z"></path></g></svg>
}
function Page() {
  return (
    <div className={`w-full dark:text-white bg-white dark:bg-[#000]  dark:border-[#3F3E47] border-[#EDEDF5] px-[.5rem] border-t border-b  h-screen`}>
      <div className={`h-full pt-[4rem] dark:dark:[--pattern-foreground:var(--color-white)]/5 bg-size-[10px_10px] dark:bg-white/0.75 flex py-[.75rem]  bg-[radial-gradient(var(--pattern-foreground)_1px,transparent_0)]  min-h-[5rem] dark:border-[#3F3E47]   mx-auto md:max-w-[598px] border-[#EDEDF5] border-l border-r`}>

        <div className='w-full bg-white dark:bg-[#000] min-h-full'>
          <div className='flex border-b pb-[.5em] items-center px-[1em] dark:border-[#3F3E47] border-[#EDEDF5] justify-between'>
            <p className={`${ChirpBold.className}  text-[1.25rem]`}>Messages</p>

            <svg className='cursor-pointer' width={20} height={20} viewBox="0 0 24 24" ><g><path d="M1.998 5.5c0-1.381 1.119-2.5 2.5-2.5h15c1.381 0 2.5 1.119 2.5 2.5V12h-2v-1.537l-8 3.635-8-3.635V18.5c0 .276.224.5.5.5H13v2H4.498c-1.381 0-2.5-1.119-2.5-2.5v-13zm2 2.766l8 3.635 8-3.635V5.5c0-.276-.224-.5-.5-.5h-15c-.276 0-.5.224-.5.5v2.766zM19 18v-3h2v3h3v2h-3v3h-2v-3h-3v-2h3z"></path></g></svg>

          </div>

          <div className="w-full flex flex-col justify-center pb-[1em]  h-fit pt-[.5em] ">
            <div className='w-full px-[.5rem]  h-fit relative'>
              <input className={`${UserName.className} placeholder:text-[.8125rem] h-[40px]  pl-[2em] dark:text-white rounded-full outline-0 border dark:border-[#3F3E47] border-[#EDEDF5] w-full`} placeholder="search Direct messages" type="text" />
              <SearchIcon />

            </div>
          </div>


          <SingleMessage />

        </div>
      </div>

    </div>
  )
}

export default Page
