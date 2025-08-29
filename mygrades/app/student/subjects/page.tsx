"use client"

import AddSubjectPanel from '@/app/components/dashboard/modals/AddSubjectPanel'
import DashBoard from '@/app/components/dashboard/DashBoard'
import SideBar from '@/app/components/sideBar/SideBar'
import React from 'react'
import { useGradeModalStore, useSubjectModalStore } from '@/app/GlobalStateStore'
import AddGradePanel from '@/app/components/dashboard/modals/AddGradePanel'

const page = () => {

  const isSubjectPanelOpen = useSubjectModalStore((state) => state.isSubjectModalOpen)

  const isGradePanelOpen = useGradeModalStore((state) => state.isGradeModalOpen)


  return (
    <div>
      {isSubjectPanelOpen && !isGradePanelOpen ? <AddSubjectPanel />: null}
      {isGradePanelOpen && !isSubjectPanelOpen ? <AddGradePanel/>: null }
    <div className=''>
      <div className='w-[280px] fixed h-full scrollbar-hide [&::-webkit-scrollbar]:hidden'>
        <SideBar />
      </div>
      <div className='flex-1 ml-[280px]'>
        <DashBoard />
      </div>
    </div>
    </div>
  )
}

export default page