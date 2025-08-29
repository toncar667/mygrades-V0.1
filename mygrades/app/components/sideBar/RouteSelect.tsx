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
            gap-2 w-full rounded-lg px-2 py-1.5 text-lg font-normal 
            transition-[box-shadow,_background-color,_color] hover:cursor-pointer 
            ${selected() ? "bg-[#3c83f6] text-white" : "hover:bg-blue-950 bg-transparent text-white shadow-none"}`}
        >
            <Icon className={selected() ? "text-white": ""}/>
            <span className={selected() ? "text-white": ""}>{title}</span>
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