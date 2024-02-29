'use server';
import getByGenre from '@/db/commands/songs/getByGenre';
import { auth } from '@clerk/nextjs';
import { unstable_cache } from 'next/cache';

// export default getGenres;
const getByGenreAction = (genre: string) => {
  const { userId } = auth();

  if (!userId) {
    return () => [];
  }

  return unstable_cache(
    async () => getByGenre(userId, genre),
    ['genre-mix', userId.toString(), genre],
    {
      tags: ['genre-mix'],
      revalidate: 60 * 60 * 24,
    }
  );
};

export default getByGenreAction;
