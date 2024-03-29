'use server';

import updateUser from '@/db/commands/users/updateUser';
import { saveUserGenresSchema } from '@/validation/user';
import { revalidateTag } from 'next/cache';
import { auth } from '@clerk/nextjs';

export default async function saveUserGenresAction(
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

  const { userId } = auth();

  await updateUser(userId!, {
    ...rawFormData,
    updated_at: new Date(),
  });

  revalidateTag('current_user');

  return {
    errors: null,
  };
}
