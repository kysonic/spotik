import { twMerge } from 'tailwind-merge';

export type SkeletonRectProps = {
  className?: string;
};

export default function SkeletonRect({ className }: SkeletonRectProps) {
  return (
    <div
      className={twMerge(
        'h-2 w-full max-w-10 bg-slate-400 rounded-md animate-pulse',
        className
      )}
    ></div>
  );
}
