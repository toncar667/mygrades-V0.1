import { create } from "zustand";
import { persist } from "zustand/middleware";

type Grade = {
    id:string;
    value: number;
    date: string;
};

export type Subject = {
    id: string;
    name: string;
    grades: Grade[];
    value?: string;
    label?: string;
}

type Student = {
    id: string;
    name: string;
    subjects: Subject[];
    getSubjectMoy: (SubjectID: string) => number;
    addSubject: (newSubject: Subject) => void;
    removeSubject: (subjectID: string) => void;
    addGrade: (subjectID: string, newGrade: Grade) => void;
    clearSubjectGrade: (subjectID: string) => void;
}

export const useStudentStore = create<Student>()(
    persist(
        (set, get) => ({
            id:"",
            name:"",
            subjects: [],

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

            clearSubjectGrade: (subjectID) => set((state) => ({
                subjects: state.subjects.map(subject => subject.id === subjectID ? {...subject, grades: []}: subject)
            })),
            addSubject: (subject) => set({ subjects: [...get().subjects, subject]}),
            removeSubject: (subjectID) => set({subjects: get().subjects.filter((s) => s.id !== subjectID)}),
            addGrade: (subjectID, newGrade) => set({subjects: get().subjects.map((s) => 
                s.id === subjectID ? {...s, grades: [...s.grades, newGrade]}: s)})
        }),
        {
            name: "student-store",
        }
    ),
)
