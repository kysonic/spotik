import Heading from '@/components/ui/typography/Heading';
import { UserButton } from '@clerk/nextjs';

export default function Home() {
  return (
    <main>
      <Heading>Hello FROM Spotik</Heading>
      <UserButton />
    </main>
  );
}
