"use client"

import React from 'react'
import { useStudentStore} from './StudentStore'

const page = () => {

    const addSubject = useStudentStore((state) => state.addSubject);
    const subjects = useStudentStore((state) => state.subjects);
    const removeSubject = useStudentStore((state) => state.removeSubject);

    const Physique= {
        id:"1",
        name: "Physique",
        grades: [],
    };

    const Italien = {
        id: "2",
        name: "Italien",
        grades: [],
    }

    const handleAdd = () => {
        addSubject(Physique);
        addSubject(Italien)
    }

    const handleRemove = () => {
        removeSubject(Physique.id)
        removeSubject(Italien.id)
    }

    return (
        <div>
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id}>
                        {subject.name} - Note: {subject.grades.forEach.name}
                    </li>
                ))}
            </ul>

            <button onClick={handleAdd}>Ajouter la physique</button>
            <button onClick={handleRemove}>Enlever la physique</button>
        </div>
    )
}

export default page