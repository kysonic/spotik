import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';
import { SongsWithArtistAndAlbum } from '@/db/dao/Songs';
import { formatSongLength, formatSongReleaseDate } from '@/utils/songs';
import { COLUMNS_CLASS, SONGS_TABLE_HEAD_COLUMNS } from './SongList.config';
import getLikedSongsAction from '@/queries/songs/getLikedSongs';
import Heading from '@/components/ui/typography/Heading';
import { PlaylistNestedSongs } from '@/db/dao/Playlists';
import getCurrentUserQuery from '@/queries/users/getCurrentUser';
import NumberColumn from './columns/NumberColumn';
import SongColumn from './columns/SongColumn';
import ActionColumn from './columns/ActionColumn';

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
            smColumns={[
              <NumberColumn
                key={`number-${song.id}`}
                id={song.id}
                index={index}
              />,
              <SongColumn key={`song-${song.id}`} song={song} />,
              <div key={`album-${song.id}`} className="hidden sm:block">
                {song.album}
              </div>,
              <div key={`date-${song.id}`} className="hidden sm:block">
                {formatSongReleaseDate(song.updated_at ?? new Date())}
              </div>,
              <ActionColumn
                key={`action-${song.id}`}
                playlist={playlist}
                song={song}
                likeIds={likeIds}
              />,
              <div key={`length-${song.id}`} className="hidden sm:block">
                {formatSongLength(song.length ?? 0)}
              </div>,
            ]}
            xsColumns={[
              <NumberColumn
                key={`number-${song.id}`}
                id={song.id}
                index={index}
              />,
              <SongColumn key={`song-${song.id}`} song={song} />,
              <ActionColumn
                key={`action-${song.id}`}
                playlist={playlist}
                song={song}
                likeIds={likeIds}
              />,
            ]}
            className={COLUMNS_CLASS}
            isActive={user?.song.id === song.id}
          />
        ))}
      </div>
    </div>
  );
}
