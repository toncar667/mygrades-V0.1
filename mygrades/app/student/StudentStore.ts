import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./AccountStore";
import { Event } from "../components/dashboard/modals/AddEventPanel";

export type Grade = {
    id: string;
    name: string;
    value: number;
    date: string;
};

export type Settings = {
    plusPointMode: boolean;
    name: string;
    email: string;
}

export type Subject = {
    id: string;
    name: string;
    color: string;
    grades: Grade[];
    value?: string;
    label?: string;
    events: Event[];
}

export type Student = {
    name: string;
    email: string;
    subjects: Subject[];
    settings: Settings;
}

export type StudentStore = Student & {
    latestGrade: Subject;
    getPlusPoint: (subjectMoy: number) => string;
    updateSettings: (settings: Settings) => void;
    updateLatestGrade: () => void;
    setName: (newName: string) => void;
    addSubject: (subject: Subject) => void;
    removeSubject: (subjectID: string) => void;
    addGrade: (subjectID: string, newGrade: Grade) => void;
    removeGrade: (subjectID: string, gradeID: string) => void;
    clearSubjectGrades: (subjectID: string) => void;
    getSubjectMoy: (subjectID: string) => number;
    getOverallMoy: () => number;
    addEvent: (subjectID: string, event: Event) => void;
    removeEvent: (eventID: string) => void;
    setAll: (student: Student) => void;
    reset: () => void;
}

export const useStudentStore = create<StudentStore>()(
    persist(
        (set, get) => ({
            name: "",
            email: "",
            subjects: [],

            settings: {
                plusPointMode: false,
                name: "",
                email: ""
            },

            getPlusPoint: (subjectMoy: number) => {
                if (subjectMoy === 4) return "0"
                else if (subjectMoy > 4) return "+" + Math.abs(4 - subjectMoy)
                else if (subjectMoy < 4 && subjectMoy > 0) return "-" + (4 - subjectMoy)
                else return "N/A"
            },

            updateSettings: (settings: Settings) => {
                set(() => ({ settings: settings }))

                set({
                    name: settings.name,
                    email: settings.email
                })

                const auth = useAuthStore.getState()

                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: settings.name,
                        subjects: get().subjects,
                        settings: settings,
                        email: settings.email
                    })
                }
            },


            latestGrade: {
                id: "0",
                name: "Évolution des Notes",
                color: "",
                grades: [],
                events: []
            },

            addEvent: (subjectID: string, event: Event) => {

                const updatedSubjects = get().subjects.map((s) => s.id === subjectID ? { ...s, events: [...s.events, event] } : s)

                set({
                    subjects: updatedSubjects
                })

                console.log("1: added:", event, " to:", subjectID)
                const auth = useAuthStore.getState()

                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }

            },

            removeEvent: (eventID: string) => {
                const updatedSubjects = get().subjects.map((s) => ({
                    ...s,
                    events: s.events ? s.events.filter((ev) => ev.id !== eventID) : []
                }))

                set({ subjects: updatedSubjects })

                const auth = useAuthStore.getState()
                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }
            },

            updateLatestGrade: () => {
                const updatedGrades = get().subjects.flatMap(s => s.grades)

                set({
                    latestGrade: { id: "0", name: "Évolution des Notes", color: "", grades: updatedGrades, events: [] }
                })
            },


            setAll: (student: Student) => set(() => ({
                name: student.name,
                subjects: student.subjects,
                settings: student.settings,
                email: student.email
            })),

            reset: () => set(() => ({
                id: "",
                name: "",
                subjects: []
            })),

            setName: (newName: string) => set(() => ({ name: newName })),

            getSubjectMoy: (subjectID: string) => {

                const subjectGrade = get().subjects.find((s) => s.id === subjectID)?.grades || []

                let gradeSum = 0;
                let moy = 0;

                subjectGrade.forEach((note) => {
                    gradeSum += note.value
                })

                if (subjectGrade.length !== 0) {
                    moy = gradeSum / (subjectGrade.length)
                }

                const moyRounded = Math.round(moy * 2) / 2;

                return moyRounded;

            },

            getOverallMoy: () => {

                const subjectsGrades = get().subjects.map((s) => s.grades);
                let totalSum = 0;
                let totalCount = 0;
                let moy = 0;

                subjectsGrades?.forEach((subject) => {
                    subject.forEach((note) => {
                        totalSum += note.value;
                        totalCount += 1;
                    })
                });

                if (totalCount !== 0) {
                    moy = Math.round((totalSum / totalCount) * 2) / 2;
                }

                return moy;
            },

            clearSubjectGrades: (subjectId: string) => {

                const updatedSubjects = get().subjects.map((subject) => {
                    if (subject.id === subjectId) {
                        return { ...subject, grades: [] }
                    } else { return subject }
                }
                )

                set({ subjects: updatedSubjects })

                const auth = useAuthStore.getState()

                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }
            },

            addSubject: (subject: Subject) => {

                const updatedSubjects = [...get().subjects, subject]

                set({ subjects: updatedSubjects })

                const auth = useAuthStore.getState()

                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }
            },

            removeSubject: (subjectID: string) => {
                const updatedSubjects = get().subjects.filter((s) => s.id !== subjectID)
                set({ subjects: updatedSubjects })

                set({
                    latestGrade: {
                        id: "0",
                        name: "Évolution des Notes",
                        color: "",
                        grades: updatedSubjects.flatMap(s => s.grades),
                        events: []
                    }
                });

                const auth = useAuthStore.getState()

                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }

            },

            removeGrade(subjectID, gradeID) {

                const updatedSubjects = get().subjects.map(s => s.id === subjectID ? { ...s, grades: s.grades.filter((g) => g.id !== gradeID) } : s)

                set({ subjects: updatedSubjects })


                const updateLatestGrades = get().latestGrade.grades.filter((g) => g.id !== gradeID)
                set({
                    latestGrade: {
                        ...get().latestGrade,
                        grades: updateLatestGrades,
                    }
                })

                const auth = useAuthStore.getState()

                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }

            },

            addGrade: (subjectID: string, newGrade: Grade) => {
                // sujet choisi dans la liste avec l'id correspondant au paramètre entré. si le sujet de ne correspond pas,
                // on le laisse tel quel. 

                const updatedSubjects = get().subjects.map((s) => s.id === subjectID ? { ...s, grades: [...s.grades, newGrade] } : s)

                // quand on modifie l'état d'un sujet, on modifie l'état de la liste des sujet.
                // donc on vient modifier la liste de sujet avec une nouvelle liste contenant tout les sujet ainsi que
                // celui qui vient d'être modifié

                set({ subjects: updatedSubjects })

                // ajoute à la liste des dernieres notes
                set({
                    latestGrade: {
                        ...get().latestGrade,
                        grades: [...get().latestGrade.grades, newGrade]
                    }
                })

                get().updateLatestGrade()

                // synchro entre le StudentStore et AuthStore
                const auth = useAuthStore.getState()
                if (auth.currentUser) {
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects,
                        settings: get().settings,
                        email: get().email
                    })
                }
            }
        }),
        {
            name: "student-store",
        }
    ),
)

