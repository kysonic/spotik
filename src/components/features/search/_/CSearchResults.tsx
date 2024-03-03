import SongList from '@/components/features/songs/SongList';
import Heading from '@/components/ui/typography/Heading';
import { PlaylistNestedSongs } from '@/db/dao/Playlists';
import getBySearchQuery from '@/queries/songs/getBySearch';
import { useContext } from 'react';
import { QueryContext } from './CSearch';

export type SearchResultsProps = {
  playlist?: PlaylistNestedSongs | null;
};

export default async function SearchResults({
  playlist,
}: SearchResultsProps) {
  const { query } = useContext(QueryContext);

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
