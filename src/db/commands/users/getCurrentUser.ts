'use server';

import UsersDao from '@/db/dao/Users';

export default async function getCurrentUser(id: number) {
  const user = await UsersDao.findById(id);

  return user;
}
