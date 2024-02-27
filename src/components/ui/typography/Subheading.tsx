export type SubheadingPros = {
  children: React.ReactNode;
};

export default function Subheading({ children }: SubheadingPros) {
  return (
    <h4 className="subtitle">{children}</h4>
  );
}
