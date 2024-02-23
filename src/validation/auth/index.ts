import { z } from 'zod';
import { email, password } from '@/validation/common';

// Sign Up
export const signUpSchema = z.object({}).merge(email).merge(password);
export type SignUpSchema = z.infer<typeof signUpSchema>;

// Code
export const signUpCodeSchema = z.object({
  code: z.string().min(6),
});
export type SignUpCodeSchema = z.infer<typeof signUpCodeSchema>;

// Sign in
export const signInSchema = z.object({}).merge(email).merge(password);
export type SignInSchema = z.infer<typeof signInSchema>;
