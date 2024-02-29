'use server';

import LikesDao from '@/db/dao/Likes';

export default async function likeASong(user_id: number, song_id: number) {
  const like = await LikesDao.findByUserAndSongIds(user_id, song_id);

  if (!like) {
    await LikesDao.insert({
      user_id,
      song_id,
    });
  } else {
    await LikesDao.delete(like.id);
  }
}
