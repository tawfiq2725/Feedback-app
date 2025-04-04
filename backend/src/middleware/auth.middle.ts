import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/token";
import dotenv from "dotenv";
dotenv.config();
import userSchema from "../models/user.model";
import { sendJsonResponse } from "../utils/response";
import { HttpStatus } from "../utils/status";

export const authMiddleware = (allowedRoles: string[] = []) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization || req.headers.Authorization;

      if (typeof authHeader !== "string" || !authHeader.startsWith("Bearer ")) {
        return sendJsonResponse(
          res,
          HttpStatus.UNAUTHORIZED,
          false,
          "Authorization header missing or malformed"
        );
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        return sendJsonResponse(
          res,
          HttpStatus.UNAUTHORIZED,
          false,
          "Token not found"
        );
      }

      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return sendJsonResponse(
          res,
          HttpStatus.INTERNAL_SERVER_ERROR,
          false,
          "JWT secret not set"
        );
      }

      const decoded = verifyToken(token, secret); 
      if (!decoded || !decoded.email || !decoded.role) {
        return sendJsonResponse(
          res,
          HttpStatus.UNAUTHORIZED,
          false,
          "Invalid token payload"
        );
      }

      const user = await userSchema.findOne({ email: decoded.email });
      if (!user) {
        return sendJsonResponse(
          res,
          HttpStatus.UNAUTHORIZED,
          false,
          "User not found"
        );
      }

      if (allowedRoles.length && !allowedRoles.includes(decoded.role)) {
        return sendJsonResponse(
          res,
          HttpStatus.FORBIDDEN,
          false,
          "You are not authorized to access this resource"
        );
      }
      (req as any).user = decoded;
      next();
    } catch (error) {
      return sendJsonResponse(
        res,
        HttpStatus.UNAUTHORIZED,
        false,
        "Unauthorized"
      );
    }
  };
};
