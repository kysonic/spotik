import getArtistsForUserQuery from '@/queries/artists/getArtistsForUserQuery';
import VCard from '@/components/ui/cards/VCard';
import Link from 'next/link';

export default async function ArtistMixes() {
  const artists = await getArtistsForUserQuery()();

  return (
    <div className="flex flex-wrap gap-2 items-stretch mt-4">
      {artists?.map((artist) => (
        <Link
          key={artist.id}
          href={`/artist/${artist.id}`}
          className="inline-block self-stretch"
        >
          <VCard
            title={`${artist.nickname} Mix`}
            subtitle={artist.about}
            cover={artist.cover}
          />
        </Link>
      ))}
    </div>
  );
}
