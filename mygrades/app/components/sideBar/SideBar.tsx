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
      {/* Bouton hamburger - visible uniquement en mobile */}
      <button
        className="md:hidden fixed  top-4 z-50 right-4 text-2xl text-black bg-white p-2 rounded-lg shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <IoMdClose /> :
        <GiHamburgerMenu />
        }
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[280px] shadow-md z-40 
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0 bg-[#0f172a]" : "-translate-x-full"} 
          md:translate-x-0 md:block
        `}
      >
        <div className="p-4">
          <AccountToggle />
          <RouteSelect />
        </div>
      </div>

      {/* Overlay pour fermer en mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default SideBar