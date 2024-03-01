'use server';

import { revalidateTag } from 'next/cache';
import addToPlaylist from '@/db/commands/playlists/addToPlaylist';

export default async function addToPlaylistAction(
  playlist_id: number,
  song_id: number
) {
  if (!song_id || !playlist_id) {
    throw new Error('Song or playlist id is not provided');
  }

  await addToPlaylist(playlist_id, song_id);

  revalidateTag('playlist'); // Are we going to revalidate all likes for all users (?!)
}
