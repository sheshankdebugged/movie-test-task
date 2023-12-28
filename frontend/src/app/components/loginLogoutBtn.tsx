'use client'
import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import AppContext from '@/contexts/providers';
import { useApp } from '@/hooks/useApp';

const LoginLogout: React.FC = () => {
  const router = useRouter();
  const { loginState, setLoginState } = useContext(AppContext);
  const { setAllMovies } = useApp()
  const [isLogin, setIsLogin] = useState<boolean>(false)

  useEffect(() => {
    const result = Cookies.get('token');
    if (result) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [loginState])

  const handleLogin = () => {
    router.push('/sign-in')
  }

  const handleLogout = async () => {
    Cookies.remove('token');
    Cookies.remove('user');
    // handleGetAllMovies(0)
    setAllMovies([])
    setLoginState(false)
    setIsLogin(false)
    router.push('/sign-in')
  }

  return (
    <>
      <div className='flex items-center md:mt-8 mt-6 pr-1 md:pr-0'> 
        {isLogin ?
          <button
            onClick={handleLogout}
            className="flex flex-row button text-white text-base font-bold leading-6 text-center flex items-center"
          >
            <span className='flex items-center text-center md:block hidden'>Logout</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22.67 10.67L20.79 12.55L22.89 14.67H12V17.33H22.89L20.79 19.44L22.67 21.33L28 16L22.67 10.67ZM6.67 6.67H16V4H6.67C5.2 4 4 5.2 4 6.67V25.33C4 26.8 5.2 28 6.67 28H16V25.33H6.67V6.67Z" fill="white" />
            </svg>
          </button>
          :
          <button
            className="flex flex-row button text-white text-base font-bold leading-6 text-center flex items-center "
            onClick={handleLogin}
          >
            <span className='flex items-center text-center md:block hidden'>Login</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M22.67 10.67L20.79 12.55L22.89 14.67H12V17.33H22.89L20.79 19.44L22.67 21.33L28 16L22.67 10.67ZM6.67 6.67H16V4H6.67C5.2 4 4 5.2 4 6.67V25.33C4 26.8 5.2 28 6.67 28H16V25.33H6.67V6.67Z" fill="white" />
            </svg>
          </button>
        }
      </div>
    </>
  )
}

export default LoginLogout;