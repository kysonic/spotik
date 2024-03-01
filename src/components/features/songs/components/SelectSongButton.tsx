'use client';

import setCurrentSongAction from '@/actions/users/setCurrentSong';
import IconButton from '@/components/ui/buttons/IconButton';
import PlayIcon from '@/components/ui/icons/PlayIcon';

export type SelectSongButtonProps = {
  id: number;
};

export default function SelectSongButton({ id }: SelectSongButtonProps) {
  const onSelect = async () => {
    await setCurrentSongAction(id);
  };

  return (
    <IconButton onClick={onSelect} className='bg-none h-5 w-5'>
      <PlayIcon className="" />
    </IconButton>
  );
}
