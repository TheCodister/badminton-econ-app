import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useContext } from 'react'

interface ContextType {
  isLoggedIn: boolean
}

const Context = createContext<ContextType | undefined>(undefined)

export const ContextProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession()

  const isLoggedIn = !!session // User is logged in if the session exists

  return <Context.Provider value={{ isLoggedIn }}>{children}</Context.Provider>
}

export const useAuth = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
