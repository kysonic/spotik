import VolumeIcon from '@/components/ui/icons/VolumeIcon';
import getCurrentUserAction from '@/queries/users/getCurrentUser';
import VCard from '@/components/ui/cards/VCard';
import Link from 'next/link';
import { GENRE_STYLE_CONFIG, GenreStyleConfig } from '../Genre.config';

export default async function GenreMixes() {
  const user = await getCurrentUserAction()();

  return (
    <>
      {user?.genres?.map((genre) => (
        <Link
          key={genre}
          href={`/genre/${genre}`}
          className="inline-block self-stretch"
        >
          <VCard
            title={`${genre} Mix`}
            subtitle={`Catch all the ${genre} music from favorite artists, plus new singles picked for you`}
            Icon={<VolumeIcon className="w-10 h-10 text-white" />}
            className={
              GENRE_STYLE_CONFIG[genre as GenreStyleConfig]?.className ?? ''
            }
            imageClassName={
              GENRE_STYLE_CONFIG[genre as GenreStyleConfig]?.imageClassName ??
              ''
            }
          />
        </Link>
      ))}
    </>
  );
}
