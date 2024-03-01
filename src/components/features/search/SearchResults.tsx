import SongList from '@/components/features/songs/SongList';
import Heading from '@/components/ui/typography/Heading';
import { PlaylistNestedSongs } from '@/db/dao/Playlists';
import getBySearchQuery from '@/queries/songs/getBySearch';

export type SearchResultsProps = {
  query?: string;
  playlist?: PlaylistNestedSongs | null;
};

export default async function SearchResults({
  query,
  playlist,
}: SearchResultsProps) {
  if (!query) {
    return null;
  }

  const songs = await getBySearchQuery(query)();

  if (!songs.length) {
    if (query) {
      return (
        <div className="flex items-center justify-center p-10">
          <Heading>Nothing found...</Heading>
        </div>
      );
    }

    return null;
  }

  return <SongList songs={songs} playlist={playlist} />;
}
