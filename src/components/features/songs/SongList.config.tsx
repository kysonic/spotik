import ClockIcon from '@/components/ui/icons/ClockIcon';

export const SONGS_TABLE_HEAD_COLUMNS = [
  '#',
  'Title',
  <span key="album" className="hidden sm:block">
    Album
  </span>,
  <span key="date" className="hidden sm:block">
    Date Added
  </span>,
  <span key="like">
    
  </span>,
  <span key="icon" className="hidden sm:block">
    <ClockIcon />
  </span>,
];

export const COLUMNS_CLASS =
  'md:grid-cols-[50px_2fr_1fr_1fr_100px_100px] grid-cols-[50px_1fr_100px] group cursor-pointer rounded-md';
