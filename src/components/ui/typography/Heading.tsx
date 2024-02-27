import { twMerge } from 'tailwind-merge';

export type HeadingProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Heading({ children, className }: HeadingProps) {
  return <h4 className={twMerge('title', className)}>{children}</h4>;
}
