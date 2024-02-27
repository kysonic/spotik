import z from 'zod';

export const saveUserGenresSchema = z.object({
  genres: z.array(z.string()),
});

export type SaveUserGenresSchema = z.infer<typeof saveUserGenresSchema>;
