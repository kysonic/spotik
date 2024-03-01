'use server';

import SongsDao, { Song } from '@/db/dao/Songs';

export default async function getBySearch(query: string) {
  const songs = await SongsDao.getBySearch({ query });

  return songs;
}
