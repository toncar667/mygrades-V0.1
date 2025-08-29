import { create } from "zustand";
import { Student } from "./StudentStore"
import { useStudentStore } from "./StudentStore";
import { persist } from "zustand/middleware";

export type Account = {
    email: string,
    password: string,
    student: Student
}

type AuthStore = {
    users: Account[]
    currentUser: Account | null
    login: (email: string, password: string) => boolean
    logout: () => void;
    createUser: (newAccount: Account) => void;
    updateCurrentUserStudent: (updatedStudent: Student) => void;
}



export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            users: [
                {  
                        email: "tonkstur@gmail.com", 
                        password: "PASTUmb923",
                        student: {
                            name: "Tonka Sturzenegger",
                            subjects: [],
                        } 
                    },
                    { 
                        email: "ennio.campart@outlook.com", 
                        password: "abcd",
                        student: {
                            name:"Ennio Campart",
                            subjects: [],
                        }
                    },
            ],

            currentUser: null,

            login: (email, password) => {
                const user = get().users.find((u) => u.email === email && u.password === password)
                
                if(user) {

                    //connecte l'utilisateur
                    set({ currentUser: user })
                    
                    
                    const setStudentState = useStudentStore.getState()
                    setStudentState.setAll(user.student)
        
                    set({ currentUser: { email: user.email, password: user.password, student: user.student} })
        
                    return true
                }
        
                return false
            },
            logout: () => {

                set({currentUser: null})
                
                // on écrase les donnée pour laisser un studentStore vierge pour la prochaine connexion
                useStudentStore.getState().reset()
            },

            createUser: (newAccount: Account) => set({users: [...get().users, newAccount]}),

            updateCurrentUserStudent: (updatedStudent: Student) => {

                // on accède à l'état du currenUser
                const auth = get();

                if (auth.currentUser) {

                    //donné de l'utilisateur mise à jour
                    const updatedUser = {
                        ...auth.currentUser,
                        student: updatedStudent
                    };

                    set({ 
                        currentUser: updatedUser,

                        // on modifie l'utilisateur visé de la liste d'utilisateur pour que les changement persiste après deconnexion
                        users: auth.users.map(user => user.email === updatedUser.email ? updatedUser : user)
                    });
                }
            }
        }),
        {
            name: "auth-store"
        }
    )
)