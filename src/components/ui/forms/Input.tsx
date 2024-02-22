export type InputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function Input({ type, placeholder, ...rest }: InputProps) {
  return (
    <input
      className="rounded-md p-2 bg-transparent border-gray-400 border text-gray-500"
      type={type}
      placeholder={placeholder}
      {...rest}
    />
  );
}
