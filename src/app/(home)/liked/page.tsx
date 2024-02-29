import SongList from '@/components/features/songs/SongList';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import getCurrentUser from '@/queries/users/getCurrentUser';
import { getUserName } from '@/utils/user';
import { countPlaylistLength, formatSongLength } from '@/utils/songs';
import getLikedSongsQuery from '@/queries/songs/getLikedSongs';
import HeartIcon from '@/components/ui/icons/HeartIcon';

export default async function ReleaseRadar() {
  const user = await getCurrentUser()();
  const liked = await getLikedSongsQuery()();

  return (
    <main className="h-full">
      <PlaylistHero
        type="public"
        title="Liked songs"
        subtitle="Playlist contains all your liked songs"
        info={`Made for ${getUserName(user!)} • ${
          liked.length
        } songs • ${formatSongLength(countPlaylistLength(liked))}`}
        Icon={<HeartIcon className="w-10 h-10 text-white" />}
        className='from-indigo-100'
      />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-indigo-100 to-slate-100 pt-4">
        {!!liked.length && <SongList songs={liked} />}
        {!liked.length && <div className="mt-4 h-full flex items-center justify-center text-4xl text-bold">Nothing here yet...</div>}
      </div>
    </main>
  );
}
