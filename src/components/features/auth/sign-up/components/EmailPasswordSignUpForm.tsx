'use client';

import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/ui/forms/Button';
import FormCard from '@/components/ui/forms/FormCard';
import { signUpSchema, SignUpSchema } from '@/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/forms/FormInput';
import Error from '@/components/ui/typography/Error';
import Link from 'next/link';
import { SignUpFormContext } from '../EmailPasswordSignUpForm';

export default function EmailPasswordForm() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { isLoaded, signUp, setStep } = useContext(SignUpFormContext);
  const { control, handleSubmit, reset, setFocus } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  useEffect(() => {
    setFocus('email');
  }, []);

  const onSubmit: SubmitHandler<SignUpSchema> = async ({ email, password }) => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      await signUp?.create({
        emailAddress: email,
        password,
      });
      console.log(2);
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
      console.log(3);
      reset();
      setStep(1);
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard title="SPOTIK SIGN UP" onSubmit={handleSubmit(onSubmit)}>
      <FormInput<SignUpSchema>
        name="email"
        type="email"
        control={control}
        label="Email"
        placeholder="Enter your email"
        required
      />
      <FormInput<SignUpSchema>
        name="password"
        type="password"
        control={control}
        label="Password"
        placeholder="Enter your password"
        required
      />
      {error && <Error>{error}</Error>}
      <Link href="/auth/sign-in" className="text text-xs block mt-0 underline">
        Sign in
      </Link>
      <div className="flex justify-end">
        <Button disabled={!isLoaded} isLoading={isLoading}>
          Sign Up
        </Button>
      </div>
    </FormCard>
  );
}
