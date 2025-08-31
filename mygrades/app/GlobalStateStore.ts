import { create } from "zustand"
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
    selectedSubjectID: string | null;
    setSelectedSubject: (subjectID: string | null) => void;
}

export const useSelectedSubjectStore = create<SelectedSubjectStore>((set) => ({
    selectedSubjectID: null,
    setSelectedSubject: (subjectID: string | null) => set({selectedSubjectID: subjectID})
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