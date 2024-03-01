import SongListSkeleton from '@/components/features/songs/SongListSkeleton';
import SkeletonRect from '@/components/ui/content/SkeletonRect';
import PlaylistHeroSkeleton from '@/components/ui/hero/PlaylistHeroSkeleton';

export default async function PlaylistsLoading() {
  return (
    <main className="h-full">
      <PlaylistHeroSkeleton />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-gray-100 to-slate-100 pt-4">
        <SongListSkeleton length={3} />
      </div>
      <div className="w-full p-4">
        <SkeletonRect className="h-10 mb-2 w-[300px] max-w-[300px]" />
        <SkeletonRect className="h-10 mb-2 w-[520px] max-w-[520px]" />
      </div>
    </main>
  );
}
