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

export const validateAddWorker = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  broughtBy: ObjectIdSchema,
  supervisor: ObjectIdSchema,
  street: z.string(),
  city: z.string(),
  iban: z.number().int().gte(1000000000).lte(9999999999),
});

export type AddWorkerDTO = z.infer<typeof validateAddWorker>;
