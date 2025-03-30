"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiChevronDown } from "react-icons/hi"

const AccountToggle = () => {

  const router = useRouter()
  const handleClick = () => {
    router.push("/student/signup")
  }

  return (
    <div className='border-b mb-4 mt-2 pb-4 border-stone-300'>
        <button onClick={handleClick} className='flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center hover:cursor-pointer'>
            <Image src="/pen_avatar.svg" alt='avatar' width={32} height={32} className='shrink-0'/>
            <div className='text-start'>
                <span className='text-sm font-semibold block'>Tonka Sturzenegger</span>
                <span className='text-xs block text-stone-500'>tonkstur@gmail.com</span>
            </div>

            <HiChevronDown className='absolute right-2 text-xl'/>
        </button>
    </div>
  )
}

export default AccountToggle