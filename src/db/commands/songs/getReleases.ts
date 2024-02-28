'use server';

import SongsDao, { Song } from '@/db/dao/Songs';
import UsersDao from '@/db/dao/Users';

export default async function getReleases(id: number) {
  const user = await UsersDao.findById(id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  const songs = await SongsDao.getReleases({ genres: user.genres ?? [] });

  return songs;
}
