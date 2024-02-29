import SongList from '@/components/features/songs/SongList';
import PlaylistHero from '@/components/ui/hero/PlaylistHero';
import getCurrentUser from '@/actions/users/getCurrentUser';
import { getUserName } from '@/utils/user';
import { countPlaylistLength, formatSongLength } from '@/utils/songs';
import VolumeIcon from '@/components/ui/icons/VolumeIcon';
import { twMerge } from 'tailwind-merge';
import {
  GENRE_STYLE_CONFIG,
  GenreStyleConfig,
} from '@/components/features/mixes/Genre.config';
import getByGenreAction from '@/actions/songs/getByGenre';

export default async function GenrePage({
  params,
}: {
  params: { genre: string };
}) {
  const user = await getCurrentUser()();
  const releases = await getByGenreAction(params.genre)();

  const genreStyleConfig = GENRE_STYLE_CONFIG[params.genre as GenreStyleConfig];

  return (
    <main className="h-full">
      <PlaylistHero
        type="public"
        title={`${params.genre} Mix`}
        subtitle={`Catch all the latest music from artists you follow, ${params.genre} genres`}
        info={`Made for ${getUserName(user!)} • ${
          releases.length
        } songs • ${formatSongLength(countPlaylistLength(releases))}`}
        Icon={<VolumeIcon className="w-10 h-10 text-white" />}
        className={genreStyleConfig.bg}
        imageClassName={genreStyleConfig.imageClassName}
      />
      <div
        className={twMerge(
          'h-[calc(100% - 200px)] bg-gradient-to-b from-purple-100 to-slate-100 pt-4',
          genreStyleConfig.bg
        )}
      >
        <SongList songs={releases} />
      </div>
    </main>
  );
}
