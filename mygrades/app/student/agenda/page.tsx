import DashBoard from '@/app/components/dashboard/DashBoard'
import SideBar from '@/app/components/sideBar/SideBar'
import React from 'react'

const page = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 md:ml-[280px]">
        <DashBoard />
      </div>
    </div>
  )
}

export default page