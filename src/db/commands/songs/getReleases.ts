'use server';

import SongsDao, { Song } from '@/db/dao/Songs';
import UsersDao from '@/db/dao/Users';

export default async function getReleases(id: string) {
  const user = await UsersDao.findByExternalId(id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  // await new Promise((resolve) => setTimeout(resolve, 2000)); uncomment to test suspense
  const songs = await SongsDao.getReleases({ genres: user.genres ?? [] });

  return songs;
}
