'use server';

import getPlaylistById from '@/db/commands/playlists/getPlaylistById';
import { auth } from '@clerk/nextjs';
import { unstable_cache } from 'next/cache';

const getPlaylistByIdQuery = (id: number) => {
  const { userId } = auth();

  if (!userId) {
    return () => null;
  }

  return unstable_cache(
    async () => getPlaylistById(id, userId),
    ['playlist', id.toString(), userId],
    {
      tags: ['playlist'],
      revalidate: 30, // We are going to revalidate cache after mutation, but this one would be good for getting data in few places
    }
  );
};

export default getPlaylistByIdQuery;
