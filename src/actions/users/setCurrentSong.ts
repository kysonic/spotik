'use server';

import updateUser from '@/db/commands/users/updateUser';
import { revalidateTag } from 'next/cache';
import { auth } from '@clerk/nextjs';
import incrementSongPlays from '@/db/commands/songs/incrementSongPlays';

// This query would be used not in form, but directly in click handler
export default async function setCurrentSongAction(song_id: number) {
  const { userId } = auth();

  await updateUser(userId!, {
    current_song_id: song_id,
    updated_at: new Date(),
  });

  await incrementSongPlays(song_id!);

  revalidateTag('current_user');

  return {
    errors: null,
  };
}
