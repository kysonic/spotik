import { twMerge } from 'tailwind-merge';

export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
  className?: string;
  hideError?: boolean;
};

export default function Input({
  type,
  placeholder,
  label,
  name,
  required,
  error,
  className,
  hideError,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="label">
          {label} {required ? '*' : ''}
        </label>
      )}
      <input
        id={name}
        name={name}
        className={twMerge('input', className)}
        type={type}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      />

      {!hideError && (
        <span role="alert" className="error static h-4">
          {error}
        </span>
      )}
    </div>
  );
}
