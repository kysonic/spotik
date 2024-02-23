import { z } from 'zod';

export const email = z.object({
  email: z.string().email('Email is not valid'),
});
export const password = z.object({ password: z.string().min(4) });
