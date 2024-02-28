import getCurrentUser from '@/actions/users/getCurrentUser';
import Mixes from '@/components/features/mixes/Mixes';
import SelectGenres from '@/components/features/user/genres/SelectGenres';
import RevalidateCurrentUser from '@/components/features/user/revalidate/RevalidateCurrentUser';

export default async function Home() {
  console.log('RUN');
  const user = await getCurrentUser()();
  console.log(user, 'DONE');

  return (
    <main className="h-full p-4">
      {user && !user.genres && <SelectGenres />}
      {user && user.genres && <Mixes />}
      {!user && <RevalidateCurrentUser />}
    </main>
  );
}
