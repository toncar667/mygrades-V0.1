import React, { useState } from 'react'

import { useStudentStore } from '@/app/student/StudentStore'

const SubjectSelect = () => {

    const subjects = useStudentStore((state) => state.subjects)
    
    //const [selectedSubject, setSelectedSubject] = useState<boolean>(false);
    
    const handleClick = () => ({
        
    })

  return (
    <div>
        {subjects.map((subject) => (
                <button onClick={handleClick} key={subject.id} className='w-full p-4 mb-2 border rounded-md cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition duration-200'>
                    <span className='font-medium'>{subject.name}</span>
                </button>
        ))}
    </div>
  )
}

export default SubjectSelect