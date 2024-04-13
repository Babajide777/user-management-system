import { z } from "zod";

export const validateAddUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  broughtBy: z.string().length(24).optional(),
  supervisor: z.string().length(24).optional(),
  street: z.string(),
  city: z.string(),
  iban: z.number().int().gte(1000000000).lte(9999999999),
});

export const validateEditUser = z.object({
  id: z.number().int().positive(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  broughtBy: z.string().length(24).optional(),
  supervisor: z.string().length(24).optional(),
  street: z.string(),
  city: z.string(),
  iban: z.number().int().gte(1000000000).lte(9999999999),
});

export const validateLoginUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const validateCreateUser = z.object({
  firstName: z.string().min(3),
  lastName: z.string().min(3),
  email: z.string().email(),
  broughtBy: z.string().length(24).optional(),
  supervisor: z.string().length(24).optional(),
  street: z.string().min(3),
  city: z.string().min(3),
  iban: z.number().int().gte(1000000000).lte(9999999999),
  password: z.string().min(8),
});
