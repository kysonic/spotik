import z from 'zod';

export const createPlaylistSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(50, 'Playlist title cannot be more than 50 symbols'),
  description: z
    .string()
    .max(200, 'Playlist title cannot be more than 200 symbols'),
});

export type CreatePlaylistSchema = z.infer<typeof createPlaylistSchema>;
