import IconButton from '@/components/ui/buttons/IconButton';
import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon';
import RightArrowIcon from '@/components/ui/icons/RightArrowIcon';

export default function GlobalNavigation() {
  return (
    <div className="flex gap-2 items-center">
      <IconButton>
        <LeftArrowIcon />
      </IconButton>
      <IconButton>
        <RightArrowIcon />
      </IconButton>
    </div>
  );
}
