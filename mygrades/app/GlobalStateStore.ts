import { create } from "zustand"
import { persist } from "zustand/middleware";
import { Subject, useStudentStore } from "./student/StudentStore";

type SubjectModalStore = {
    isSubjectModalOpen: boolean;
    open: () => void;
    close: () => void;
}

type GradeModalStore = {
    isGradeModalOpen : boolean,
    open: () => void;
    close: () => void;
}

type SelectedSubjectStore = {
    selectedSubjectID: string;
    setSelectedSubject: (subjectID: string) => void;
}

type EventModalStore = {
    isEventModalStoreOpen: boolean,
    open: () => void;
    close: () => void;
}

type Event = {
    id: string,
    date: string,
    title: string,
    type: string
    description?: string
}

type AgendaStore = {
    selectedDate: Date,
    setSelectedDate: (date: Date) => void;
    events: Event[],
    addEvent: (event: Event, subjectID: string) => void;
    removeEvent: (id: string) => void;
    getEventsByDate: (date:string) => Event[] 
}

export const useAgendaStore = create<AgendaStore>()(
  persist(
    (set, get) => ({

      selectedDate: new Date(),
      events: [],

      setSelectedDate: (date) => {
        set({selectedDate:date})
      },

      addEvent: (event: Event, subjectID: string) => {
          set((state) => ({
            events: [...state.events, event],
          }))

          const addEventToSubject = useStudentStore.getState().addEvent
          addEventToSubject(subjectID, event)
          console.log("added:", event, " to:", subjectID)
        },

      removeEvent: (id) =>
        set((state) => ({
          events: state.events.filter((e) => e.id !== id),
        })),

      getEventsByDate: (date) => {
        const formatted = new Date(date).toLocaleDateString("fr-CA")
        return get().events.filter((e) => e.date === formatted)
      },
    }),
    {
      name: "agenda-store",
    }
  )
)

export const useSelectedSubjectStore = create<SelectedSubjectStore>((set) => ({
    selectedSubjectID: "",
    setSelectedSubject: (subjectID: string) => set({selectedSubjectID: subjectID})
}))

export const useGradeModalStore = create<GradeModalStore>((set) => ({
    isGradeModalOpen: false,
    open: () => set({isGradeModalOpen:true}),
    close: () => set({isGradeModalOpen: false})
}))

export const useSubjectModalStore = create<SubjectModalStore>((set) => ({
    isSubjectModalOpen: false,
    open: () => set({isSubjectModalOpen:true}),
    close: () => set({isSubjectModalOpen: false})
}))

export const useEventModalStore = create<EventModalStore>((set) => ({
    isEventModalStoreOpen: false,
    open: () => set({isEventModalStoreOpen: true}),
    close: () => set({isEventModalStoreOpen: false})
}))