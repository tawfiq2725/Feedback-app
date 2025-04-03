import { AuthInterface } from "../interface/service/auth.interface";
import { NextFunction, Request, Response } from "express";
import { sendJsonResponse } from "../utils/response";
import { HttpStatus } from "../utils/status";
export class AuthController {
  constructor(private authService: AuthInterface) {}

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const user = await this.authService.login(data);
      res.cookie("authToken", user.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.setHeader("Auth", `Bearer ${user.token}`);
      sendJsonResponse(res, HttpStatus.OK, true, "Login successful", {
        userDetails: user.user,
        token: user.token,
      });
    } catch (error) {
      next(error);
    }
  }

  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
        isAdmin: false,
      };
      const user = await this.authService.signup(data);
      sendJsonResponse(
        res,
        HttpStatus.CREATED,
        true,
        "User Created Successfully",
        user
      );
    } catch (error) {
      next(error);
    }
  }
}
