import DashBoard from '@/app/components/dashboard/DashBoard'
import SideBar from '@/app/components/sideBar/SideBar'
import React from 'react'

const page = () => {
  return (
    <div className=''>
      <div className='w-[280px] fixed h-full scrollbar-hide [&::-webkit-scrollbar]:hidden'>
        <SideBar />
      </div>
      <div className='flex-1 ml-[280px]'>
        <DashBoard />
      </div>
    </div>
  )
}

export default page