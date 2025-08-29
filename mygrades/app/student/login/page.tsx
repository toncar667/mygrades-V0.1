"use client"

import React, { useState } from 'react'
import { useAuthStore } from '../AccountStore'
import { useRouter } from 'next/navigation'

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
                            <div>
                                <input className='h-10 w-full mb-5 bg-white border border-stone-300 p-2 text-stone-600 rounded-sm' type="text" placeholder='Entrez votre mot de passe' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)}/>
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