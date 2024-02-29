'use server';

import UsersDao from '@/db/dao/Users';

export default async function getCurrentUser(external_id: string) {
  const user = await UsersDao.findByExternalId(external_id);

  return user;
}
