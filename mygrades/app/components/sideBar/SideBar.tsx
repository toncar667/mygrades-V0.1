import React from 'react'
import AccountToggle from './AccountToggle'
import RouteSelect from './RouteSelect'

const SideBar = () => {
  return (
    <div className='p-2'>
        <div className=' sticky h-[calc(100vh-32px-48px)]'>
            <AccountToggle />
            <RouteSelect />
        </div>

    </div>
  )
}

export default SideBar