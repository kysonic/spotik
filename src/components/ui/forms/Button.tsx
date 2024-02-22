export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({ children, type = 'submit' }: ButtonProps) {
  return (
    <button
      className="mt-2 mx-auto rounded w-[100px] h-[40px] xs:w-full bg-blue-300 uppercase text-white hover:bg-blue-400"
      type={type}
    >
      {children}
    </button>
  );
}
