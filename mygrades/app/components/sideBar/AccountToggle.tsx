"use client"

import { useAuthStore } from '@/app/student/AccountStore'
import { useStudentStore } from '@/app/student/StudentStore'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { HiChevronDown, HiChevronUp } from "react-icons/hi"
import { IoMdSettings } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

const AccountToggle = () => {

  const router = useRouter()

  const handleClick = () => {
    setIsOpen(!isOpen)
    //router.push("/student/login")
  }

  const handleLogOut = () => {
    logOut()
    router.push("/student/login")
  }

  const [isOpen, setIsOpen] = useState(false)

  const studentName = useStudentStore((state) => state.name)
  const currentUser = useAuthStore((state) => state.currentUser?.student.name)
  const logOut = useAuthStore((state) => state.logout)
  const studentEmail = useAuthStore((state) => state.currentUser?.student.email)

  console.log("StudentStore.name: ", studentName)
  console.log("CurrentUser.name: ", currentUser)
  console.log("email:", studentEmail)

  return (
    <div className='border-b mb-4 pb-4 border-white'>
      <button onClick={handleClick} className='flex hover:bg-blue-950 rounded-lg transition-colors relative gap-2 w-full items-center hover:cursor-pointer'>
        <div className='text-start p-2'>
          <span className='text-sm font-semibold block text-white'>{studentName}</span>
          <span className='text-xs block text-white'>{studentEmail}</span>
        </div>
        {!isOpen && <HiChevronDown className='absolute right-2 text-xl text-white' />}
        {isOpen && <HiChevronUp className='absolute right-2 text-xl text-white' />}
      </button>
      {isOpen &&
        <div className='transition-transform duration-200'>
          <a href='/student/settings' className='flex items-center justify-start gap-2 w-full rounded-lg px-2 text-lg font-normal 
            transition-[box-shadow,_background-color,_color] hover:cursor-pointer text-white hover:bg-blue-950 bg-transparent shadow-none'>
            <IoMdSettings />
            <span className='p-2 text-white'>Paramètres</span>
          </a>
          <button onClick={handleLogOut} className='flex items-center justify-start gap-2 w-full rounded-lg mt-2 px-2 text-lg font-normal 
            transition-[box-shadow,_background-color,_color] hover:cursor-pointer hover:bg-red-500 text-white bg-transparent shadow-none'>
            <FaSignOutAlt />
            <span className='p-2 text-white'>Se déconnecter</span>
          </button>
        </div>
      }
    </div>
  )
}

export default AccountToggle