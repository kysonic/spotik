import SongList from '@/components/features/songs/SongList';
import getBySearchQuery from '@/queries/songs/getBySearch';

export type SearchResultsProps = {
  query?: string;
};

export default async function SearchResults({ query }: SearchResultsProps) {
  if (!query) {
    return null;
  }

  const songs = await getBySearchQuery(query)();

  if (!songs.length) {
    return null;
  }

  return <SongList songs={songs} />;
}
