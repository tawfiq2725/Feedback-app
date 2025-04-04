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

export const verifyToken = (token: string, secret: string): PayloadToken => {
  try {
    const decoded = jwt.verify(token, secret) as PayloadToken;
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
