import getCurrentUser from '@/db/commands/users/getCurrentUser';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const user = await getCurrentUser(params.id);

  return Response.json({ genres: user.genres });
}
