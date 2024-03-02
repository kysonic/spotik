import { twMerge } from 'tailwind-merge';

export type Column = string | React.ReactElement;

export type TableRowProps = {
  className?: string;
  columns: Column[];
  isActive?: boolean;
};

export default function TableRow({ className, columns, isActive }: TableRowProps) {
  // grid-cols-1 grid-cols-2 grid-cols-3 grid-cols-4 grid-cols-5 grid-cols-6 grid-cols-7 grid-cols-8 grid-cols-8 grid-cols-9
  return (
    <div className={twMerge(`grid grid-cols-${columns.length} items-center relative`, className)}>
      {isActive && <div className='blur-sm w-full h-full absolute top-0 left-0 z-0 bg-slate-200 sepia opacity-50'></div>}
      {columns.map((column, idx) => (
        <div key={idx} className="subtitle text-start text-sm px-4 z-10">{column}</div>
      ))}
    </div>
  );
}
