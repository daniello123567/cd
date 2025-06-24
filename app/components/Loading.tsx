"use client"
import React from 'react'

function Loading() {
  return (
    <div className='bg-white dark:bg-black md:w-full mx-[.5rem] md:mx-auto md:max-w-[598px] dark:border-[#3F3E47] border-[#EDEDF5] border-l border-r h-[80vh] flex justify-center items-center'>
<svg className='w-[25px] animate-spin h-[25px]' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.0001 12C20.0001 13.3811 19.6425 14.7386 18.9623 15.9405C18.282 17.1424 17.3022 18.1477 16.1182 18.8587C14.9341 19.5696 13.5862 19.9619 12.2056 19.9974C10.825 20.0328 9.45873 19.7103 8.23975 19.0612" stroke="#1d9bf0" strokeWidth="3.55556" strokeLinecap="round"></path> </g></svg>
  </div>
  )
}

export default Loading
