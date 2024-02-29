import getCurrentUserAction from '@/queries/users/getCurrentUser';
import VCard from '@/components/ui/cards/VCard';
import Greeting from '@/components/ui/content/Greeting';
import NewIcon from '@/components/ui/icons/NewIcon';
import VolumeIcon from '@/components/ui/icons/VolumeIcon';
import Link from 'next/link';
import { GENRE_STYLE_CONFIG, GenreStyleConfig } from './Genre.config';

export default async function Mixes() {
  const user = await getCurrentUserAction()();

  return (
    <div className="w-full h-full">
      <Greeting />
      <div className="flex flex-wrap gap-2 items-stretch mt-4">
        <Link href="/release-radar" className="block">
          <VCard
            title="Release Radar"
            subtitle="Catch all the latest music from favorite artists, plus new singles picked for you"
            Icon={<NewIcon className="w-10 h-10 text-white" />}
          />
        </Link>
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
      </div>
    </div>
  );
}
