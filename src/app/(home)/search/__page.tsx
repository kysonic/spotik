import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import SearchIcon from '@/components/ui/icons/SearchIcon';
import Search from '@/components/features/search/_/CSearch';
import SearchResults from '@/components/features/search/_/CSearchResults';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  return (
    <main className="h-full">
      <PlaylistHero
        type="public"
        title="Search"
        subtitle="Search for new super songs and artists"
        Icon={<SearchIcon className="w-10 h-10 text-white" />}
        className="from-slate-100"
      />
      <Search>
        <SearchResults />
      </Search>
    </main>
  );
}
