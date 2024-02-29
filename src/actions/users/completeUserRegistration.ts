'use server';

import { auth } from '@clerk/nextjs';
import { revalidateTag } from 'next/cache';
import { clerkClient } from '@clerk/nextjs/server';
import UsersDao from '@/db/dao/Users';

const completeUserRegistrationAction = async () => {
  const { userId } = auth();

  const clerkUser = await clerkClient.users.getUser(userId ?? '');

  const dbUser = await UsersDao.insert({
    external_id: userId ?? '',
    email: clerkUser.emailAddresses[0].emailAddress,
    first_name: clerkUser.firstName ?? '',
    last_name: clerkUser.lastName ?? '',
  });

  await clerkClient.users.updateUser(userId!, {
    publicMetadata: { externalId: dbUser.id },
  });

  revalidateTag('current_user');
};

export default completeUserRegistrationAction;
