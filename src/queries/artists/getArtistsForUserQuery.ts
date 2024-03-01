'use server';

import getUserArtists from '@/db/commands/artists/getUserArtists';
import { auth } from '@clerk/nextjs';
import { unstable_cache } from 'next/cache';

const getArtistsForUserQuery = () => {
  const { userId } = auth();

  if (!userId) {
    return () => [];
  }

  return unstable_cache(
    async () => getUserArtists(userId),
    ['artists', userId.toString()],
    {
      tags: ['artists'],
      revalidate: 30, // We are going to revalidate cache after mutation, but this one would be good for getting data in few places
    }
  );
};

export default getArtistsForUserQuery;
