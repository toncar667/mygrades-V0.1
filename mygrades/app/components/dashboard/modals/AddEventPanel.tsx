import { useAgendaStore, useEventModalStore } from '@/app/GlobalStateStore'
import { Subject, useStudentStore } from '@/app/student/StudentStore'
import React, { useState } from 'react'
import { HiMinus, HiOutlinePlusCircle } from 'react-icons/hi'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale/fr'

export type Event = {
  id: string,
  date: string,
  title: string,
  type: string
}

const AddEventPanel = () => {

    const isOpen = useEventModalStore((state) => state.isEventModalStoreOpen)

    const close = useEventModalStore((state) => state.close)
    const subjects = useStudentStore((state) => state.subjects)

    const [SelectedSubject, setSelectedSubject] = useState<string>(subjects[0]?.id || "")
    const [selectedType, setSelectedType] = useState("")
    const [eventTitle, setEventTitle] = useState("")

    const selectedDate = useAgendaStore((state) => state.selectedDate)
    const addEventToAgenda = useAgendaStore((state) => state.addEvent)

    const handleAddEvent = () => {

        if (!SelectedSubject) {
          console.error("Veuillez sélectionner une matière avant d'ajouter un événement")
          return
        }

        const dateStr = selectedDate instanceof Date 
          ? selectedDate.toLocaleDateString("fr-CA") 
          : new Date().toLocaleDateString("fr-CA") 

        const event:Event = {
            id:crypto.randomUUID(),
            date: dateStr,
            title: eventTitle,
            type: selectedType
        }

        if(event){
          if (SelectedSubject) {
            addEventToAgenda(event, SelectedSubject)
            
          }else{
            console.error("could't add event to the subject");
          }
            close()
        }
    }

  if(isOpen) return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center'>
          <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg h-3/6'>
            <div className='flex justify-between'>
              
              <h1 className='text-2xl font-semibold'>Ajouter un évenement</h1>
              <button className='justify-end border rounded-md p-2 hover:bg-stone-50 hover:text-blue-400 transition duration-300' onClick={close}><HiMinus /></button>
              
            </div>

            <div className='mt-5'>
                <h1 className='text-xl font-bold text-[#3c83f6]'>{format(selectedDate, "EEEE dd MMMM yyyy", { locale: fr })}</h1>
            </div>

            <div className='mt-5'>
              <h1 className='text-xl font-medium'>Matière</h1>
              <select className='border w-full rounded-sm p-2' name="Subject" id="subject" value={SelectedSubject} onChange={(s) => setSelectedSubject(s.target.value)}>
                {subjects.map((s) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>
            <div className='mt-5'>
                <h1 className='text-xl font-medium'>Type</h1>
                <select className='border w-full rounded-sm p-2' name="Type" id="type" value={selectedType} onChange={(t) => setSelectedType(t.target.value)}>
                    <option value="1">Examen</option>
                    <option value="2">Devoir</option>
                </select>
            </div>

            <div className='mt-5'>
                <h1 className='text-xl font-medium'>Titre</h1>
                <input className='border w-full rounded-sm p-2' type="text" value={eventTitle} onChange={(e) => setEventTitle(e.target.value)}/>
            </div>

            <button onClick={handleAddEvent} className='flex border rounded-sm h-12 md:h-10 p-2 mt-4 text-white cursor-pointer bg-[#3c83f6] hover:bg-blue-600 transition duration-300 gap-2'><div className='pt-0.5'><HiOutlinePlusCircle /></div> <span className='text-sm font-semibold'>Ajouter</span></button>
          </div>
        </div>
  )
}

export default AddEventPanel