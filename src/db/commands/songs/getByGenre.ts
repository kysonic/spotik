'use server';

import SongsDao, { Song } from '@/db/dao/Songs';
import UsersDao from '@/db/dao/Users';

export default async function getByGenre(id: string, genre: string) {
  // Keep user to adjust query for using favorite songs and artists
  const user = await UsersDao.findByExternalId(id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  const songs = await SongsDao.getByGenre({ genre });

  return songs;
}
