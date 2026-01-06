"use client"

import React from 'react'
import { useState } from 'react'
import { Settings, useStudentStore } from '../StudentStore'
import { useRouter } from 'next/navigation'

const page = () => {

    const router = useRouter()

    const [isPlusPointMode, setIsPlusPointMode] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const updateSettings = useStudentStore((state) => state.updateSettings)

    const handleUpdateSettings = () => {

        const exportSettings: Settings = {
            plusPointMode: isPlusPointMode,
            name: name,
            email: email
        }

        try {
            updateSettings(exportSettings)
            router.push("/student/dashboard")
        } catch (error) {
            console.log(error)
        }



    }

    return (
        <div>
            <h1 className='p-4 text-white text-2xl font-semibold'>Paramètres</h1>

            <div className='p-4'>
                <h2 className='text-white text-xl font-semibold'>Nom</h2>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded-lg border border-white text-white' />
            </div>

            <div className='p-4'>
                <h2 className='text-white text-xl font-semibold'>Email</h2>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-lg border border-white text-white' />
            </div>


            <div className='p-4'>
                <h2 className='text-white text-xl font-semibold'>Mode de notation</h2>
                <div>
                    <input type="checkbox" checked={isPlusPointMode} onChange={() => setIsPlusPointMode(!isPlusPointMode)} className='w-4 h-4' />
                    <label className='text-white mx-2' htmlFor="">Plus Point</label>
                </div>
            </div>

            <button onClick={handleUpdateSettings} className='m-4 p-2 rounded-lg hover:bg-blue-950 transition-colors bg-white'>Enregistrer</button>

        </div>
    )
}

export default page