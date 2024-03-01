'use server';

import createPlaylist from '@/db/commands/playlists/createPlaylist';
import { createPlaylistSchema } from '@/validation/playlist';
import { revalidateTag } from 'next/cache';
import { auth } from '@clerk/nextjs';
import UsersDao from '@/db/dao/Users';
import { redirect } from 'next/navigation';

export default async function createPlaylistAction(
  prevState: any,
  formData: FormData
) {
  const rawFormData = {
    title: formData.get('title') as string,
    description: formData.get('description') as string,
  };

  const validatedFields = createPlaylistSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { userId } = auth();

  const user = await UsersDao.findByExternalId(userId!);

  const playlist = await createPlaylist({
    title: rawFormData.title,
    description: rawFormData.description,
    user_id: user.id,
  });

  revalidateTag('playlists');
  redirect(`playlist/${playlist.id}`);

  // For TS
  return {
    errors: null,
  };
}
