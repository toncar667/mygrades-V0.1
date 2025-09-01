import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "./AccountStore";

type Grade = {
    id:string;
    value: number;
    date: string;
};

export type Subject = {
    id: string;
    name: string;
    color: string;
    grades: Grade[];
    value?: string;
    label?: string;
}

export type Student = {
    name: string;
    subjects: Subject[];
}

export type StudentStore = Student & {
    latestGrade: Subject;
    updateLatestGrade: () => void;
    setName: (newName: string) => void;
    addSubject: (subject: Subject) => void;
    removeSubject: (subjectID: string) => void;
    addGrade: (subjectID: string, newGrade: Grade) => void;
    clearSubjectGrades: (subjectID: string) => void;
    getSubjectMoy: (subjectID: string) => number;
    getOverallMoy: () => number;
    setAll: (student: Student) => void;
    reset: () => void;
}

export const useStudentStore = create<StudentStore>()(
    persist(
        (set, get) => ({
            name:"",
            email:"",
            subjects: [],

            latestGrade: {
                id: "0",
                name: "Évolution des Notes",
                color: "",
                grades: []
            },

            updateLatestGrade: () => {
                const updatedGrades = get().subjects.flatMap(s => s.grades)
                
                set({
                    latestGrade: {id: "0", name: "Évolution des Notes", color: "", grades: updatedGrades}
                })
            },
                

            setAll: (student: Student) => set(() => ({
                name: student.name,
                subjects: student.subjects
            })),

            reset: () => set(() => ({
                id: "",
                name: "",
                subjects: []
            })),

            setName: (newName: string) => set(() => ({name: newName})),

            getSubjectMoy: (subjectID: string) => {

                const subjectGrade = get().subjects.find((s) => s.id === subjectID)?.grades || []

                let gradeSum = 0;
                let moy = 0;
            
                subjectGrade?.forEach(note => {
                    gradeSum += note.value
                })
            
                if(subjectGrade?.length !== 0) {
                    moy = gradeSum / (subjectGrade?.length)
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

                if(totalCount !== 0) {
                    moy = Math.round((totalSum / totalCount) * 2) / 2;
                }

                return moy;
            },

            clearSubjectGrades: (subjectID: string) => {
                
                const updatedSubjects = get().subjects.map(subject => subject.id === subjectID ? {...subject, grades: []}: subject)
                set({ subjects: updatedSubjects })
                
                const auth = useAuthStore.getState()

                if(auth.currentUser){
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects
                    })
                }
            },

            addSubject: (subject: Subject) => {
                
                const updatedSubjects = [...get().subjects, subject]

                set({subjects: updatedSubjects})

                const auth = useAuthStore.getState()

                if(auth.currentUser){
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects
                    })
                }
            },

            removeSubject: (subjectID: string) => {
                const updatedSubjects = get().subjects.filter((s) => s.id !== subjectID)
                set({subjects: updatedSubjects})

                set({
                    latestGrade: {
                        id: "0",
                        name: "Évolution des Notes",
                        color: "",
                        grades: updatedSubjects.flatMap(s => s.grades)
                    }
            });

                const auth = useAuthStore.getState()

                if(auth.currentUser){
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects
                    })
                }
                
            },
            
            addGrade: (subjectID:string, newGrade:Grade) => 
            {
                // sujet choisi dans la liste avec l'id correspondant au paramètre entré. si le sujet de ne correspond pas,
                // on le laisse tel quel. 

                const updatedSubjects = get().subjects.map((s) => s.id === subjectID ? {...s, grades: [...s.grades, newGrade]}  :  s)
                
                // quand on modifie l'état d'un sujet, on modifie l'état de la liste des sujet.
                // donc on vient modifier la liste de sujet avec une nouvelle liste contenant tout les sujet ainsi que
                // celui qui vient d'être modifié

                set({subjects: updatedSubjects})
                
                // ajoute à la liste des dernieres notes
                set({latestGrade: {
                    ...get().latestGrade,
                    grades: [...get().latestGrade.grades, newGrade]
                }}) 

                get().updateLatestGrade()

                // synchro entre le StudentStore et AuthStore
                const auth = useAuthStore.getState()
                if(auth.currentUser){
                    auth.updateCurrentUserStudent({
                        name: get().name,
                        subjects: updatedSubjects
                    })
                }
            }
        }),
        {
            name: "student-store",
        }
    ),
)

