import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env";

// create and sign json web token
export const createRefreshToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: 60 * 60 * 24 * 30,
  });
};

export const createAccessToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET as string, {
    expiresIn: 60 * 5,
  });
};

export const checkJwt = async (jwtID: any) =>
  await jwt.verify(jwtID, JWT_SECRET as string);
