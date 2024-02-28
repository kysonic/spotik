'use client';

import revalidateCurrentUser from '@/actions/users/revalidateUser';
import Button from '@/components/ui/forms/Button';

export default function RevalidateCurrentUser() {
  return (
    <form
      action={revalidateCurrentUser}
      className="flex items-center justify-center h-full"
    >
      <Button>Refresh</Button>
    </form>
  );
}
