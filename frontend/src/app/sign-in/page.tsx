import React from 'react';
import SignInForm from '../components/signInForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign-in',
  description: 'Sign in page',
}

const SignIn: React.FC = () => {
    return(
        <>
          <SignInForm />  
        </>
    )   
}

export default SignIn;