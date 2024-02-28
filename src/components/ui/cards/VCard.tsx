import Image from 'next/image';

export type VCardProps = {
  title: string;
  cover?: string;
  Icon?: React.ReactNode;
  subtitle?: string;
};
export default function VCard({ cover, title, Icon, subtitle }: VCardProps) {
  return (
    <div className="flex flex-col justify-start items-center p-4 bg-purple-800 bg-opacity-10 rounded-md max-w-[160px] hover:bg-opacity-20 transition-opacity">
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
      <div className="flex flex-col justify-center items-start mt-2">
        <div className="text-md text-ellipsis text-gray-800">{title}</div>
        {subtitle && (
          <div className="text-xs text-ellipsis text-gray-600">{subtitle}</div>
        )}
      </div>
    </div>
  );
}
