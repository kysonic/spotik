import IconButton from '@/components/ui/buttons/IconButton';
import HCard from '@/components/ui/cards/HCard';
import HeartIcon from '@/components/ui/icons/HeartIcon';
import LibraryIcon from '@/components/ui/icons/LibraryIcon';
import PlusIcon from '@/components/ui/icons/PlusIcon';
import getLikedSongsQuery from '@/queries/songs/getLikedSongs';
import Link from 'next/link';

export default async function Library() {
  const likedSongs = await getLikedSongsQuery()();

  return (
    <div className="h-full p-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-start">
          <LibraryIcon />
          <div className="ml-2 text text-lg pt-1">Your Library</div>
        </div>
        <Link href="/create-playlist">
          <IconButton>
            <PlusIcon />
          </IconButton>
        </Link>
      </div>
      <div className="mt-4 flex flex-col gap-2">
        <Link href="/liked">
          <HCard
            title="Liked Songs"
            Icon={<HeartIcon className="text-white" />}
            subtitle={`Playlist ${likedSongs.length} songs`}
          />
        </Link>
        <HCard
          title="Kitty songs"
          cover="https://loremflickr.com/80/80"
          subtitle="Playlist 20 songs"
        />
      </div>
    </div>
  );
}
