'use server';
import getCurrentUser from '@/db/commands/users/getCurrentUser';
import { unstable_cache } from 'next/cache';
import getExternalId from './getExternalId';

// export default getCurrentUser
export default unstable_cache(
  async () => {
    const userId = getExternalId();

    return getCurrentUser(userId);
  },
  ['current_user'],
  {
    tags: ['current_user'],
    revalidate: 10,
  }
);
