'use client';

import addToPlaylist from '@/actions/playlists/addToPlaylist';
import IconButton from '@/components/ui/buttons/IconButton';
import PlusIcon from '@/components/ui/icons/PlusIcon';
import MinusIcon from '@/components/ui/icons/MinusIcon';

export type SongListLikeButtonProps = {
  songId: number;
  playlistId: number;
  isAdded: boolean;
};

export default function SongListLikeButton({
  songId,
  playlistId,
  isAdded,
}: SongListLikeButtonProps) {
  const onPlaylistAdd = async () => {
    await addToPlaylist(playlistId, songId);
  };

  return (
    <IconButton onClick={onPlaylistAdd} className="bg-none h-5 w-5">
      <div className="flex items-center gap-1">
        {isAdded ? (
          <>
            <MinusIcon /> Remove
          </>
        ) : (
          <>
            <PlusIcon /> Add
          </>
        )}
      </div>
    </IconButton>
  );
}
