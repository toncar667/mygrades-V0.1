"use client"

import React from "react"
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
} from "date-fns"
import { fr } from "date-fns/locale"
import { useAgendaStore } from "@/app/GlobalStateStore"

type CalendarProps = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export default function Calendar({ selectedDate, setSelectedDate }: CalendarProps) {
  
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const { events } = useAgendaStore()

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })
  const days = eachDayOfInterval({ start: startDate, end: endDate })

  const setGlobalSelectedDate = useAgendaStore((state) => state.setSelectedDate)

  const hasEvent = (day: Date) => {
    const dayFormatted = format(day, "yyyy-MM-dd")
    return events.some((e) => e.date === dayFormatted)
  }

  const handleSetSelectedDate = (day: Date) => {
    setSelectedDate(day)
    setGlobalSelectedDate(day)
  } 

  return (
    <div className="p-4 bg-white rounded-xl w-full">

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          ←
        </button>
        <h2 className="font-semibold text-lg">
          {format(currentDate, "MMMM yyyy", { locale: fr })}
        </h2>
        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer"
        >
          →
        </button>
      </div>


      <div className="grid grid-cols-7 text-center font-semibold border-b pb-2">
        {["L", "M", "M", "J", "V", "S", "D"].map((d, i) => (
          <span key={i}>{d}</span>
        ))}
      </div>


      <div className="grid grid-cols-7 gap-1 mt-2">
        {days.map((day, i) => {
          const isCurrentMonth = isSameMonth(day, monthStart)
          const isSelected = isSameDay(day, selectedDate)
          const eventExists = hasEvent(day)

          return (
            <button
              key={i}
              onClick={() => handleSetSelectedDate(day)}
              className={`p-2 rounded-md text-sm transition-all flex flex-col cursor-pointer items-center justify-center ${
                isSelected
                  ? "bg-blue-500 text-white"
                  : isCurrentMonth
                  ? "text-gray-800 hover:bg-blue-100"
                  : "text-gray-400"
              }`}
            >
              {format(day, "d")}
              {eventExists && (
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1"></span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}