'use server';
import getReleases from '@/db/commands/songs/getReleases';
import { auth } from '@clerk/nextjs';
import { unstable_cache } from 'next/cache';

// export default getGenres;
const getReleasesQuery = () => {
  const { userId } = auth();

  if (!userId) {
    return () => [];
  }

  return unstable_cache(
    async () => getReleases(userId),
    ['releases', userId.toString()],
    {
      tags: ['releases'],
      revalidate: 60 * 60 * 24,
    }
  );
};

export default getReleasesQuery;
