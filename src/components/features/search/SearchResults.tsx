import SongList from '@/components/features/songs/SongList';
import { PlaylistNestedSongs } from '@/db/dao/Playlists';
import getBySearchQuery from '@/queries/songs/getBySearch';

export type SearchResultsProps = {
  query?: string;
  playlist?: PlaylistNestedSongs | null;
};

export default async function SearchResults({ query, playlist }: SearchResultsProps) {
  if (!query) {
    return null;
  }

  const songs = await getBySearchQuery(query)();

  if (!songs.length) {
    return null;
  }

  return <SongList songs={songs} playlist={playlist} />;
}
