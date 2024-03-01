'use server';

import SongsDao from '@/db/dao/Songs';

export default async function incrementSongPlays(id: number) {
  const rows = await SongsDao.incrementSongPlays(id);

  return rows;
}
