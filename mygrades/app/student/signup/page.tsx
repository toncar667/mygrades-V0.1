"use client"

import dynamic from 'next/dynamic'
import React, { useCallback, useMemo, useState } from 'react'
import { useStudentStore } from '../StudentStore'
import { SingleValue } from 'react-select'

type OptionType = {
    value: string;
    label: string;
  };

const page = () => {


    const Select = dynamic(() => import('react-select'), { ssr: false }) as unknown as React.FC<any>;

    const OS_SubjectOptions = useMemo(() =>[
        "Physique et application des mathématiques",
        "Biologie et Chimie",
        "Italien",
        "Espagnol",
        "Economie et droits",
        "Grec",
        "Latin",
        "Musique",
        "Philosophie et Psychologie",
        "Arts visuels",
    ], []);

    const selectOptions = OS_SubjectOptions.map((subject) => ({
        value: subject,
        label: subject,
    }));

    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const setOS_Option = useStudentStore((state) => state.addSubject);
    const removeSubject = useStudentStore((state) => state.removeSubject)
    const setStudentName = useStudentStore((state) => state.setName)
    const setStudentEmail = useStudentStore((state) => state.setEmail)

    const StudentName = useStudentStore((state) => state.name)
    const StudentEmail = useStudentStore((state) => state.email)

    const [osText, setOsText] = useState("")
    const [osTextVisible, setOsTextVisible] = useState("invisible")

    const handleAddSubject = useCallback(() => {
        if (selectedOption) {
        const newSubject = {
            id: "1",
            name: selectedOption,
            grades: [],
        };
        removeSubject("1")
        setOS_Option(newSubject);
        setOsText("L'OS a été ajoutée")
        setOsTextVisible("visible")
        } else {
            setOsTextVisible("visible")
            setOsText("Veuillez choisir une OS")
        }
    }, [selectOptions, setOS_Option]);

    const handleRemoveSubject = () => {
        removeSubject("1")
    } 

    return (
            <div className='p-4'>
                <div className='p-4 gap-10'>


                    <div>
                        <h1 className='text-xl font-medium mb-2'>Prénom</h1>
                        <div>
                            <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre prénom' value={StudentName} onChange={(n) => setStudentName(n.target.value)}/>
                        </div>
                    </div>

                    <div>
                    <h1 className='text-xl font-medium mb-2'>E-mail</h1>
                        <div>
                            <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre e-mail' value={StudentEmail} onChange={(e) => setStudentEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-xl font-medium'>Choisir son OS</h1>
                        <div className='mt-2 mb-5'>
                            <Select
                            
                            options={selectOptions}
                            value={selectOptions.find((opt) => opt.value === selectedOption) || null}
                            onChange={(newValue: SingleValue<OptionType>) => setSelectedOption(newValue?.value || null)}
                            isSearchable
                            name="OS_Select"
                            />
                        </div>
                        <button onClick={handleAddSubject} className='bg-white h-10 w-32 rounded-md border border-stone-300 text-stone-600 cursor-pointer hover:bg-gray-100'>Confirmer l'OS</button>
                        <h2 className={osTextVisible}>{osText}</h2>
                    </div>
                </div>
                <button onClick={handleRemoveSubject}>Enlever l'OS</button>
    </div>
  );
}

export default page;
