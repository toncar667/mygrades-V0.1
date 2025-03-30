import React from 'react'

const TopBar = () => {
  return (
    <div className='border-b px-4 mb-4 mt-2 pb-4 border-stone-200'>
        <div className='flex items-center justify-between p-0.5'>
            <div>
                <span className='text-sm font-semibold block'>Salut Tonka !</span>
                <span className='text-xs block text-stone-500'>Dimanche, 30 mars 2026</span>
            </div>

        </div>
    </div>
  )
}

export default TopBar