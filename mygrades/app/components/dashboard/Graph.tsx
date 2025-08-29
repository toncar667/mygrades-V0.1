"use client"

import { useStudentStore } from '@/app/student/StudentStore';
import React from 'react'
import {HiBeaker} from "react-icons/hi"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { HiOutlineTrash } from "react-icons/hi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { useGradeModalStore } from '@/app/GlobalStateStore';

const Graph = ({subjectID}: {subjectID:string}) => {

    const openGradeModal = useGradeModalStore((state) => state.open)

    let subject = useStudentStore((state) => state.subjects.find((s) => s.id === subjectID))

    const latestGradeSubject = useStudentStore((state) => state.latestGrade)

    if(subjectID === "0") {
        subject = latestGradeSubject
    }

    const deleteSubject = useStudentStore((state) => state.removeSubject)

    const handleDelete = () => {
        deleteSubject(subjectID)
    }

    const data = subject?.grades.map((note) => ({
        note: note.value,
        date: note.date,
    })) || [];

    if (!subject) return <div className='col-span-8 p-4'>Matière introuvable</div>;
  return (
    <div className='rounded-lg border shadow-sm'>
        <div className='p-4 flex justify-between'>
             <span className='flex items-center gap-1.5 font-semibold text-2xl'><HiBeaker />{subject?.name}</span>
            <div className='justify-end'>
            { subjectID === "0" ? null : <><button onClick={openGradeModal} className='text-xl mr-2 hover:text-green-500 hover:cursor-pointer transition duration-200'><HiOutlinePlusCircle /></button><button onClick={handleDelete} className='text-xl hover:text-red-500 hover:cursor-pointer transition duration-200'><HiOutlineTrash /></button></>}
            </div>
        </div>  
        
        <div className='h-64 mb-12 mr-6'>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart width={300} height={100} data={data}>
                <CartesianGrid  strokeDasharray="3 3" className='stroke-[#B6D4F2]'/>
                <XAxis dataKey="date" className='text-xs'/>
                <YAxis className='text-xs' domain={[1, 6]} ticks={[0,1,2,3,4,5,6]}/>
                <Tooltip wrapperClassName='text-sm rounded' labelClassName='text-xs text-stone-500' label="date"/>
                <Line type="monotone" dataKey="note" stroke="#3b82f6" strokeWidth={2} dot={{ fill:"#3b82f6"}}/>
            </LineChart>
        </ResponsiveContainer>
        </div>


    </div>
  )
}

export default Graph