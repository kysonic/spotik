'use server';

import { revalidatePath } from 'next/cache';

const revalidateCurrentUser = async () => {
  revalidatePath('/');
};

export default revalidateCurrentUser;
