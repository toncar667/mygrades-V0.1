import { useGradeModalStore, useSelectedSubjectStore } from '@/app/GlobalStateStore'
import { useStudentStore } from '@/app/student/StudentStore'
import { HiOutlinePlusCircle } from 'react-icons/hi'
import { HiOutlineTrash } from "react-icons/hi";
import Graph from './Graph';

const SelectedSubject = () => {

    const SelectedSubjectID = useSelectedSubjectStore((state) => state.selectedSubjectID)

    const subject = useStudentStore((state) => state.subjects.find((s) => s.id === SelectedSubjectID))
    const subjectMoy = useStudentStore((state) => state.getSubjectMoy(SelectedSubjectID))

    const nbGrade = subject?.grades.length

    const openGradeModal = useGradeModalStore((state) => state.open)

    const setSelectedSubject = useSelectedSubjectStore((state) => state.setSelectedSubject)

    const deleteSubject = useStudentStore((state) => state.removeSubject)

    const handleDelete = () => {
        subject ? deleteSubject(subject.id) : null
        setSelectedSubject("")
        
    }

  return (
    <div className=''>
        {subject ? 
        <div>
            <div className='flex justify-between items-center'>
                <h1 className='p-4 text-2xl font-semibold'>{subject?.name}</h1>
                <div className='flex gap-2'>
                    <button onClick={openGradeModal} className='flex border rounded-lg h-10 md:h-10 p-2 text-white cursor-pointer bg-[#3c83f6] hover:bg-blue-600 transition duration-300 gap-2'><div className='pt-0.5'><HiOutlinePlusCircle /></div> <span className='text-sm font-semibold'>Note</span></button>
                    <button className='bg-red-500 p-2 px-3 rounded-lg hover:cursor-pointer hover:bg-red-400 transition duration-300' onClick={handleDelete}><HiOutlineTrash className='text-white'/></button>
                </div>
            </div> 
            <div className='grid grid-cols-2 m-4 gap-4 p-4 w-full'>
                <div className='grid-cols-1'>
                    <span>Moyenne</span>
                    <span className='line-clamp-1 text-2xl font-bold'>{subjectMoy}</span>
                </div>
                <div className='grid-cols-1'>
                    <span>Nombre de note</span>
                    <span className='line-clamp-1 text-2xl font-bold'>{nbGrade}</span>
                </div>
            </div>
            <div>
                <h1 className='p-4 text-base font-semibold'>Historique des notes</h1>
                {subject.grades.map((grade) => (
                    <div key={grade.id} className='flex justify-between border-b p-4'><span className='font-medium'>Note: {grade.value}</span></div>))}
            </div>
        </div>
        
        : <div className='p-4 text-stone-400'>Aucune matière sélectionnée</div>   }
    </div>
  )
}

export default SelectedSubject