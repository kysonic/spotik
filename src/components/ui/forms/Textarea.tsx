import { twMerge } from 'tailwind-merge';

export type TextareaProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label?: string;
  error?: string;
  className?: string;
};

export default function Input({
  placeholder,
  label,
  name,
  required,
  error,
  className,
  ...rest
}: TextareaProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="label">
          {label} {required ? '*' : ''}
        </label>
      )}
      <textarea
        id={name}
        name={name}
        className={twMerge('input', className)}
        placeholder={placeholder}
        required={required}
        aria-invalid={error ? 'true' : 'false'}
        {...rest}
      />
      {error && (
        <span role="alert" className="error static">
          {error}
        </span>
      )}
    </div>
  );
}
