'use server';

import LikesDao from '@/db/dao/Likes';
import UsersDao from '@/db/dao/Users';

export default async function getLikedSongs(id: string) {
  const user = await UsersDao.findByExternalId(id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  const songs = await LikesDao.getUserSongs(user.id);

  return songs ?? [];
}
