"use client"

import React from 'react'
import SideBar from '@/app/components/sideBar/SideBar'
import DashBoard from '@/app/components/dashboard/DashBoard'

const page = () => {
  return (
    <div className='p-4'>
      <div className='w-[220px] fixed h-full scrollbar-hide [&::-webkit-scrollbar]:hidden'>
        <SideBar />
      </div>
      <div className='flex-1 ml-[220px]'>
        <DashBoard />
      </div>
    </div>
  )
}

export default page