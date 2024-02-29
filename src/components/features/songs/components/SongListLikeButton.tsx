'use client';

import likeASongAction from '@/actions/users/likeASong';
import IconButton from '@/components/ui/buttons/IconButton';
import HeartIcon from '@/components/ui/icons/HeartIcon';

export type SongListLikeButtonProps = {
  id: number;
  isLiked: boolean;
};

export default function SongListLikeButton({ id, isLiked }: SongListLikeButtonProps) {
  const onLike = async () => {
    await likeASongAction(id);
  };

  return (
    <IconButton onClick={onLike} className='bg-none h-5 w-5'>
      <HeartIcon className={isLiked ? 'text-blue-500' : ''} />
    </IconButton>
  );
}
