'use client'
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import AppContext from '@/contexts/providers';
import AddNewBtn from '@/shared/addNewButton';

const EmptyMovie: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const { loginState } = useContext(AppContext)
  const router = useRouter();

  useEffect(() => {
    const result = Cookies.get('token');
    if (result) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [loginState]);

  const handleAddNew = () => router.push('/add-new-movie')
  const handleSignIn = () => router.push('/sign-in')

  return (
    <>
      <div className='w-full flex flex-col items-center pt-20'>
        <div className='flex justify-center mb-11'>
          <h1 className='text-white text-5xl font-semibold'>Your Movie List is empty</h1>
        </div>
        {isLogin ?
          <div className='flex justify-center'>
            <div className="pl-5 pr-5 pt-2 pb-2 rounded bg-emerald-400 addbtn">
              <AddNewBtn
                buttonName="Add New Movie"
                handleClick={handleAddNew}
              />
            </div>
          </div>
          : 
          <div className='flex justify-center'>
            <div className="pl-5 pr-5 pt-2 pb-2 rounded bg-emerald-400 addbtn">
              <AddNewBtn
                buttonName="Sign In"
                handleClick={handleSignIn}
              />
            </div>
          </div>
        } 
      </div>
    </>
  )
}

export default EmptyMovie;