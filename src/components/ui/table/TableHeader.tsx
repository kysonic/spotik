import { twMerge } from 'tailwind-merge';

export type HeaderColumn = string | React.ReactElement;

export type TableHeaderProps = {
  className?: string;
  columns: HeaderColumn[];
};

export default function TableHeader({ className, columns }: TableHeaderProps) {
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-8 grid-cols-9
  return (
    <div className={twMerge(`grid grid-cols-${columns.length} items-center`, className)}>
      {columns.map((column, idx) => (
        <div key={idx} className="subtitle text-start text-sm px-4">{column}</div>
      ))}
    </div>
  );
}
