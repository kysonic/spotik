'use server';

import getUserPlaylists from '@/db/commands/playlists/getUserPlaylists';
import { auth } from '@clerk/nextjs';
import { unstable_cache } from 'next/cache';

const getUserPlaylistsQuery = () => {
  const { userId } = auth();

  if (!userId) {
    return () => [];
  }

  return unstable_cache(
    async () => getUserPlaylists(userId),
    ['playlists', userId.toString()],
    {
      tags: ['playlists'],
      revalidate: 30, // We are going to revalidate cache after mutation, but this one would be good for getting data in few places
    }
  );
};

export default getUserPlaylistsQuery;
