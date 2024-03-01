import Image from 'next/image';
import Heading from '../typography/Heading';
import Subheading from '../typography/Subheading';
import { twMerge } from 'tailwind-merge';

export type PlaylistHeroProps = {
  type: 'public' | 'private';
  title: string;
  subtitle: string;
  info?: string;
  cover?: string;
  Icon?: React.ReactNode;
  className?: string;
  imageClassName?: string;
};

export default function PlaylistHero({
  type,
  title,
  subtitle,
  cover,
  info,
  Icon,
  className,
  imageClassName,
}: PlaylistHeroProps) {
  return (
    <div
      className={twMerge(
        'flex gap-6 w-full p-4 bg-gradient-to-t from-purple-100 to-slate-100',
        className
      )}
    >
      <div
        className={twMerge(
          'rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500',
          imageClassName
        )}
      >
        {cover && (
          <Image
            className="rounded-md"
            src={cover}
            width={160}
            height={160}
            alt={title}
          />
        )}
        {Icon && (
          <div className="w-[140px] h-[140px] flex items-center justify-center">
            {Icon}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 sm:gap-2 justify-between">
        <Subheading className="text-start text-xs">{`${type} playlist`}</Subheading>
        <Heading className="text-start text-2xl sm:text-6xl">{title}</Heading>
        <Subheading className="text-start text-sm max-h-10 overflow-clip sm:max-h-auto sm:text-md">
          {subtitle}
        </Subheading>
        {info && (
          <Subheading className="text-start text-xs sm:text-sm text-bold">
            {info}
          </Subheading>
        )}
      </div>
    </div>
  );
}
