import IconButton from '@/components/ui/buttons/IconButton';
import HCard from '@/components/ui/cards/HCard';
import HeartIcon from '@/components/ui/icons/HeartIcon';
import LibraryIcon from '@/components/ui/icons/LibraryIcon';
import PlusIcon from '@/components/ui/icons/PlusIcon';

export default function Library() {
  return (
    <div className="h-full bg-slate-100 rounded-md p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start">
          <LibraryIcon />
          <div className="ml-2 text text-lg pt-1">Your Library</div>
        </div>
        <IconButton>
          <PlusIcon />
        </IconButton>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <HCard
          title="Liked Songs"
          Icon={<HeartIcon />}
          subtitle="Playlist 100 songs"
        />
        <HCard
          title="Kitty songs"
          cover="https://loremflickr.com/80/80"
          subtitle="Playlist 20 songs"
        />
      </div>
    </div>
  );
}
