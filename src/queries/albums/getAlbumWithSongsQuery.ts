'use server';

import getAlbumWithSongs from '@/db/commands/albums/getAlbumWithSongs';
import { unstable_cache } from 'next/cache';

const getAlbumsWithSongsQuery = (id: number) => {
  return unstable_cache(
    async () => getAlbumWithSongs(id),
    ['album', id.toString()],
    {
      tags: ['album'],
      revalidate: 60 * 60 * 24, // Album available for everybody so there is a sense to cache it for long time
    }
  );
};

export default getAlbumsWithSongsQuery;
