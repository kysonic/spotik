'use client';

import { useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/ui/forms/Button';
import FormCard from '@/components/ui/forms/FormCard';
import { signInSchema, SignInSchema } from '@/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/forms/FormInput';
import Error from '@/components/ui/typography/Error';
import Link from 'next/link';
import { useSignIn } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

export default function EmailPasswordSignInForm() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset, setFocus } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();

  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  const onSubmit: SubmitHandler<SignInSchema> = async ({ email, password }) => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier: email,
        password,
      });
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        router.push('/');
      } else {
        setError(`Sign in failed with "${result.status}" status`);
      }
      reset();
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard title="SPOTIK SIGN IN" onSubmit={handleSubmit(onSubmit)}>
      <FormInput<SignInSchema>
        name="email"
        type="email"
        control={control}
        label="Email"
        placeholder="Enter your email"
        required
      />
      <FormInput<SignInSchema>
        name="password"
        type="password"
        control={control}
        label="Password"
        placeholder="Enter your password"
        required
      />
      {error && <Error>{error}</Error>}
      <Link href="/auth/sign-up" className="text text-xs block mt-0 underline">
        Sign up
      </Link>
      <div className="flex justify-end">
        <Button disabled={!isLoaded} isLoading={isLoading}>
          Sign In
        </Button>
      </div>
    </FormCard>
  );
}
