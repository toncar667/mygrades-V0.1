"use client"

import React from 'react'
import { useState } from 'react'

const TopBar = () => {


  const [addSubjectPanelVisible, setAddSubjectPanelVisible] = useState(false)

  const handleSubjectPanel = () => {

  }

  return (
    <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
        <div className='flex items-center justify-between p-0.5'>
            <div>
                <span className='text-sm font-semibold block'>Salut Tonka !</span>
                <span className='text-xs block text-stone-500'>Dimanche, 30 mars 2026</span>
            </div>
              <button className='justify-end border rounded-sm h-10 p-2 mt-4 hover:bg-stone-50 hover:text-blue-400 transition duration-300'><span className='text-sm font-semibold'>Ajouter une matière</span></button>
        </div>
    </div>
  )
}

export default TopBar