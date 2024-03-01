import HCard from '@/components/ui/cards/HCard';
import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';
import { SongsWithArtistAndAlbum } from '@/db/dao/Songs';
import { formatSongLength, formatSongReleaseDate } from '@/utils/songs';
import { COLUMNS_CLASS, SONGS_TABLE_HEAD_COLUMNS } from './SongList.config';
import SongListLikeButton from './components/SongListLikeButton';
import SongListAddToPlaylist from './components/SongListAddToPlaylist';
import SelectSongButton from './components/SelectSongButton';
import getLikedSongsAction from '@/queries/songs/getLikedSongs';
import Heading from '@/components/ui/typography/Heading';
import { PlaylistNestedSongs } from '@/db/dao/Playlists';
import getCurrentUserQuery from '@/queries/users/getCurrentUser';

export type SongListProps = {
  songs: SongsWithArtistAndAlbum;
  playlist?: PlaylistNestedSongs | null;
};

export default async function SongList({
  songs = [],
  playlist,
}: SongListProps) {
  const user = await getCurrentUserQuery()();
  const likes = await getLikedSongsAction()();

  const likeIds = likes.map((like) => like.song_id);

  return (
    <div className="flex flex-col gap-1">
      <TableHeader
        columns={SONGS_TABLE_HEAD_COLUMNS}
        className={COLUMNS_CLASS}
      />
      <div className="flex flex-col gap-2">
        {!songs.length && (
          <div className="flex items-center justify-center p-10">
            <Heading>Nothing here yet...</Heading>
          </div>
        )}
        {songs.map((song, index) => (
          <TableRow
            key={song.id}
            columns={[
              <div key={`id-${song.id}`}>
                <div className="block group-hover:hidden">
                  {(index + 1).toString()}
                </div>
                <div className="hidden group-hover:block">
                  <SelectSongButton key={`select-${song.id}`} id={song.id} />
                </div>
              </div>,
              <HCard
                className="hover:bg-transparent"
                key={`song-${song.id}`}
                title={song.title}
                cover={song.cover}
                subtitle={song.artist}
              />,
              <div key={`album-${song.id}`} className="hidden sm:block">
                {song.album}
              </div>,
              <div key={`date-${song.id}`} className="hidden sm:block">
                {formatSongReleaseDate(song.updated_at ?? new Date())}
              </div>,
              playlist ? (
                <SongListAddToPlaylist
                  key={`add-to-pl-${song.id}`}
                  songId={song.id}
                  playlistId={playlist?.id}
                  isAdded={Boolean(
                    playlist?.songs.find(
                      (playlistSong) => playlistSong.id === song.id
                    )
                  )}
                />
              ) : (
                <SongListLikeButton
                  key={`like-${song.id}`}
                  id={song.id}
                  isLiked={likeIds.includes(song.id)}
                />
              ),
              <div key={`length-${song.id}`} className="hidden sm:block">
                {formatSongLength(song.length ?? 0)}
              </div>,
            ]}
            className={`${COLUMNS_CLASS} ${
              user?.song.id === song.id ? 'bg-red-100' : ''
            }`}
          />
        ))}
      </div>
    </div>
  );
}
