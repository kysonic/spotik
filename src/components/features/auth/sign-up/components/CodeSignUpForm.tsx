'use client';

import { useEffect, useState, useContext } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import Button from '@/components/ui/forms/Button';
import FormCard from '@/components/ui/forms/FormCard';
import { signUpCodeSchema, SignUpCodeSchema } from '@/validation/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import FormInput from '@/components/forms/FormInput';
import Error from '@/components/ui/typography/Error';
import { useRouter } from 'next/navigation';
import { SignUpFormContext } from '../EmailPasswordSignUpForm';
import completeUserRegistration from '@/actions/users/completeUserRegistration';

export default function CodeSignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { control, handleSubmit, reset, setFocus } = useForm<SignUpCodeSchema>({
    resolver: zodResolver(signUpCodeSchema),
  });
  const { isLoaded, signUp, setActive } = useContext(SignUpFormContext);

  useEffect(() => {
    setFocus('code');
  }, []);

  const onSubmit: SubmitHandler<SignUpCodeSchema> = async ({ code }) => {
    if (!isLoaded) {
      return;
    }

    try {
      setIsLoading(true);
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      if (completeSignUp.status !== 'complete') {
        setError(`Verification failed with "${completeSignUp.status}" status`);
      }
      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        await completeUserRegistration();
        router.push('/');
      }
    } catch (err: any) {
      setError(err.errors[0].message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormCard title="SPOTIK VERIFY CODE" onSubmit={handleSubmit(onSubmit)}>
      <FormInput<SignUpCodeSchema>
        name="code"
        type="text"
        control={control}
        label="Verification code"
        placeholder="Enter your code"
        required
      />
      {error && <Error>{error}</Error>}
      <div className="flex justify-end">
        <Button isLoading={isLoading}>Verify email</Button>
      </div>
    </FormCard>
  );
}
