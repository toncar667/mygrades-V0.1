import { create } from "zustand"

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