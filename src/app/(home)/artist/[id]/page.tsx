import SongList from '@/components/features/songs/SongList';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import NewIcon from '@/components/ui/icons/NewIcon';
import getArtistWithAlbumsAndSongsQuery from '@/queries/artists/getArtistWithAlbumsAndSongsQuery';
import { countPlaylistLength, formatSongLength } from '@/utils/songs';

export default async function ArtistPage({
  params,
}: {
  params: { id: string };
}) {
  const artist = await getArtistWithAlbumsAndSongsQuery(+params.id)();

  return (
    <main className="h-full">
      <PlaylistHero
        type="public"
        title={`${artist.nickname} Mix`}
        subtitle={artist.about ?? ''}
        info={`Songs of ${artist.nickname} • ${
          artist.songs.length
        } songs • ${formatSongLength(countPlaylistLength(artist.songs))}`}
        cover={artist.cover}
      />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-purple-100 to-slate-100 pt-4">
        <SongList songs={artist.songs} />
      </div>
    </main>
  );
}
