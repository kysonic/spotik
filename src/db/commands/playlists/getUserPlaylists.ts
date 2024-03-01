'use server';

import PlaylistsDao from '@/db/dao/Playlists';
import UsersDao from '@/db/dao/Users';

export default async function getLikedSongs(id: string) {
  const user = await UsersDao.findByExternalId(id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  const playlists = await PlaylistsDao.getByUserId(user.id);

  return playlists ?? [];
}
