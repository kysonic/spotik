import VCard from '@/components/ui/cards/VCard';
import Greeting from '@/components/ui/content/Greeting';
import NewIcon from '@/components/ui/icons/NewIcon';
import Link from 'next/link';

export default function Mixes() {
  return (
    <div className="w-full h-full">
      <Greeting />
      <div className="mt-4">
        <Link href="/release-radar" className="inline-block">
          <VCard
            title="Release Radar"
            subtitle="Catch all the latest music from favorite artists, plus new singles picked for you"
            Icon={<NewIcon className="w-10 h-10 text-white" />}
          />
        </Link>
      </div>
    </div>
  );
}
