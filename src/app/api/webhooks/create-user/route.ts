import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import { clerkClient } from '@clerk/nextjs/server';
import UsersDao from '@/db/dao/Users';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const evt = (await request.json()) as WebhookEvent;

  switch (evt.type) {
    case 'user.created':
      const clerkUser = evt.data;
      const dbUser = await UsersDao.insert({
        external_id: clerkUser.id,
        email: clerkUser.email_addresses[0].email_address,
        first_name: clerkUser.first_name ?? '',
        last_name: clerkUser.last_name ?? '',
      });
      await clerkClient.users.updateUser(clerkUser.id, {
        publicMetadata: { externalId: dbUser.id },
      });

      revalidateTag('current_user');

      return new Response('User created!');
  }

  return new Response('Done');
}
