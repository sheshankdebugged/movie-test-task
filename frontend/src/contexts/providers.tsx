'use client'
import React, { Dispatch, createContext, useEffect, useState, SetStateAction } from 'react';
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation';
import { useApp } from '@/hooks/useApp';


type ProviderProps = {
  loginState: boolean,
  setLoginState : Dispatch<SetStateAction<boolean>>;
}


type CombinedContextType = ProviderProps

const AppContext = createContext<CombinedContextType>({
    loginState: false,
    setLoginState: () => false,
})

interface AppProviderProps {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  const appData = useApp();
const router = useRouter();

  const [loginState, setLoginState] = useState<boolean>(false);

  useEffect(() =>{
    const result = Cookies.get('token');
    if(!result) {
      router.push('/sign-in')
    }
  },[loginState])
  
 
  return (
    <>
      <AppContext.Provider value={{
        ...appData,
        loginState,
        setLoginState
      }}
      >
        {children}
      </AppContext.Provider>
    </>
  )

}

export default AppContext;