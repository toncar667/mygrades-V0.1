"use client"

import { useAuthStore } from '@/app/student/AccountStore'
import { useStudentStore } from '@/app/student/StudentStore'
import { useRouter } from 'next/navigation'
import React from 'react'
import { HiChevronDown } from "react-icons/hi"

const AccountToggle = () => {
  
  const router = useRouter()

  const handleClick = () => {
    router.push("/student/login")
  }

  const studentName = useStudentStore((state) => state.name)
  const currentUser = useAuthStore((state) => state.currentUser?.student.name)
  const studentEmail = useAuthStore((state) => state.currentUser?.email)

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

            <HiChevronDown className='absolute right-2 text-xl text-white'/>
        </button>
    </div>
  )
}

export default AccountToggle