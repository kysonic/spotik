import { twMerge } from 'tailwind-merge';
import { StyledIconProps } from '../icons/StyledIcon';

export type ChipProps = {
  children: React.ReactNode;
  Icon?: React.ReactElement;
  // Icon?: (props: StyledIconProps) => React.ReactElement;
  isActive?: boolean;
  onClick?: () => void;
};

export default function Chip({ children, Icon, isActive, onClick }: ChipProps) {
  const className = twMerge(
    'inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-gray-800 bg-gray-300 rounded cursor-pointer hover:bg-gray-400 transition-colors',
    isActive ? 'bg-primary-300 hover:bg-primary-400 text-white' : ''
  );

  return (
    <span className={className} onClick={onClick}>
      {children}
      {Icon && (
        <button
          type="button"
          className="inline-flex items-center p-1 ms-2 text-sm text-gray-400 bg-transparent rounded-sm"
          aria-label="Badge"
        >
          {/* <Icon className={isActive ? 'text-white' : ''} /> */}
          <Icon.type
            {...Icon.props}
            className={twMerge(
              Icon.props.className,
              isActive ? 'text-white' : ''
            )}
          />
          <span className="sr-only">Icon badge</span>
        </button>
      )}
    </span>
  );
}
