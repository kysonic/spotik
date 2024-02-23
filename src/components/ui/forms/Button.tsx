import Loader from '@/components/ui/progress/Loader';

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
  return (
    <button className="btn btn-primary" disabled={disabled || isLoading} type={type} {...props}>
      {isLoading ? <Loader /> : children}
    </button>
  );
}
