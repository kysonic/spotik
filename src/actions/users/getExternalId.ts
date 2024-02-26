import { auth } from '@clerk/nextjs';

export default function getExternalId() {
  const { userId, sessionClaims } = auth();

  if (userId && !sessionClaims?.externalId) {
    throw new Error('Cannot find user external id...');
  }

  return sessionClaims?.externalId as number;
}
