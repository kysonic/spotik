import SongList from '@/components/features/songs/SongList';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import getAlbumWithSongsQuery from '@/queries/albums/getAlbumWithSongsQuery';
import { countPlaylistLength, formatSongLength } from '@/utils/songs';

export default async function AlbumPage({
  params,
}: {
  params: { id: string };
}) {
  const album = await getAlbumWithSongsQuery(+params.id)();

  return (
    <main className="h-full">
      <PlaylistHero
        type="public"
        title={album.title}
        subtitle={`All ${album.title} songs here`}
        info={`Songs of ${album.title} • ${
          album.songs.length
        } songs • ${formatSongLength(countPlaylistLength(album.songs))}`}
        cover={album.cover}
        imageClassName='bg-none'
      />
      <div className="h-[calc(100% - 200px)] bg-gradient-to-b from-purple-100 to-slate-100 pt-4">
        <SongList songs={album.songs} />
      </div>
    </main>
  );
}
