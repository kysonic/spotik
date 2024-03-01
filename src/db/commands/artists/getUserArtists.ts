'use server';

import ArtistsDao from '@/db/dao/Artists';
import UsersDao from '@/db/dao/Users';

export default async function getUserArtists(id: string) {
  const user = await UsersDao.findByExternalId(id);

  if (!user) {
    throw new Error('Cannot find user');
  }

  const artists = await ArtistsDao.getForUser({
    genres: user.genres ?? [],
    // Here could be added another criteria to search relevant records
  });

  return artists ?? [];
}
