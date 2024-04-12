import { z } from "zod";
import { ObjectId } from "mongodb";

export const ObjectIdSchema = z.string().refine((value) => {
  try {
    new ObjectId(value);
    return true;
  } catch (error) {
    return false;
  }
}, "Valid ObjectId string");

export const validateAddUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  broughtBy: ObjectIdSchema.optional(),
  supervisor: ObjectIdSchema.optional(),
  street: z.string(),
  city: z.string(),
  iban: z.number().int().gte(1000000000).lte(9999999999),
});

export const validateEditUser = z.object({
  id: z.number().int().positive(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  broughtBy: ObjectIdSchema.optional(),
  supervisor: ObjectIdSchema.optional(),
  street: z.string(),
  city: z.string(),
  iban: z.number().int().gte(1000000000).lte(9999999999),
});

export const validateLoginUser = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const validateCreateUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  broughtBy: ObjectIdSchema.optional(),
  supervisor: ObjectIdSchema.optional(),
  street: z.string(),
  city: z.string(),
  iban: z.number().int().gte(1000000000).lte(9999999999),
  password: z.string().min(8),
});
