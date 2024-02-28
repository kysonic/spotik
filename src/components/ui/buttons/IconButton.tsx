import { twMerge } from 'tailwind-merge';

export type IconButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function IconButton({
  children,
  className = 'bg-gray-200 hover:bg-gray-300',
  onClick,
}: IconButtonProps) {
  return (
    <div
      role="button"
      className={twMerge(
        'flex items-center justify-center w-8 h-8 rounded-full cursor-pointer transition-colors',
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
