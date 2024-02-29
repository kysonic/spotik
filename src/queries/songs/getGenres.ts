'use server';
import getGenres from '@/db/commands/songs/getGenres';
import { unstable_cache } from 'next/cache';

// export default getGenres;
export default unstable_cache(getGenres, ['genres'], {
  tags: ['genres'],
  revalidate: 720,
});
