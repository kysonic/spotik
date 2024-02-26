export type IconButtonProps = {
  children: React.ReactNode;
};

export default function IconButton({ children }: IconButtonProps) {
  return (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 cursor-pointer hover:bg-gray-300">
      {children}
    </div>
  );
}
