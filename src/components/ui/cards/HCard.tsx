import Image from 'next/image';

export type HCardProps = {
  title: string;
  cover?: string;
  Icon?: React.ReactNode;
  subtitle?: string;
};
export default function HCard({ cover, title, Icon, subtitle }: HCardProps) {
  return (
    <div className="flex gap-1 justify-start items-center">
      <div className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        {cover && (
          <Image
            className="rounded-md"
            src={cover}
            width={40}
            height={40}
            alt={title}
          />
        )}
        {Icon && (
          <div className="w-10 h-10 flex items-center justify-center">
            {Icon}
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-start ml-2">
        <div className="text-md text-ellipsis text-gray-800">{title}</div>
        {subtitle && (
          <div className="text-xs text-ellipsis text-gray-600">{subtitle}</div>
        )}
      </div>
    </div>
  );
}
