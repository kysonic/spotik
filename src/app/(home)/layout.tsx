import SearchNav from "@/components/features/navigation/search-nav/SearchNav";
import TopNav from "@/components/features/navigation/top-nav/TopNav";

export type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen main-layout p-0 sm:p-2">
      <div style={{ gridArea: 'nav' }}><TopNav /></div>
      <div className="hidden md:block mb-2" style={{ gridArea: 'sidenav' }}><SearchNav /></div>
      <div className="bg-neutral-500 min-h-96 md:min-h-0" style={{ gridArea: 'content' }}>{children}</div>
      <div className="bg-yellow-500 min-h-96 md:min-h-0" style={{ gridArea: 'library' }}></div>
      <div className="bg-red-500 min-h-96 md:min-h-0" style={{ gridArea: 'player' }}></div>
    </div>
  );
}
