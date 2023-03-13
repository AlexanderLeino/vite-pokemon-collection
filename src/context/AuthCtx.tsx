import {createContext,  ReactNode, useContext, useState} from 'react'



export type currentUser = {
  userId: string,
  userName: string,
  email: string,
  iat: number,
  exp: number,
}

type AuthContext = {
  currentUser: currentUser,
  setCurrentUser: (state: currentUser) => void
} 

export const AuthContext = createContext<AuthContext>({
  currentUser: {
    userId: '',
    userName: '',
    email: '',
    iat: 0,
    exp: 0
  },
  setCurrentUser: function (state: currentUser): void {
    throw new Error('Function not implemented.')
  }
})

interface props {
  children: ReactNode
}

export const Auth= ({children}: props) => {
  const [currentUser, setCurrentUser] = useState<currentUser>({userId: '', userName: '', email: '', iat: 0, exp: 0})
  
  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)