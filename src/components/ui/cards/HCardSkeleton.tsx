import SkeletonRect from '../content/SkeletonRect';

export default function HCardSkeleton() {
  return (
    <div className="flex gap-1 justify-start items-center">
      <div className="rounded-md bg-slate-400 animate-pulse ">
        <div className="w-10 h-10 flex items-center justify-center"></div>
      </div>
      <div className="flex flex-col justify-center items-start ml-2 w-20 h-full gap-2">
        <SkeletonRect className='max-w-20' />
        <SkeletonRect />
      </div>
    </div>
  );
}
