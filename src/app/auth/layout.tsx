export type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0 bg-gray-50">{children}</div>;
}
