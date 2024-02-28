import { User } from '@/db/dao/Users';

export const getUserName = (user: User) => {
  if (user.first_name || user.last_name) {
    return `${user.first_name} ${user.last_name}`.trim();
  }

  return user.email;
};
