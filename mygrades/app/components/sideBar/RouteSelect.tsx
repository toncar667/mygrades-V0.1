"use client"

import React from 'react'
import { IconType } from 'react-icons/lib';
import {HiHome, HiCalendar, HiAcademicCap} from "react-icons/hi"
import { usePathname, useRouter } from 'next/navigation';

const RouteSelect = () => {

    const router = useRouter()
    const pathName = usePathname()
    
    const Route = ({Icon, title, link}: {Icon:IconType; title:string; link:string;}) => {

        const selected = () => {
            if(pathName === link){
                return true;
            }else {
                return false;
            }
        }

        return <button onClick={() => {
            router.push(link)
        }} className={`flex items-center justify-start 
            gap-2 w-full rounded px-2 py-1.5 text-sm 
            transition-[box-shadow,_background-color,_color] hover:cursor-pointer 
            ${selected() ? "bg-white text-stone-950 bg-transparent" : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}
        >
            <Icon className={selected() ? "text-blue-400": ""}/>
            <span className={selected() ? "text-blue-400": ""}>{title}</span>
        </button>
    }
  return (
    <div className='space-y-1'>
        <Route link='/student/dashboard' Icon={HiHome} title='Tableau de bord' />
        <Route link='/student/agenda' Icon={HiCalendar} title='Agenda'/>
        <Route link='/student/subjects' Icon={HiAcademicCap} title='Mes matières'/>
    </div>
  )
}


export default RouteSelect