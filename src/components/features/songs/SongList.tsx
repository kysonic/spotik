import HCard from '@/components/ui/cards/HCard';
import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';
import { ReleaseSongs } from '@/db/dao/Songs';
import { formatSongLength, formatSongReleaseDate } from '@/utils/songs';
import { COLUMNS_CLASS, SONGS_TABLE_HEAD_COLUMNS } from './SongList.config';

export type SongListProps = {
  songs: ReleaseSongs;
};

export default function SongList({ songs = [] }: SongListProps) {
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
                key={song.id}
                title={song.title}
                cover={song.cover}
                subtitle={song.artist}
              />,
              <div key={song.id} className="hidden sm:block">
                {song.album}
              </div>,
              <div key={song.id} className="hidden sm:block">
                {formatSongReleaseDate(song.updated_at ?? new Date())}
              </div>,
              <div key={song.id} className="hidden sm:block">
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
