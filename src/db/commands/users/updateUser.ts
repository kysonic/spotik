'use server';

import UsersDao, { UpdateUserArgs } from '@/db/dao/Users';

export default async function updateUser(id: string, data: UpdateUserArgs) {
  const rows = await UsersDao.update(id, data);

  return rows;
}
