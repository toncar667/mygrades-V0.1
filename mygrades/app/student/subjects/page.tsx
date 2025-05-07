"use client"

import DashBoard from '@/app/components/dashboard/DashBoard'
import SideBar from '@/app/components/sideBar/SideBar'
import React from 'react'
import AddSubjectPanel from '@/app/components/dashboard/AddSubjectPanel'

const page = () => {
  return (
    <div>
      {/* <AddSubjectPanel /> */}
    <div className='p-4'>
      <div className='w-[220px] fixed h-full scrollbar-hide [&::-webkit-scrollbar]:hidden'>
        <SideBar />
      </div>
      <div className='flex-1 ml-[220px]'>
        <DashBoard />
      </div>
    </div>
    </div>
  )
}

export default page