import { UserRepoInterface } from "../interface/repo/auth.interface";
import userSchema, { IUser } from "../models/user.model";

export class AuthRepository implements UserRepoInterface {
  public async createUser(user: Partial<IUser>): Promise<IUser> {
    try {
      const newUser = new userSchema(user);
      return await newUser.save();
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
  public async getAllUsers(): Promise<IUser[]> {
    try {
      return await userSchema.find();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }
  public async getUserById(id: string): Promise<IUser | null> {
    try {
      return await userSchema.findById(id);
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user by ID");
    }
  }
  public async findUserByEmail(email: string): Promise<IUser | null> {
    try {
      return await userSchema.findOne({ email });
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error("Failed to fetch user by email");
    }
  }
}
