import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '@services/api';
import { UserDTO } from '@dtos/UserDTO'
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';

export type AuthContextDataProps = {
   user: UserDTO;
   singIn: (email: string, password: string) => Promise<void>;
   singUp: () => Promise<void>;
}

type AuthContextProviderProps = {
   children: ReactNode;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps)


export function AuthContextProvider({children}: AuthContextProviderProps){
   const [ user, setUser ] = useState<UserDTO>({} as UserDTO)

    async function singIn(email: string, password: string){
      try {
         const { data } =  await api.post('/sessions', {email, password})

         if(data.user){
            setUser(data.user)
            storageUserSave(data.user)
         }
      } catch (error) {
         throw error
      }

    }

    async function singUp() {
      try {
         setUser({} as UserDTO)
         await storageUserRemove()
      } catch (error) {
         throw error
      }
    }

    async function loadUserData() {
      const userLogged = await storageUserGet()

      if(userLogged){
         setUser(userLogged)
      }
    }

    useEffect(() => {
      loadUserData()
    }, [] )

   return(
      <AuthContext.Provider value={{ user, singIn, singUp }}>
         {children}
       </AuthContext.Provider>
   )
}