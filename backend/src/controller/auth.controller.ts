import {
  loginServiceInterface,
  createUserServiceInterface,
} from "../interface/service/auth.interface";
import { NextFunction, Request, Response } from "express";
import { sendJsonResponse } from "../utils/response";
import { HttpStatus } from "../utils/status";
export class AuthController {
  constructor(
    private loginService: loginServiceInterface,
    private signUpservice: createUserServiceInterface
  ) {}

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
      const user = await this.loginService.login(data);
      res.cookie("authToken", user.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.setHeader("authroization", `Bearer ${user.token}`);
      sendJsonResponse(res, HttpStatus.OK, true, "Login successful", {
        userDetails: user.user,
        token: user.token,
        role: "user",
      });
    } catch (error) {
      next(error);
    }
  }

  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      const data = {
        name,
        email,
        password,
        isAdmin: false,
      };
      const user = await this.signUpservice.signup(data);
      sendJsonResponse(
        res,
        HttpStatus.CREATED,
        true,
        "User Created Successfully",
        user
      );
    } catch (error: any) {
      next(error);
    }
  }

  public async logout(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.clearCookie("authToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      sendJsonResponse(res, HttpStatus.OK, true, "Logout successful", null);
    } catch (error) {
      next(error);
    }
  }
}
