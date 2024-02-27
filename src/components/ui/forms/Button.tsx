'use client';

import Loader from '@/components/ui/progress/Loader';
import { useFormStatus } from 'react-dom';

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  isLoading?: boolean;
};

export default function Button({
  children,
  type = 'submit',
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      className="btn btn-primary"
      disabled={disabled || isLoading || pending}
      type={type}
      {...props}
    >
      {isLoading ? <Loader /> : children}
    </button>
  );
}
