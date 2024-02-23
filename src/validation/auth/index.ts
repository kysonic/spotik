import { z } from 'zod';

export const signUpSchema = z.object({
  email: z.string().email('Email is not valid'),
  password: z.string().min(4),
});

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const signUpCodeSchema = z.object({
  code: z.string().min(6),
});

export type SignUpCodeSchema = z.infer<typeof signUpCodeSchema>;
