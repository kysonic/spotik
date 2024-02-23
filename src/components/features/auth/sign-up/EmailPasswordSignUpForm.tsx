'use client';

import { useState, createContext } from 'react';
import { useSignUp } from '@clerk/nextjs';
import EmailPasswordForm from './components/EmailPasswordSignUpForm';
import CodeForm from './components/CodeSignUpForm';

export type SignUpFormContextType = ReturnType<typeof useSignUp> & {
  setStep: (v: number) => void;
};

export const SignUpFormContext = createContext<SignUpFormContextType>({} as SignUpFormContextType);

export default function EmailPasswordSignUpForm() {
  const [step, setStep] = useState(0);
  const useSignUpValue = useSignUp();

  return (
    <SignUpFormContext.Provider value={{ ...useSignUpValue, setStep }}>
      {step === 0 && <EmailPasswordForm />}
      {step === 1 && <CodeForm />}
    </SignUpFormContext.Provider>
  );
}
