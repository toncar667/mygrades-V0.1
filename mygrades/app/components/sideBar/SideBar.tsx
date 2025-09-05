"use client"

import React, { useState } from "react"
import AccountToggle from "./AccountToggle"
import RouteSelect from "./RouteSelect"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoMdClose } from "react-icons/io";


const SideBar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div>
      {/* Bouton pour mobile */}
      <button
        className="md:hidden fixed mt-4 z-50 right-4 text-2xl text-black bg-white p-2 rounded-lg shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoMdClose /> : <GiHamburgerMenu />}
      </button>

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-[280px] shadow-md z-40
            transform transition-transform duration-300 
            ${sidebarOpen ? "translate-x-0 bg-[#0f172a]" : "-translate-x-full"} 
            md:translate-x-0`}
      >
        <div className="p-4">
          <AccountToggle />
          <RouteSelect />
        </div>
      </div>
    </div>
  )
}

export default SideBar