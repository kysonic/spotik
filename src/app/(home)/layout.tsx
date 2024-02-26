import Library from '@/components/features/library/Library';
import SearchNav from '@/components/features/navigation/search-nav/SearchNav';
import TopNav from '@/components/features/navigation/top-nav/TopNav';
import Player from '@/components/features/player/Player';
import { auth } from '@clerk/nextjs';

export type MainLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen main-layout">
      <div
        className="md:mt-2 md:mr-2 rounded-t-md bg-slate-100"
        style={{ gridArea: 'nav' }}
      >
        <TopNav />
      </div>
      <div
        className="hidden md:block mb-2 md:ml-2 md:mt-2 rounded-md bg-slate-100"
        style={{ gridArea: 'sidenav' }}
      >
        <SearchNav />
      </div>
      <div className="md:ml-2 bg-slate-100 rounded-md" style={{ gridArea: 'library' }}>
        <Library />
      </div>
      <div
        className="pb-20 md:mr-2 md:pb-2 overflow-auto bg-slate-100 rounded-b-md "
        style={{ gridArea: 'content', maxHeight: 'calc(100vh - 160px)' }}
      >
        {children}
      </div>
      <div
        className="fixed bottom-0 w-full h-[80px] bg-white"
        style={{ gridArea: 'player' }}
      >
        <Player />
      </div>
    </div>
  );
}
