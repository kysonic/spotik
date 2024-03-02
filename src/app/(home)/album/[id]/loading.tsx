import SongListSkeleton from '@/components/features/songs/SongListSkeleton';
import PlaylistHeroSkeleton from '@/components/ui/hero/PlaylistHeroSkeleton';

export default async function ReleaseRadarLoading() {
  return (
    <main className="h-full">
      <PlaylistHeroSkeleton />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-gray-100 to-slate-100 pt-4">
        <SongListSkeleton />
      </div>
    </main>
  );
}
