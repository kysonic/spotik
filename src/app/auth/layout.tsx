export type AuthLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="flex justify-center items-center min-w-full min-h-screen bg-gray-100">{children}</div>;
}
