import jwt from "jsonwebtoken";
import { PayloadToken } from "../types/auth.types";
export const generateToken = (
  payload: PayloadToken,
  secret: string
): string => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
};
