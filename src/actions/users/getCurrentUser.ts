'use server';
import getCurrentUser from '@/db/commands/users/getCurrentUser';
import { unstable_cache } from 'next/cache';

// export default getCurrentUser
export default unstable_cache(getCurrentUser, ['current_user'], {
  tags: ['current_user'],
  revalidate: 10,
});
