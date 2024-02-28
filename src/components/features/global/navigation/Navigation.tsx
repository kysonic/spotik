'use client';

import { useRouter } from 'next/navigation';
import IconButton from '@/components/ui/buttons/IconButton';
import LeftArrowIcon from '@/components/ui/icons/LeftArrowIcon';
import RightArrowIcon from '@/components/ui/icons/RightArrowIcon';

export default function GlobalNavigation() {
  const router = useRouter();

  return (
    <div className="flex gap-2 items-center">
      <IconButton onClick={() => router.back()}>
        <LeftArrowIcon />
      </IconButton>
      <IconButton onClick={() => router.forward()}>
        <RightArrowIcon />
      </IconButton>
    </div>
  );
}
