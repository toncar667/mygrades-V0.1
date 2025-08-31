import React, { useState } from 'react'

import { Subject, useStudentStore } from '@/app/student/StudentStore'

import { useSelectedSubjectStore } from '@/app/GlobalStateStore'

const SubjectSelect = () => {

    const subjects = useStudentStore((state) => state.subjects)
    
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const setGlobalSelectedSubject = useSelectedSubjectStore((state) => state.setSelectedSubject)

    const handleClick = (subjectID: string) => () =>{
        const selectedSubject = subjects.find((s) => s.id === subjectID) || null
        setSelectedSubject(selectedSubject)
        setGlobalSelectedSubject(selectedSubject ? selectedSubject.id : null)
    }

  return (
    <div>
        {subjects.map((subject) => (
                <button onClick={handleClick(subject.id)} key={subject.id} className={`w-full p-4 mb-2 border rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition duration-200 
                ${subject.id === selectedSubject?.id ? "bg-blue-50 border-blue-300" : ""}`}>
                    <span className='font-medium'>{subject.name}</span>
                </button>
        ))}
    </div>
  )
}

export default SubjectSelect