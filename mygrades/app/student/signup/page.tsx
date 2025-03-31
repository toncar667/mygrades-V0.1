"use client"

import React, { useState } from 'react'
import Select from 'react-select'
import { Subject } from '../StudentStore'
import { useStudentStore } from '../StudentStore'
import { clear } from 'console'


const page = () => {

    const OS_SubjectOptions: Subject[] = [
        { id: "1", name:"Mathématique et Physique", value: "1", label: "Mathématique et Physique", grades:[]},
        { id:"2", name:"Biologie et Chimie", value: "2", label: "Biologie et Chimie", grades:[]},
        { id:"3", name:"Italien", value: "3", label: "Italien", grades:[]},
        { id:"4", name:"Espagnol", value:"4", label: "Espagnol", grades:[]}
    ]

    const [selectedOption, setSelectedOption] = useState<Subject | null>(null)

    const setOS_Option = useStudentStore((state) => state.addSubject)

    const addGrade = useStudentStore((state) => state.addGrade)

    const clearGrade = useStudentStore((state) => state.clearSubjectGrade)

    const mpGrade = useStudentStore((state) => state.subjects.find((s) => s.id === "1")?.grades)

    const handleAddSubject = () => {
        if(selectedOption !== null){
        }
        if (selectedOption) {
            const { value, label, ...subjectData } = selectedOption
            setOS_Option(subjectData)
        }
    }

    const handleAddGrade = () => {
        addGrade("1", {id:"1", value:4.5, date:"01.01.2025"})
        addGrade("1", {id:"2", value:4.5, date:"05.01.2025"})
        addGrade("1", {id:"3", value:5, date:"13.01.2025"})
        addGrade("1", {id:"4", value:3, date:"26.01.2025"})

        addGrade("2", {id:"1", value:3.5, date:"02.03.2025"})
        addGrade("2", {id:"2", value:5.5, date:"07.03.2025"})
        addGrade("2", {id:"3", value:4, date:"08.03.2025"})
        addGrade("2", {id:"4", value:3.5, date:"15.03.2025"})
        addGrade("2", {id:"5", value:3.5, date:"20.03.2025"})
        addGrade("2", {id:"6", value:5, date:"30.03.2025"})
    }

    const handleClearGrade = () => {
        clearGrade("1")
        clearGrade("2")
    }

  return (
    <div>
        <Select 
            options={OS_SubjectOptions}
            value={selectedOption}
            name='OS_Select'
            isSearchable
            onChange={(newValue) => setSelectedOption(newValue)}
        />

        <button onClick={handleAddSubject}>Ajouter</button>

        <button onClick={handleAddGrade}>Ajouter les notes</button>
        <ul>
            {mpGrade?.map((grade, index) => (
                <li key={index}>{grade.value}</li>
            ))}
        </ul>

        <button onClick={handleClearGrade}>clear les note</button>
    </div>
  )
}

export default page