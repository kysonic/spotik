'use server';

import { revalidateTag } from 'next/cache';
import { auth } from '@clerk/nextjs';
import likeASong from '@/db/commands/users/likeASong';
import UsersDao from '@/db/dao/Users';

// This query would be used not in form, but directly in click handler
export default async function likeASongAction(song_id: number) {
  if (!song_id) {
    throw new Error('Song id is not provided');
  }

  const { userId } = auth();

  const user = await UsersDao.findByExternalId(userId!);

  if (!user) {
    throw new Error('Cannot find a user');
  }

  await likeASong(user.id, song_id);

  revalidateTag('liked-songs'); // Are we going to revalidate all likes for all users (?!)
}
