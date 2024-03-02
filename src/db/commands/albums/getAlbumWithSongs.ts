'use server';

import AlbumsDao from '@/db/dao/Albums';

export default async function getAlbumWithSongs(id: number) {
  const album = await AlbumsDao.findByIdWithSongs(id);

  return album ?? null;
}
