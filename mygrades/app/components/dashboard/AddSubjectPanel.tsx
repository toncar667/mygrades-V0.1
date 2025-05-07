import React from 'react'

const AddSubjectPanel = () => {

  const handleClose = () => {
    
  }

  return (
    <div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center'>
      <div className='bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg relative h-3/6'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>Ajouter une matière</h1>
          <button className='justify-end border rounded-sm h-10 p-2 hover:bg-stone-50 hover:text-blue-400 transition duration-300' onClick={handleClose}>Fermer</button>
        </div>
      </div>
    </div>
  )
}

export default AddSubjectPanel