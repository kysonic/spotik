'use server';

import ArtistsDao from '@/db/dao/Artists';

export default async function getArtistWithAlbumsAndSongs(id: number) {
  const artist = await ArtistsDao.findByIdWithAlbumsAndSongs(id);

  return artist ?? null;
}
