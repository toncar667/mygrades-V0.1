"use client"

import React, { useEffect, useState } from 'react'
import Graph from './Graph'
import { usePathname } from 'next/navigation'
import { useStudentStore } from '@/app/student/StudentStore'
import { HiOutlineTrendingUp } from "react-icons/hi";
import { useSubjectModalStore } from '@/app/GlobalStateStore'
import BarGradeChart from './BarGradeChart'
import { HiOutlinePlusCircle } from "react-icons/hi";
import SubjectSelect from './SubjectSelect'
import SelectedSubject from './SelectedSubject'
import ProgressBar from './ProgressBar'


const Grid = () => {

  const pathName = usePathname()

  const openSubjectPanel = useSubjectModalStore((state) => state.open)

  const GetOverallMoy = useStudentStore((state) => state.getOverallMoy())
  const [overAllMoy, setOverAllMoy] = useState<number>(0)
  
  useEffect(() => {
    setOverAllMoy(GetOverallMoy)
  })

  const studentName = useStudentStore((state) => state.name)

  if(pathName === "/student/dashboard") {
    return (
      <div className='px-6'>
        <div className='flex'>
          <div>
            <h1 className='pt-4 font-bold text-4xl'>Tableau de bord</h1>
            <p className='pb-6 text-stone-600'>Bienvenue {studentName} !</p>
          </div>
        </div>
        {/* Stat Cards */}
        <div className='grid gap-4 grid-cols-12'>
          
          <div className='col-span-12 md:col-span-4 p-8 rounded-xl bg-stone-100 shadow-sm'>
            <div className='flex mb-4 items-start justify-between'>
              <div>
                  <div className='flex gap-5'>
                    <h3 className='text-stone-500 mb-2 text-lg'>Moyenne Générale</h3>
                    <div className='text-xl'><HiOutlineTrendingUp /></div>
                  </div>
                  <p className={`text-4xl font-semibold`}>{overAllMoy}</p>
                  <p className='pt-1 text-xs text-stone-500'>Excellent travail !</p>
              </div>
            </div>
                    <ProgressBar value={overAllMoy}/>
          </div>

          <div className='col-span-12 md:col-span-4 p-8 rounded-xl bg-stone-100 shadow-sm'>
            <div className='flex mb-4 items-start justify-between'>
              <div>
                <h3 className='text-stone-500 mb-2 text-lg'>Devoirs complétés</h3>
                <p className={`text-4xl font-semibold`}>6</p>
              </div>
            </div>
          </div>

          <div className='col-span-12 md:col-span-4 p-8 rounded-xl bg-stone-100 shadow-sm'>
            <div className='flex mb-4 items-start justify-between'>
              <div>
                <h3 className='text-stone-500 mb-2 text-lg'>Evaluations complétées</h3>
                <p className={`text-4xl font-semibold`}>2</p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Graph */}
          <div className='mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6'>
              <BarGradeChart title="Moyennes par matières"/>     
              <Graph subjectID={'0'} />
          </div>
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
        <div className='px-6'>
          <div className='flex w-full justify-between'>
            <div>
              <h1 className='pt-4 font-bold text-4xl'>Mes matières</h1>
              <p className='pb-6 text-stone-600'>Gérez vos matières et suivez vos notes !</p>
            </div>
              <button onClick={openSubjectPanel} className='flex border rounded-sm h-12 md:h-10 p-2 mt-4 text-white cursor-pointer bg-[#3c83f6] hover:bg-blue-600 transition duration-300 gap-2'><div className='pt-0.5'><HiOutlinePlusCircle /></div> <span className='text-sm font-semibold'>Ajouter une matière</span></button>
          </div>
          <div className='grid grid-cols-3 gap-5'>
            <div className='rounded-lg border col-span-3 lg:col-span-1 p-4 shadow-sm transition'>
              <h1 className='p-4 text-2xl font-semibold'>Matières</h1>
              <SubjectSelect />
            </div>
            <div className='rounded-lg border col-span-3 lg:col-span-2 p-4 shadow-sm transition'>
              <SelectedSubject />
            </div>
          </div>
        </div>
    )
  }

}

export default Grid