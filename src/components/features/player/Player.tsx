'use client';

import HCard from '@/components/ui/cards/HCard';
import Controls from './components/Controls';
import PlayerVolume from './components/Volume';

export default function Player() {
  return (
    <div className="flex flex-col justify-center items-center sm:flex-row sm:justify-between h-full w-full px-2">
      <div className="hidden sm:block">
        <HCard
          title="Current song"
          cover="https://loremflickr.com/80/80"
          subtitle="Album"
        />
      </div>
      <Controls />
      <div className="hidden sm:block">
        <PlayerVolume />
      </div>
    </div>
  );
}
