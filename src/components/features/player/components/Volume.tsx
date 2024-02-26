import Slider from '@/components/ui/forms/Slider';
import VolumeIcon from '@/components/ui/icons/VolumeIcon';

export default function PlayerVolume() {
  return (
    <div className="flex items-center gap-2 max-w-[280px] w-fill">
      <VolumeIcon />
      <Slider />
    </div>
  );
}
