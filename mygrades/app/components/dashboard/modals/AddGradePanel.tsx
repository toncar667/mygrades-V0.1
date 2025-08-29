import { useGradeModalStore } from '@/app/GlobalStateStore'
import { useStudentStore } from '@/app/student/StudentStore'
import React, { useState } from 'react'
import { HiMinus } from 'react-icons/hi'
import Select from "react-select"


type Grade = {
    id:string;
    value: number;
    date: string;
};

const AddGradePanel = () => {

    const close = useGradeModalStore((state) => state.close)
  
    const GetStudentOptions = useStudentStore((state) => state.subjects)

    const addGrade = useStudentStore((state) => state.addGrade)

    const options = GetStudentOptions.map(o => ({
        value: o.name,
        label: o.name
    }))

    const [newGrade, setNewGrade] = useState<Grade>({
      //id accéder a la liste de tt les id et +1
        id: Date.now().toString(),
        value: 0,
        date: new Date().toString(),
    })
    
    const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined)

    const [gradeValue, setGradeValue] = useState<string>('')

    const handleAddGrade = () => {

        const targetSubject = GetStudentOptions.find((o) => o.name === selectedOption)

        if(targetSubject && newGrade){
            addGrade(targetSubject.id, newGrade)
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
            
            <h1 className='text-xl font-medium'>Nom</h1>

            <Select options={options} value={options.find((o) => o.value === selectedOption)} onChange={(newValue) => setSelectedOption(newValue?.value)}/>

            <input type="text" placeholder='Entrez la nouvelle note' value={gradeValue} onChange={(e) => setGradeValue(e.target.value)} onBlur={() => {
                const num = Number(gradeValue)
                if (!isNaN(num)) {
                    setNewGrade({ ...newGrade, value: num })
                }
            }}/>

            <button onClick={handleAddGrade} className='border rounded-md p-2 hover:bg-stone-50 hover:text-blue-400 transition duration-300'>Enregistrer</button>
            <span>{selectedOption}</span>
          </div>
        </div>
      </div>
    )
}

export default AddGradePanel