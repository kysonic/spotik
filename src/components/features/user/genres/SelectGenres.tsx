import Heading from '@/components/ui/typography/Heading';
import Subheading from '@/components/ui/typography/Subheading';
import getGenres from '@/queries/songs/getGenres';
import VolumeIcon from '@/components/ui/icons/VolumeIcon';
import GenreSelector from './components/GenreSelector';
import { StyledIconProps } from '@/components/ui/icons/StyledIcon';

export default async function SelectGenres() {
  const data = await getGenres();
  // const CVolumeIcon = (props: StyledIconProps) => <VolumeIcon {...props} />

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col gap-2">
        <Heading>Welcome to the Spotik!</Heading>
        <Subheading>Please, select genres you are addicted in</Subheading>
      </div>
      <GenreSelector genres={data} Icon={<VolumeIcon />} />
    </div>
  );
}
