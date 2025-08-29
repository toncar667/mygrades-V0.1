"use client"

import { useStudentStore } from '@/app/student/StudentStore';
import React, { useEffect, useState } from 'react'

const GradeCard = ({
    title,
    value,
    period,
    href,
}: {
    title: String | undefined;
    value: number;
    period: string;
    href: string;

}) => {

    return <a href={href} className='col-span-4 p-4 rounded-xl bg-stone-100'>

        <div className='flex mb-4 items-start justify-between'>
            <div>
                <h3 className='text-stone-500 mb-2 text-lg'>{title}</h3>
                <p className={`text-4xl font-semibold ${ value >= 4 ? "text-green-700":"text-red-700" }`}>{value}</p>
            </div>

        </div>
        
        <p className='text-xs text-stone-500'>{period}</p>
    </a>
    
}

const StatCards = () => {

    const getSubjectMoy = useStudentStore((state) => state.getSubjectMoy)

    const OS = useStudentStore((state) => state.subjects.find((s) => s.id === "1"))
    if(OS){
        console.log("l'OS est ", OS.name)
    } else{
        console.log("Pas d'os")
    }
    const subject1 = useStudentStore((state) => state.subjects.find((s) => s.id === "2"))

    const [OSMoy, setMathMoy] = useState<number>(0)
    const [BioChimieMoy, setBioChimieMoy] = useState<number>(0)


    useEffect(() => {
        const moy_m = getSubjectMoy("1")
        setMathMoy(moy_m)
    }, [getSubjectMoy])

    useEffect(() => {
        const moy_i = getSubjectMoy("2")
        setBioChimieMoy(moy_i)
    }, [getSubjectMoy])


  return (
    <>
        <GradeCard
        title={OS?.name} 
        value={OSMoy}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
        <GradeCard
        title={OS?.name} 
        value={OSMoy}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
        <GradeCard
        title={subject1?.name}
        value={BioChimieMoy}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
        <GradeCard
        title='Italien' 
        value={4.5}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
    </>
  )
}

export default StatCards