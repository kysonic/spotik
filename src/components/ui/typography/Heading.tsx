export type HeadingProps = {
  children: React.ReactNode;
};

export default function Heading({ children }: HeadingProps) {
  return (
    <h4 className="title">{children}</h4>
  );
}
