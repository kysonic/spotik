import { Suspense } from 'react';
import SongList from '@/components/features/songs/SongList';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import PlayIcon from '@/components/ui/icons/PlayIcon';
import { countPlaylistLength, formatSongLength } from '@/utils/songs';
import getPlaylistByIdQuery from '@/queries/playlists/getPlaylistById';
import getCurrentUserAction from '@/queries/users/getCurrentUser';
import { getUserName } from '@/utils/user';
import Search from '@/components/features/search/Search';
import SearchResults from '@/components/features/search/SearchResults';
import SongListSkeleton from '@/components/features/songs/SongListSkeleton';
import Heading from '@/components/ui/typography/Heading';

export default async function PlaylistPage({
  searchParams,
  params,
}: {
  searchParams: { query: string };
  params: { id: string };
}) {
  // If we gonna make playlist public we have to find playlist user (cold be joined in query)
  const user = await getCurrentUserAction()();
  const playlist = await getPlaylistByIdQuery(+params.id)();

  return (
    <main className="h-full">
      <PlaylistHero
        type="private"
        title={playlist?.title ?? ''}
        subtitle={playlist?.description ?? ''}
        info={`Hand crafted by  ${getUserName(user!)}  • ${
          playlist?.songs.length ?? 0
        } • ${formatSongLength(countPlaylistLength(playlist?.songs ?? []))}`}
        Icon={<PlayIcon className="w-16 h-16 text-white" />}
      />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-purple-100 to-slate-100 pt-4">
        <SongList songs={playlist?.songs ?? []} />
      </div>
      <Heading className='text-start pt-4 pl-4'>Search new songs to add to the &quot;{playlist?.title}&quot; playlist</Heading>
      <Search />
      <Suspense fallback={<SongListSkeleton />}>
        <SearchResults playlist={playlist} query={searchParams.query} />
      </Suspense>
    </main>
  );
}
