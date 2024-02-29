import { twMerge } from 'tailwind-merge';
import { StyledIconProps } from './StyledIcon';

export default function BackwardIcon({ className }: StyledIconProps) {
  return (
    <svg
      className={twMerge('w-6 h-6 text-gray-80', className)}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M8.6 5.2A1 1 0 0 0 7 6v12a1 1 0 0 0 1.6.8l8-6a1 1 0 0 0 0-1.6l-8-6Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
