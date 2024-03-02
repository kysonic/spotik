'use server';

import getArtistWithAlbumsAndSongs from '@/db/commands/artists/getArtistWithAlbumsAndSongs';
import { unstable_cache } from 'next/cache';

const getArtistWithAlbumsAndSongsQuery = (id: number) => {
  return unstable_cache(
    async () => getArtistWithAlbumsAndSongs(id),
    ['artist', id.toString()],
    {
      tags: ['artist'],
      revalidate: 60 * 60 * 24, // Artist available for everybody so there is a sense to cache it for long time
    }
  );
};

export default getArtistWithAlbumsAndSongsQuery;
