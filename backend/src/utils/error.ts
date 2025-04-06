import { Request, Response } from "express";
import { HttpStatus } from "./status";
import { sendJsonResponse } from "./response";
export const errorHandle = (err: any, req: Request, res: Response) => {
  console.log(err.stack);
  sendJsonResponse(res, HttpStatus.INTERNAL_SERVER_ERROR, false, err.message, err.stack);
};
