import { Suspense } from 'react';
import SongList from '@/components/features/songs/SongList';
import SongListSkeleton from '@/components/features/songs/SongListSkeleton';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import NewIcon from '@/components/ui/icons/NewIcon';
import getReleases from '@/actions/songs/getReleases';
import getCurrentUser from '@/actions/users/getCurrentUser';
import { getUserName } from '@/utils/user';
import { countPlaylistLength, formatSongLength } from '@/utils/songs';

export default async function ReleaseRadar() {
  const user = await getCurrentUser()();
  const releases = await getReleases()();

  return (
    <main className="h-full">
      <PlaylistHero
        type="public"
        title="Release Radar"
        subtitle="Catch all the latest music from artists you follow, your favorite genres"
        info={`Made for ${getUserName(user!)} • ${
          releases.length
        } songs • ${formatSongLength(countPlaylistLength(releases))}`}
        Icon={<NewIcon className="w-10 h-10 text-white" />}
      />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-purple-100 to-slate-100 pt-4">
        <SongList songs={releases} />
      </div>
    </main>
  );
}
