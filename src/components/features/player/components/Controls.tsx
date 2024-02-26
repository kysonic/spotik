import IconButton from '@/components/ui/buttons/IconButton';
import BackwardIcon from '@/components/ui/icons/BackwardIcon';
import ForwardIcon from '@/components/ui/icons/ForwardIcon';
import PlayIcon from '@/components/ui/icons/PlayIcon';
import ProgressBar from '@/components/ui/progress/Progress';

export default function PlayerControls() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[320px]">
      <div className="flex gap-4 items-center justify-center">
        <IconButton bg="bg-transparent">
          <BackwardIcon />
        </IconButton>
        <IconButton>
          <PlayIcon />
        </IconButton>
        <IconButton bg="bg-transparent">
          <ForwardIcon />
        </IconButton>
      </div>
      <ProgressBar progress={10} />
    </div>
  );
}
