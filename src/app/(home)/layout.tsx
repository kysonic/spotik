export type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen main-layout">
      <div className="bg-slate-500 min-h-96" style={{ gridArea: 'nav' }}></div>
      <div className="bg-green-500 min-h-96 hidden md:block" style={{ gridArea: 'sidenav' }}></div>
      <div className="bg-neutral-500 min-h-96" style={{ gridArea: 'content' }}>{children}</div>
      <div className="bg-yellow-500 min-h-96" style={{ gridArea: 'library' }}></div>
      <div className="bg-red-500 min-h-96" style={{ gridArea: 'player' }}></div>
    </div>
  );
}
