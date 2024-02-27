'use server';

import updateUser from '@/db/commands/users/updateUser';
import getExternalId from './getExternalId';
import { saveUserGenresSchema } from '@/validation/user';
import { revalidateTag } from 'next/cache';

export default async function saveUserGenres(
  prevState: any,
  formData: FormData
) {
  const rawFormData = {
    genres: (formData.get('genres') as string)?.split(','),
  };

  const validatedFields = saveUserGenresSchema.safeParse(rawFormData);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const userId = getExternalId();

  await updateUser(userId, {
    ...rawFormData,
    updated_at: new Date(),
  });

  revalidateTag('current_user');

  return {
    errors: null,
  };
}
