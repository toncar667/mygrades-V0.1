import React from 'react'
import AccountToggle from './AccountToggle'
import RouteSelect from './RouteSelect'

const SideBar = () => {
  return (
    <div>
        <div className=' sticky top-4 h-[calc(100vh-32px-48px)] mr-4'>
            <AccountToggle />
            <RouteSelect />
        </div>

    </div>
  )
}

export default SideBar