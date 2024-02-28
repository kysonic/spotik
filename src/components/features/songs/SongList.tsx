import HCard from '@/components/ui/cards/HCard';
import ClockIcon from '@/components/ui/icons/ClockIcon';
import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';
import { ReleaseSongs } from '@/db/dao/Songs';
import { formatSongLength, formatSongReleaseDate } from '@/utils/songs';

const SONGS_TABLE_HEAD_COLUMNS = [
  '#',
  'Title',
  'Album',
  'Date Added',
  <ClockIcon key="icon" />,
];

const COLUMNS_CLASS = 'grid-cols-[50px_2fr_1fr_1fr_100px]';

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
              song.album,
              formatSongReleaseDate(song.updated_at ?? new Date()),
              formatSongLength(song.length ?? 0),
            ]}
            className={COLUMNS_CLASS}
          />
        ))}
      </div>
    </div>
  );
}
