import getCurrentUser from '@/actions/users/getCurrentUser';
import getExternalId from '@/actions/users/getExternalId';
import SelectGenres from '@/components/features/user/genres/SelectGenres';

export default async function Home() {
  const externalId = getExternalId();
  const user = await getCurrentUser(externalId);

  return (
    <main className="h-full p-4">
      {user && !user.genres && <SelectGenres />}
    </main>
  );
}
