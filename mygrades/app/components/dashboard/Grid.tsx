"use client"

import React from 'react'
import StatCards from './StatCards'
import Graph from './Graph'
import { usePathname } from 'next/navigation'

const Grid = () => {

  const pathName = usePathname()

  if(pathName === "/student/dashboard") {
    return (
      <div className='px-4 grid gap-3 grid-cols-12'>
          <StatCards />
          <Graph subjectID="1"/>
      </div>
    )
  } 
  
  else if (pathName === "/student/agenda") {
    return (
      <div className='px-4 grid gap-3 grid-cols-12'>
        
      </div>
    )
  }
  
  else if (pathName === "/student/subjects") {
    return (
        <div className='px-4 grid gap-3 grid-cols-12'>
          <Graph subjectID='2'/>
        </div>
    )
  }

}

export default Grid