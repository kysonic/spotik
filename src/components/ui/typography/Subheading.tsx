import { twMerge } from 'tailwind-merge';

export type SubheadingPros = {
  children: React.ReactNode;
  className?: string;
};

export default function Subheading({ children, className }: SubheadingPros) {
  return <h4 className={twMerge('subtitle', className)}>{children}</h4>;
}
