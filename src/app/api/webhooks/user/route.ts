import type { WebhookEvent } from '@clerk/clerk-sdk-node';
import UsersDao from '@/db/dao/Users';
import { revalidateTag } from 'next/cache';

export async function POST(request: Request) {
  const evt = (await request.json()) as WebhookEvent;

  switch (evt.type) {
    case 'user.deleted':
      const clerkUser = evt.data;
      await UsersDao.delete(clerkUser.id!);

      revalidateTag('current_user');

      return new Response('User removed!');
  }

  return new Response('Done');
}
