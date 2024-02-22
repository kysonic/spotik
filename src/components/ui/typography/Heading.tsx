export type HeadingProps = {
  children: React.ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <h4 className="text-gray-600 mx-auto mb-2 text-2xl uppercase">{children}</h4>
  );
}
