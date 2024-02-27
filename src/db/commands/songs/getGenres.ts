'use server';

import SongsDao from '@/db/dao/Songs';

export default async function getGenres() {
  const genres = await SongsDao.getGenres();

  return genres.map((item) => item.unnest);
}
