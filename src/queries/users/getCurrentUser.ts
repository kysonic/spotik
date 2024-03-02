'use server';
import getCurrentUser from '@/db/commands/users/getCurrentUser';
import { unstable_cache } from 'next/cache';
import { auth } from '@clerk/nextjs';

const getCurrentUserQuery = () => {
  const { userId } = auth();

  if (!userId) {
    return () => null;
  }

  return unstable_cache(
    async () => getCurrentUser(userId),
    ['current_user', userId.toString()],
    {
      tags: ['current_user'],
      revalidate: 30,
    }
  );
};

export default getCurrentUserQuery;
