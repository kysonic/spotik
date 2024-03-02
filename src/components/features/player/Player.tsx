import HCard from '@/components/ui/cards/HCard';
import Controls from './components/Controls';
import PlayerVolume from './components/Volume';
import getCurrentUserQuery from '@/queries/users/getCurrentUser';

export default async function Player() {
  const user = await getCurrentUserQuery()();

  return (
    <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between h-full w-full px-2">
      <div className="hidden sm:block">
        <HCard
          title={user?.song.title ? `${user?.song.title} (${user?.song.plays_count})` : ''}
          cover={user?.song.cover}
          subtitle={user?.song.album}
        />
      </div>
      <Controls />
      <div className="hidden sm:block">
        <PlayerVolume />
      </div>
    </div>
  );
}
