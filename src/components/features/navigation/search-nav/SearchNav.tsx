import HomeIcon from '@/components/ui/icons/HomeIcon';
import SearchIcon from '@/components/ui/icons/SearchIcon';
import IconLink from '@/components/ui/navigation/IconLink';

export default function SearchNav() {
  return (
    <div
      className="flex flex-col items-start justify-start h-full p-6 rounded-md bg-slate-100 gap-4"
      style={{ marginBottom: '-50px' }}
    >
      <IconLink title="Home" href="/" Icon={<HomeIcon />} />
      <IconLink title="Search" href="/search" Icon={<SearchIcon />} />
    </div>
  );
}