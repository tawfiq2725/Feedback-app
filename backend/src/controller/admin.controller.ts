import { NextFunction, Request, Response } from "express";
import {
  adminServiceInterface,
  getUserService,
} from "../interface/service/auth.interface";
import { sendJsonResponse } from "../utils/response";
import { HttpStatus } from "../utils/status";
export class AdminController {
  constructor(
    private adminService: adminServiceInterface,
    private feedbackService: getUserService
  ) {}
  public async adminLogin(
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
      const admin = await this.adminService.adminLogin(data);
      res.cookie("authToken", admin.token, {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.setHeader("authroization", `Bearer ${admin.token}`);
      sendJsonResponse(res, HttpStatus.OK, true, "Login successful", {
        userDetails: admin.admin,
        token: admin.token,
        role:"admin"
      });
    } catch (error: any) {
      next(error);
    }
  }

  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await this.feedbackService.getAllUsers();
      sendJsonResponse(
        res,
        HttpStatus.OK,
        true,
        "Users fetched successfully",
        users
      );
    } catch (error) {
      next(error);
    }
  }
  public async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.feedbackService.getUserById(id);
      if (!user) {
        return sendJsonResponse(
          res,
          HttpStatus.NOT_FOUND,
          false,
          "User not found",
          null
        );
      }
      sendJsonResponse(
        res,
        HttpStatus.OK,
        true,
        "User fetched successfully",
        user
      );
    } catch (error) {
      next(error);
    }
  }

  public async getDashboardData(req:Request,res:Response,next:NextFunction):Promise<void>{
    try{
      const data = await this.adminService.getDashboardData()
      sendJsonResponse(res,HttpStatus.OK,true,"Dashboard data fetched successfully",data)
    }catch(error){
      next(error)
    }
  }
}
