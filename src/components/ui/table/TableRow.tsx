import { twMerge } from 'tailwind-merge';

export type Column = string | React.ReactElement;

export type TableRowProps = {
  className?: string;
  columns: Column[];
};

export default function TableRow({ className, columns }: TableRowProps) {
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-8 grid-cols-9
  return (
    <div className={twMerge(`grid grid-cols-${columns.length} items-center`, className)}>
      {columns.map((column, idx) => (
        <div key={idx} className="subtitle text-start text-sm px-4">{column}</div>
      ))}
    </div>
  );
}
