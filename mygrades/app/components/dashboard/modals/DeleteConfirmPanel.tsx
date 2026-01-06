import React from "react"
import { HiMinus } from "react-icons/hi"

type Props = {
  isOpen: boolean
  title?: string
  message?: string
  onClose: () => void
  onConfirm: () => void
}

export default function DeleteConfirmPanel({ isOpen, title = "Confirmer la suppression", message="Êtes-vous sûr·e de vouloir supprimer cet élément ?", onClose, onConfirm }: Props) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-md'>
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-semibold'>{title}</h1>
          <button className='justify-end border rounded-md p-2 hover:bg-stone-50 hover:text-blue-400 transition duration-300' onClick={onClose}><HiMinus /></button>
        </div>

        <div className='mt-5'>
          <p className='text-sm text-gray-700'>{message}</p>
        </div>

        <div className='mt-6 flex justify-end gap-3'>
          <button onClick={onClose} className='px-4 py-2 rounded-md border hover:bg-stone-50 transition'>Annuler</button>
          <button onClick={onConfirm} className='px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition'>Supprimer</button>
        </div>
      </div>
    </div>
  )
}
