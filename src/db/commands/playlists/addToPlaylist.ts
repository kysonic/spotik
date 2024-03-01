'use server';

import PlaylistsSongsDao from '@/db/dao/PlaylistsSongs';

export default async function addToPlaylist(
  playlist_id: number,
  song_id: number
) {
  const playlistSong = await PlaylistsSongsDao.findByPlaylistAndSongId(
    playlist_id,
    song_id
  );

  if (!playlistSong) {
    await PlaylistsSongsDao.insert({
      playlist_id,
      song_id,
    });
  } else {
    await PlaylistsSongsDao.delete(playlistSong.id);
  }
}
