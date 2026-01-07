"use client"

import React, { useState } from 'react'
import { useSubjectModalStore } from '@/app/GlobalStateStore'
import { useStudentStore } from '@/app/student/StudentStore'
import { HiMinus } from "react-icons/hi";
import randomColor from "randomcolor";

const AddSubjectPanel = () => {

  const close = useSubjectModalStore((state) => state.close)

  const addSubject = useStudentStore((state) => state.addSubject)

  const [newSubject, setNewSubject] = useState("")

  const handleAddSubject = () => {
    const newID = crypto.randomUUID()
    addSubject({ id: newID, color: randomColor(), name: newSubject, grades: [], events: [] })
    close()
  }

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg h-3/6'>
        <div className='flex justify-between'>

          <h1 className='text-2xl font-semibold'>Ajouter une matière</h1>
          <button className='justify-end border rounded-md p-2 hover:bg-stone-50 hover:text-blue-400 transition duration-300' onClick={close}><HiMinus /></button>

        </div>

        <div className='mt-5'>
          <h1 className='text-xl font-medium'>Nom</h1>
          <input
            value={newSubject}
            onChange={(s) => setNewSubject(s.target.value)}
            className='mt-2 h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text"
            placeholder='Nom de la matière...'
          />
          <button
            onClick={handleAddSubject}
            className='border rounded-md p-2 hover:bg-stone-50 hover:text-blue-400 transition duration-300'>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddSubjectPanel