"use client"

import React, { useState } from 'react'
import { useAuthStore } from '../AccountStore'
import { useRouter } from 'next/navigation'
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

const page = () => {

    const Router = useRouter();

    const [StudentEmail, setStudentEmail] = useState("")
    const [loginPassword, setLoginPassword] = useState("")

    const [logInError, setLogInError] = useState("")
    const login = useAuthStore((state) => state.login)
    const currentUser = useAuthStore((state) => state.currentUser)

        const handleLogin = () => {
            const success = login(StudentEmail, loginPassword)
            
            if(!success) {
                setLogInError("Email ou mot de passe incorrect.")
            }else if (success) Router.push("/student/dashboard")
    
        }

    const [showPW, setShowPW] = useState<"text" | "password">("password")

  return (
    <div><div className='p-4 text-white'>
                    <div className='p-4 gap-10'>
                        {currentUser ? (
                            <div>
                                <p>Connecté en tant que <strong>{currentUser.email}</strong></p>
                            </div>
                        ): (
                            <div></div>
                        )}
    
                        <div>
                            <h1 className='text-xl font-medium mb-2'>E-mail</h1>
                            <div>
                                <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre e-mail' value={StudentEmail} onChange={(e) => setStudentEmail(e.target.value)}/>
                            </div>
                        </div>
                        
                                            <div>
                                            <h1 className='text-xl font-medium mb-2'>Mot de passe</h1>
                                                <div className="relative">
                                                        <input type={showPW} className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 pr-12 text-stone-600 rounded-sm' placeholder='Entrez votre mot de passe' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPW((s) => (s === 'password' ? 'text' : 'password'))}
                                                            aria-label={showPW === 'password' ? 'Afficher le mot de passe' : 'Masquer le mot de passe'}
                                                            className="absolute right-2 cursor-pointer inset-y-0 -top-4 flex items-center text-stone-600 hover:text-stone-800 p-1"
                                                        >
                                                            {showPW === 'password' ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
                                                        </button>
                                                </div>
                                            </div>
                        
                        <div>
                            <button onClick={handleLogin} className='bg-white h-10 w-32 rounded-md border border-stone-300 text-stone-600 cursor-pointer hover:bg-gray-100'>Se connecter</button>
                            {logInError && <p className="text-red-600 mb-2">{logInError}</p>}
                        </div>
                    </div>
        </div></div>
  )
}

export default page