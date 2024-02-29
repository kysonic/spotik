'use server';

import getLikedSongs from '@/db/commands/songs/getLikedSongs';
import { auth } from '@clerk/nextjs';
import { unstable_cache } from 'next/cache';

const getLikedSongsQuery = () => {
  const { userId } = auth();

  if (!userId) {
    return () => [];
  }

  return unstable_cache(
    async () => getLikedSongs(userId),
    ['liked-songs', userId.toString()],
    {
      tags: ['liked-songs'],
      revalidate: 30, // We are going to revalidate cache after mutation, but this one would be good for getting data in few places
    }
  );
};

export default getLikedSongsQuery;
