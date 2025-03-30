"use client"

import { useStudentStore } from '@/app/student/StudentStore';
import React, { useEffect, useState } from 'react'

const Card = ({
    title,
    value,
    period,
    href,
}: {
    title: string;
    value: number;
    period: string;
    href: string;

}) => {

    return <div className='col-span-4 p-4 rounded border shadow'>

        <a href={href}>
        <div className='flex mb-8 items-start justify-between'>
            <div>
                <h3 className='text-stone-500 mb-2 text-sm'>{title}</h3>
                <p className={`text-3xl font-semibold ${ value >= 4 ? "text-green-700":"text-red-700" }`}>{value}</p>
            </div>

        </div>
        
        <p className='text-xs text-stone-500'>{period}</p>
        </a>
    </div>
    
}

const StatCards = () => {

    const getSubjectMoy = useStudentStore((state) => state.getSubjectMoy)

    const [mathMoy, setMathMoy] = useState<number>(0)

    useEffect(() => {
        const moy = getSubjectMoy("1")
        setMathMoy(moy)
    }, [getSubjectMoy])

  return (
    <>
        <Card
        title='Mathématique et Physique' 
        value={mathMoy}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
        <Card
        title='Italien' 
        value={3}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
        <Card
        title='Biologie et Chimie' 
        value={4.5}
        period='Du 1 Janvier au 31 Janvier'
        href='../student/subjects'
        />
    </>
  )
}

export default StatCards