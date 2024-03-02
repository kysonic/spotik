import SongList from '@/components/features/songs/SongList';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import Link from 'next/link';
import VCard from '@/components/ui/cards/VCard';
import Heading from '@/components/ui/typography/Heading';
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
        <div className="mt-4 p-4">
          <Heading className='text-start'>{artist.nickname} Albums</Heading>
          <div className="mt-2 flex flex-wrap gap-2 items-stretch">
            {artist.albums?.map((album) => (
              <Link
                key={artist.id}
                href={`/album/${album.id}`}
                className="inline-block self-stretch"
              >
                <VCard
                  title={`${album.title} Songs`}
                  subtitle="All songs for this album"
                  cover={album.cover}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
