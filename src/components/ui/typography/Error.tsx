export type ErrorProps = {
  children: React.ReactNode;
};

export default function Error({ children }: ErrorProps) {
  return (
    <h4 className="error static text-center">{children}</h4>
  );
}
