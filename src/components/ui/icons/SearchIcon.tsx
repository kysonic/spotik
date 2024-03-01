import { twMerge } from 'tailwind-merge';
import { StyledIconProps } from './StyledIcon';

export default function HomeIcon({ className }: StyledIconProps) {
  return (
    <svg
      className={twMerge('w-6 h-6 text-gray-800', className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 3v4c0 .6-.4 1-1 1H5m8 7.5 2.5 2.5M19 4v16c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V8c0-.4.1-.6.3-.8l4-4 .6-.2H18c.6 0 1 .4 1 1Zm-5 9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      />
    </svg>
  );
}
