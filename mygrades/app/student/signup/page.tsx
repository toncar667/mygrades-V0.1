"use client"

import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import { Subject } from '../StudentStore'
import { SingleValue } from 'react-select'
import { Account, useAuthStore } from '../AccountStore'
import { useRouter } from 'next/navigation'

type OptionType = {
    value: string;
    label: string;
  };

const page = () => {

    const Router = useRouter()

    const Select = dynamic(() => import('react-select'), { ssr: false }) as unknown as React.FC<any>;

    const OS_SubjectOptions = [
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
    ]

    const selectOptions = OS_SubjectOptions.map((subject) => ({
        value: subject,
        label: subject,
    }));

    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const [studentName, setStudentName] = useState("")
    const [StudentEmail, setStudentEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const createNewAccount = useAuthStore((state) => state.createUser)

    const [osText, setOsText] = useState("")
    const [osTextVisible, setOsTextVisible] = useState("invisible")

    const handleAddSubject = ():Subject | undefined => {
        if (selectedOption) {
        const newSubject: Subject = {
            id: "1",
            color: "#3c83f6",
            name: selectedOption,
            grades: [],
        };
        return newSubject;
        } else {
            setOsTextVisible("visible")
            setOsText("Veuillez choisir une OS !")
            return undefined
        }
    };

    const handleSignUp = () => {

        const newOption = handleAddSubject()

        if (!newOption) return;

        const newAccount: Account = {
            email: StudentEmail,
            password: loginPassword,
            student: {
                name: studentName,
                subjects: [newOption] 
            }
        }
        createNewAccount(newAccount);
        console.log("compte crée")

    }

    return (
            <div className='p-4'>
                <div className='p-4 gap-10'>
                    <div>
                        <h1 className='text-xl font-medium mb-2 text-white'>Prénom et nom</h1> 
                        <div>
                            <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre nom et prénom' value={studentName} onChange={(n) => setStudentName(n.target.value)}/>
                        </div>
                    </div>

                    <div>
                        <h1 className='text-xl font-medium mb-2'>E-mail</h1>
                        <div>
                            <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre e-mail' value={StudentEmail} onChange={(e) => setStudentEmail(e.target.value)}/>
                        </div>
                    </div>

                    <div>
                    <h1 className='text-xl font-medium mb-2'>Mot de passe</h1>
                        <div>
                            <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre mot de passe' value={loginPassword} onChange={(p) => setLoginPassword(p.target.value)}/>
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
                        <button onClick={handleSignUp} className='bg-white h-10 w-32 rounded-md border border-stone-300 text-stone-600 cursor-pointer hover:bg-gray-100'>S'enregistrer</button>
                        <h2 className={osTextVisible}>{osText}</h2>
                    </div>
                </div>
    </div>
  );
}

export default page;
