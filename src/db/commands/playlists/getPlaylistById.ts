'use server';

import PlaylistsDao from '@/db/dao/Playlists';
import UsersDao from '@/db/dao/Users';

export default async function getPlaylistById(id: number, external_id: string) {
  const user = await UsersDao.findByExternalId(external_id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  // await new Promise((resolve) => setTimeout(resolve, 10000)); // Test skeleton loading
  const playlist = await PlaylistsDao.findByIdWithSongs(id);

  // Here we can write a logic of playlist access
  if (playlist && playlist.user_id !== user.id) {
    throw new Error('Access denied...');
  }

  return playlist;
}
