import { Response } from "express";
export const sendJsonResponse = (
  res: Response,
  statusCode: number,
  success: boolean,
  message: string,
  data?: any
) => {
  res.status(statusCode).json({
    success,
    message,
    data,
  });
};
