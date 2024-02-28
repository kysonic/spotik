'use server';
import getCurrentUser from '@/db/commands/users/getCurrentUser';
import { unstable_cache } from 'next/cache';
import { auth } from '@clerk/nextjs';

const getCurrentUserAction = () => {
  const { userId } = auth();

  if (!userId) {
    return () => null;
  }

  console.log(userId, '<<<< Clerk user id');

  return unstable_cache(
    async () => getCurrentUser(userId),
    ['current_user', userId.toString()],
    {
      tags: ['current_user'],
      revalidate: 1,
    }
  );
};

export default getCurrentUserAction;
