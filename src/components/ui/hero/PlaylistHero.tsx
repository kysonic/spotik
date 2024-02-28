import Image from 'next/image';
import Heading from '../typography/Heading';
import Subheading from '../typography/Subheading';

export type PlaylistHeroProps = {
  type: 'public' | 'private';
  title: string;
  subtitle: string;
  info: string;
  cover?: string;
  Icon?: React.ReactNode;
};

export default function PlaylistHero({
  type,
  title,
  subtitle,
  cover,
  info,
  Icon,
}: PlaylistHeroProps) {
  return (
    <div className="flex gap-6 w-full p-4 bg-gradient-to-t from-purple-100 to-slate-100">
      <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
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
      <div className="flex flex-col gap-2">
        <Subheading className='text-start text-xs'>{`${type} playlist`}</Subheading>
        <Heading className='text-start text-6xl'>{title}</Heading>
        <Subheading className='text-start'>{subtitle}</Subheading>
        <Subheading className='text-start text-sm text-bold'>{info}</Subheading>
      </div>
    </div>
  );
}
