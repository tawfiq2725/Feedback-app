import { UserRepoInterface } from "../interface/repo/auth.interface";
import { IUser } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token";
import {
  loginServiceInterface,
  createUserServiceInterface,
} from "../interface/service/auth.interface";

export class createUserService implements createUserServiceInterface {
  constructor(private userRepo: UserRepoInterface) {}
  public async signup(data: Partial<IUser>): Promise<IUser> {
    try {
      const { password } = data;
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password!, salt);
      const user = await this.userRepo.createUser({
        ...data,
        password: hashedPassword,
      });
      return user;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}

export class loginService implements loginServiceInterface {
  constructor(private userRepo: UserRepoInterface) {}
  public async login(
    data: Partial<IUser>
  ): Promise<{ user: IUser; token: string }> {
    try {
      const { email, password } = data;
      const user = await this.userRepo.findUserByEmail(email!);
      if (!user) {
        throw new Error("User not found");
      }
      const isMatch = await bcrypt.compare(password!, user.password!);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT secret is not defined");
      }
      if (!user._id) {
        throw new Error("User ID is not defined");
      }
      const payload = {
        _id: user._id,
        email: user.email,
      };

      const token = generateToken(payload, secret);
      return { user, token };
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

}
