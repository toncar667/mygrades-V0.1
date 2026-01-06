"use client"

import { useAgendaStore, useEventModalStore } from "@/app/GlobalStateStore"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import AddEventPanel from "../dashboard/modals/AddEventPanel"
import { MdEdit, MdClose } from "react-icons/md";
import { useState } from "react"
import DeleteConfirmPanel from "../dashboard/modals/DeleteConfirmPanel"
import { useStudentStore } from "@/app/student/StudentStore"

export default function DayInfoPanel({ selectedDate }: { selectedDate: Date }) {
  const { getEventsByDate, removeEvent } = useAgendaStore()
  const events = getEventsByDate(format(selectedDate, "yyyy-MM-dd"))

  const openEventModal = useEventModalStore((state) => state.open)
  const isModalOpen = useEventModalStore((state) => state.isEventModalStoreOpen) 

  const [isEdit, setIsEdit] = useState(false)

  const toggleEdit = () => setIsEdit((s) => !s)

  const [deleteTarget, setDeleteTarget] = useState<null | { id: string; title: string }>(null)

  const removeEventFromSubject = useStudentStore((s) => s.removeEvent)

  const openDeleteModal = (id: string, title: string) => setDeleteTarget({ id, title })

  const closeDeleteModal = () => setDeleteTarget(null)

  const confirmDelete = () => {
    if (!deleteTarget) return
    // remove from agenda store and from the subject's events
    removeEvent(deleteTarget.id)
    try {
      removeEventFromSubject(deleteTarget.id)
    } catch (e) {
      // fail silently if subject store doesn't have the event — agenda removal already done
      console.warn("Failed to remove event from subject store:", e)
    }
    setDeleteTarget(null)
  }

  return (

    <div>
      {isModalOpen ? <AddEventPanel />: null}
    <div className="p-4 bg-white rounded-xl w-full">
      <div className="flex justify-between">
      <h2 className="font-semibold text-lg mb-2">
        {format(selectedDate, "EEEE dd MMMM yyyy", { locale: fr })}
      </h2>
      <button
        onClick={toggleEdit}
        aria-pressed={isEdit}
        className="justify-end font-semibold text-xl mb-2 cursor-pointer rounded-full p-2 transition-colors duration-150 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200"
      >
        {events.length === 0 ? null : (isEdit ? <MdClose /> : <MdEdit />)}
      </button>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-500 text-sm">Aucun devoir ce jour-là</p>
      ) : (
        <ul className="text-sm space-y-1">
          {events.map((e) => (
            <li
              key={e.id}
              className={`border-b pb-1 rounded-md px-2 py-1 flex items-center justify-between transition-colors duration-150 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200`}
            >
              <span>{e.title}</span>
              {isEdit ? (
                <button
                  onClick={() => openDeleteModal(e.id, e.title)}
                  aria-label={`Supprimer ${e.title}`}
                  className="ml-3 text-red-600 hover:bg-red-100 p-1 rounded-full"
                >
                  <MdClose />
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={openEventModal}
        className="cursor-pointer mt-3 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Ajouter un devoir
      </button>
    </div>
    <DeleteConfirmPanel
      isOpen={!!deleteTarget}
      title="Supprimer l'événement"
      message={deleteTarget ? `Voulez-vous supprimer "${deleteTarget.title}" ?` : undefined}
      onClose={closeDeleteModal}
      onConfirm={confirmDelete}
    />
    </div>
  )
}