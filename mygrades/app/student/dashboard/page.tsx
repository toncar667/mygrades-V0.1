"use client"

import React from "react"
import SideBar from "@/app/components/sideBar/SideBar"
import DashBoard from "@/app/components/dashboard/DashBoard"

const Page = () => {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-1 md:ml-[280px]">
        <DashBoard />
      </div>
    </div>
  )
}

export default Page