import { ReactNode, createContext, useEffect, useState } from 'react'

import { api } from '@services/api';
import { UserDTO } from '@dtos/UserDTO'
import { storageUserGet, storageUserRemove, storageUserSave } from '@storage/storageUser';
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from '@storage/storageAuthToke';

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

   // Seta headers e atualiza estado
   async function userAndTokenUpdate(userData: UserDTO, token: string){
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setUser(userData)
   }

   // salvando usuario e token no storage 
   async function storageUserAndTokenSave(userData: UserDTO, token: string){
      try {
         await storageUserSave(userData)
         await storageAuthTokenSave(token)
      } catch (error) {
         throw error
      }
   }

   // verifico user e token e salvo o usario e token no storage e dou update
    async function singIn(email: string, password: string){
      try {
         const { data } =  await api.post('/sessions', {email, password})

         if(data.user && data.token){
            await storageUserAndTokenSave(data.user,data.token)
            await userAndTokenUpdate(data.user,data.token)
         }
      } catch (error) {
         throw error
      }

    }

    async function singUp() {
      try {
         setUser({} as UserDTO)
         await storageUserRemove()
         await storageAuthTokenRemove()
      } catch (error) {
         throw error
      }
    }

    // carrego token e usuario e dou update
    async function loadUserData() {
      const userLogged = await storageUserGet()
      const token = await storageAuthTokenGet()

      if(userLogged && token){
         await userAndTokenUpdate(userLogged,token)
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