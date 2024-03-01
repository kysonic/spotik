
import VCard from '@/components/ui/cards/VCard';
import Greeting from '@/components/ui/content/Greeting';
import NewIcon from '@/components/ui/icons/NewIcon';
import Link from 'next/link';
import GenreMixes from './components/GenreMixes';
import ArtistMixes from './components/ArtistMixes';
import Heading from '@/components/ui/typography/Heading';

export default async function Mixes() {
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
        <GenreMixes />
      </div>
      <Heading className="text-start pt-4">Artists for you</Heading>
      <ArtistMixes />
    </div>
  );
}
