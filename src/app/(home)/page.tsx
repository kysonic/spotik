import getCurrentUser from '@/queries/users/getCurrentUser';
import Mixes from '@/components/features/mixes/Mixes';
import SelectGenres from '@/components/features/user/genres/SelectGenres';

export default async function Home() {
  const user = await getCurrentUser()();
  
  return (
    <main className="h-full p-4">
      {user && !user.genres && <SelectGenres />}
      {user && user.genres && <Mixes />}
    </main>
  );
}
