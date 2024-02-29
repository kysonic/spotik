import HCard from '@/components/ui/cards/HCard';
import HCardSkeleton from '@/components/ui/cards/HCardSkeleton';
import SkeletonRect from '@/components/ui/content/SkeletonRect';
import ClockIcon from '@/components/ui/icons/ClockIcon';
import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';

const SONGS_TABLE_HEAD_COLUMNS = [
  '#',
  'Title',
  'Album',
  'Date Added',
  <ClockIcon key="icon" />,
];

const COLUMNS_CLASS = 'grid-cols-[50px_2fr_1fr_1fr_100px]';

export default function SongList() {
  return (
    <div className="flex flex-col gap-1">
      <TableHeader
        columns={SONGS_TABLE_HEAD_COLUMNS}
        className={COLUMNS_CLASS}
      />
      <div className="flex flex-col gap-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow
            key={index}
            columns={[
              <SkeletonRect key={index} />,
              <HCardSkeleton key={index} />,
              <SkeletonRect key={index} />,
              <SkeletonRect key={index} />,
              <SkeletonRect key={index} />,
            ]}
            className={COLUMNS_CLASS}
          />
        ))}
      </div>
    </div>
  );
}
