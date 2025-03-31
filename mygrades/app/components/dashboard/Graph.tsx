"use client"

import { useStudentStore } from '@/app/student/StudentStore';
import React from 'react'
import {HiBeaker} from "react-icons/hi"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Graph = ({subjectID}: {subjectID:string}) => {

    const subject = useStudentStore((state) => state.subjects.find((s) => s.id === subjectID))

    const data = subject?.grades.map((note) => ({
        note: note.value,
        date: note.date,
    })) || [];

  return (
    <a href="" className='col-span-8 overflow-hidden rounded border border-stone-300 shadow'>
        <div className='p-4'>
             <span className='flex items-center gap-1.5 font-medium'><HiBeaker />{subject?.name}</span>
        </div>  
        
        <div className='h-64 px-4'>
        <ResponsiveContainer width="100%" height="100%">
            <LineChart width={300} height={100} data={data} margin={{top:0, right:5, left:-42, bottom:0}}>
                <CartesianGrid  stroke='#e4e4e7'/>
                <XAxis dataKey="date" axisLine={false} tickLine={false} className='text-xs font-bold'/>
                <YAxis axisLine={false} className='text-xs font-bold' tickLine={false} domain={[1, 6]} ticks={[1,2,3,4,5,6]}/>
                <Tooltip wrapperClassName='text-sm rounded' labelClassName='text-xs text-stone-500' label="date"/>
                <Line type="monotone" dataKey="note" stroke="#60a5fa" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
        </div>


    </a>
  )
}

export default Graph