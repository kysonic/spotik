import HCard from '@/components/ui/cards/HCard';
import HCardSkeleton from '@/components/ui/cards/HCardSkeleton';
import SkeletonRect from '@/components/ui/content/SkeletonRect';
import ClockIcon from '@/components/ui/icons/ClockIcon';
import TableHeader from '@/components/ui/table/TableHeader';
import TableRow from '@/components/ui/table/TableRow';
import { COLUMNS_CLASS, SONGS_TABLE_HEAD_COLUMNS } from './SongList.config';

export type SongListSkeleton = {
  length?: number;
};

export default function SongListSkeleton({ length = 10 }: SongListSkeleton) {
  return (
    <div className="flex flex-col gap-1">
      <TableHeader
        columns={SONGS_TABLE_HEAD_COLUMNS}
        className={COLUMNS_CLASS}
      />
      <div className="flex flex-col gap-2">
        {Array.from({ length }).map((_, index) => (
          <TableRow
            key={index}
            columns={[
              <SkeletonRect key={index} />,
              <HCardSkeleton key={index} />,
              <SkeletonRect className="hidden sm:block" key={index} />,
              <SkeletonRect className="hidden sm:block" key={index} />,
              <SkeletonRect className="hidden sm:block" key={index} />,
            ]}
            className={COLUMNS_CLASS}
          />
        ))}
      </div>
    </div>
  );
}
