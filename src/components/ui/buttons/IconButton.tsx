export type IconButtonProps = {
  children: React.ReactNode;
  bg?: string;
};

export default function IconButton({ children, bg = 'bg-gray-200 hover:bg-gray-300' }: IconButtonProps) {
  return (
    <div role="button" className={`flex items-center justify-center w-8 h-8 rounded-full  cursor-pointer ${bg}`}>
      {children}
    </div>
  );
}
