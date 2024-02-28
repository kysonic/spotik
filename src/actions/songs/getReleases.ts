'use server';
import getReleases from '@/db/commands/songs/getReleases';
import { revalidateTag, unstable_cache } from 'next/cache';
import getExternalId from '../users/getExternalId';

// export default getGenres;
const getReleasesAction = () => {
  const userId = getExternalId();

  return unstable_cache(
    async () => getReleases(userId),
    ['releases', userId.toString()],
    {
      tags: ['releases'],
      revalidate: 60 * 60 * 24,
    }
  );
};

export default getReleasesAction;
