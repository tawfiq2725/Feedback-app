import { UserRepoInterface } from "../interface/repo/auth.interface";
import { IUser } from "../models/user.model";
import { generateToken } from "../utils/token";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import {
  adminServiceInterface,
  getUserService,
} from "../interface/service/auth.interface";
dotenv.config();

export class AdminService implements adminServiceInterface {
  constructor(private userRepo: UserRepoInterface) {}

  public async adminLogin(
    data: Partial<IUser>
  ): Promise<{ admin: IUser; token: string }> {
    const { email, password } = data;
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }
    const admin = await this.userRepo.findUserByEmail(email);
    if (admin?.isAdmin !== true) {
      throw new Error("You are not an admin.");
    }
    if (!admin) {
      throw new Error("Admin not found.");
    }
    const isMatch = await bcrypt.compare(password, admin.password!);
    if (!isMatch) {
      throw new Error("Invalid credentials.");
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT secret or user ID is not defined.");
    }
    if (!admin._id) {
      throw new Error("ID is not defined.");
    }
    const payload = {
      _id: admin._id,
      email: admin.email,
      role: "admin",
    };
    let token = generateToken(payload, secret);

    return { admin, token };
  }
}

export class GetUserService implements getUserService {
  constructor(private userRepo: UserRepoInterface) {}
  public async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await this.userRepo.getUserById(id);
      if (!user) {
        throw new Error("User not found.");
      }
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  public async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await this.userRepo.getAllUsers();
      return users;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
