import HCard from '@/components/ui/cards/HCard';
import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';
import { SongsWithArtistAndAlbum } from '@/db/dao/Songs';
import { formatSongLength, formatSongReleaseDate } from '@/utils/songs';
import { COLUMNS_CLASS, SONGS_TABLE_HEAD_COLUMNS } from './SongList.config';
import SongListLikeButton from './components/SongListLikeButton';
import getLikedSongsAction from '@/queries/songs/getLikedSongs';

export type SongListProps = {
  songs: SongsWithArtistAndAlbum;
};

export default async function SongList({ songs = [] }: SongListProps) {
  const likes = await getLikedSongsAction()();

  const likeIds = likes.map((like) => like.song_id);

  return (
    <div className="flex flex-col gap-1">
      <TableHeader
        columns={SONGS_TABLE_HEAD_COLUMNS}
        className={COLUMNS_CLASS}
      />
      <div className="flex flex-col gap-2">
        {songs.map((song, index) => (
          <TableRow
            key={song.id}
            columns={[
              (index + 1).toString(),
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
              <SongListLikeButton
                key={`like-${song.id}`}
                id={song.id}
                isLiked={likeIds.includes(song.id)}
              />,
              <div key={`length-${song.id}`} className="hidden sm:block">
                {formatSongLength(song.length ?? 0)}
              </div>,
            ]}
            className={COLUMNS_CLASS}
          />
        ))}
      </div>
    </div>
  );
}
