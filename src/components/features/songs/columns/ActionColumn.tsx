import { SongWithArtistAndAlbum } from '@/db/dao/Songs';
import SongListAddToPlaylist from '../components/SongListAddToPlaylist';
import SongListLikeButton from '../components/SongListLikeButton';
import { PlaylistNestedSongs } from '@/db/dao/Playlists';

export type ActionColumnProps = {
  playlist?: PlaylistNestedSongs | null;
  song: SongWithArtistAndAlbum;
  likeIds: number[];
};

export default function ActionColumn({
  playlist,
  song,
  likeIds,
}: ActionColumnProps) {
  return playlist ? (
    <SongListAddToPlaylist
      key={`add-to-pl-${song.id}`}
      songId={song.id}
      playlistId={playlist?.id}
      isAdded={Boolean(
        playlist?.songs.find((playlistSong) => playlistSong.id === song.id)
      )}
    />
  ) : (
    <SongListLikeButton
      key={`like-${song.id}`}
      id={song.id}
      isLiked={likeIds.includes(song.id)}
    />
  );
}
