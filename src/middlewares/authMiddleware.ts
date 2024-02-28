import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs/server';
import UsersDao from '@/db/dao/Users';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// TODO: Handle rejection and rollbacks
export async function authMiddleware() {
  const { sessionClaims, userId } = auth();

  // Not registered in our DB
  if (userId && !sessionClaims?.externalId) {
    // Get data
    const clerkUser = await clerkClient.users.getUser(userId ?? '');
    // Session token missing until the next update
    if (!clerkUser.publicMetadata.externalId) {
      const dbUser = await UsersDao.insert({
        external_id: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        first_name: clerkUser.firstName ?? '',
        last_name: clerkUser.lastName ?? '',
      });

      await clerkClient.users.updateUser(userId, {
        publicMetadata: { externalId: dbUser.id },
      });

      revalidatePath('/');
      redirect('/');
    }
  }
}
