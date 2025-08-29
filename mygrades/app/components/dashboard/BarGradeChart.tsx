"use client"

import React from 'react'
import { useStudentStore } from '@/app/student/StudentStore';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
} from "recharts";


const BarGradeChart = ({title} : {title: String}) => {

  const getSubjectMoy = useStudentStore((state) => state.getSubjectMoy);
  const subjects = useStudentStore((state) => state.subjects);

  const subjectAverages = subjects.map((subject) => ({
    name: subject.name,
    moyenne: getSubjectMoy(subject.id),
    color: subject.color || "#3c83f6",
  }));

  return (

  <div className='rounded-lg border shadow-sm'>
    <h1 className='p-4 text-2xl font-semibold'>{title}</h1>
    <div className='h-64 mb-12 mr-6'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={subjectAverages}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              className="stroke-[#B6D4F2]" 
            />
            <XAxis 
              dataKey="name" 
              className="text-xs" 
            />
            <YAxis 
              domain={[0, 6]}
              ticks={[0,1,2,3,4,5,6]} 
              className="text-xs" 
            />
            <Tooltip 
              contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e2e8f0',
              borderRadius: '0.75rem'
              }}
            />
            <Bar 
              dataKey="moyenne" 
              fill="#3b82f6" 
              radius={[8, 8, 0, 0]}
            >
              {/* Couleurs par barre */}
              {subjectAverages.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
    </div>
  </div>

  )
}

export default BarGradeChart