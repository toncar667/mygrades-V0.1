import { useGradeModalStore, useSelectedSubjectStore } from '@/app/GlobalStateStore'
import { useStudentStore } from '@/app/student/StudentStore'
import React, { useState } from 'react'
import { HiMinus, HiOutlinePlusCircle } from 'react-icons/hi'


type Grade = {
    id:string;
    value: number;
    date: string;
};

const AddGradePanel = () => {

    const close = useGradeModalStore((state) => state.close)

    const addGrade = useStudentStore((state) => state.addGrade)

    const latestGrades = useStudentStore((state) => state.latestGrade)

    const [newGrade, setNewGrade] = useState<Grade>({
      //id accéder a la liste de tt les id et +1 (à faire)
        id: (latestGrades.grades.length + 1).toString(),
        value: 0,
        date: new Date().toString(),
    })
    

    const selectedSubjectID = useSelectedSubjectStore((state) => state.selectedSubjectID)
    const subject = useStudentStore((state) => state.subjects.find((s) => s.id === selectedSubjectID))

    const [gradeValue, setGradeValue] = useState<string>('')

    const handleAddGrade = () => {

        const targetSubject = subject

        if(targetSubject && newGrade){
            addGrade(targetSubject.id ,newGrade)
            console.log("nouvelle note :", newGrade)
        }
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

            <input 
              className='border w-full rounded-sm p-2' 
              type="text" 
              placeholder='Entrez la nouvelle note' 
              value={gradeValue} 
              onChange={(e) => setGradeValue(e.target.value)} onBlur={() => {
                const num = Number(gradeValue)
                const id = (latestGrades.grades.length + 1).toString()
                if (!isNaN(num)) {
                    setNewGrade({ ...newGrade, id: id, value: num })
                }
              }}
            />
            <button onClick={handleAddGrade} className='flex border rounded-sm h-12 md:h-10 p-2 mt-4 text-white cursor-pointer bg-[#3c83f6] hover:bg-blue-600 transition duration-300 gap-2'><div className='pt-0.5'><HiOutlinePlusCircle /></div> <span className='text-sm font-semibold'>Ajouter</span></button>
            <span className='text-sm font-mono'>Une nouvelle note sera ajouté à <span className='font-bold'>{subject?.name}</span></span>
          </div>
        </div>
      </div>
    )
}

export default AddGradePanel