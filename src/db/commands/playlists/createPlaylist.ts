'use server';

import PlaylistsDao, { InsertPlaylistArgs } from '@/db/dao/Playlists';

export default async function createPlaylist(data: InsertPlaylistArgs) {
  const rows = await PlaylistsDao.insert(data);

  return rows;
}
