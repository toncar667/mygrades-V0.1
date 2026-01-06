"use client"

import { useRouter } from "next/navigation"

export default function Home() {

  const router = useRouter()

  return (
    <div className="gap-4 flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-4xl font-bold">MyGrades</h1>
      <div className="flex gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push("/student/signup")}>Créer un compte</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push("/student/login")}>Se connecter</button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => router.push("/student/dashboard")}>Dashboard</button>
      </div>
    </div>
  )
}
