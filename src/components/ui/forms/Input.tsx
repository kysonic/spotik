export type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  error?: string;
};

export default function Input({
  type,
  placeholder,
  label,
  name,
  required,
  error,
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
        className="input"
        type={type}
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
