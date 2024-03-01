'use server';

import UsersDao from '@/db/dao/Users';

export default async function getCurrentUser(external_id: string) {
  const user = await UsersDao.findByExternalIdWithSong(external_id);

  return user;
}
