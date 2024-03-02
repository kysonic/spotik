import getGenres from '@/db/commands/songs/getGenres';

export async function GET(request: Request) {
  const genres = await getGenres();

  return Response.json({ genres });
}
