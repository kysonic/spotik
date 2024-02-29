import SkeletonRect from '../content/SkeletonRect';

export default function PlaylistHero() {
  return (
    <div className="flex gap-6 w-full p-4 bg-gradient-to-t from-gray-100 to-slate-100">
      <div className="rounded-md bg-slate-400 animate-pulse">
        <div className="w-[140px] h-[140px] flex items-center justify-center"></div>
      </div>
      <div className="flex flex-col gap-4 w-80 h-[140px]">
        <SkeletonRect className="max-w-20" />
        <SkeletonRect className="h-20 max-w-80" />
        <SkeletonRect className="max-w-20"/>
        <SkeletonRect className="max-w-40"/>
      </div>
    </div>
  );
}
