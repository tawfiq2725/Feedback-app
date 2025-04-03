import { IUser } from "../../models/user.model";

export interface UserRepoInterface {
  createUser: (user: Partial<IUser>) => Promise<IUser>;
  getAllUsers: () => Promise<IUser[]>;
  getUserById: (id: string) => Promise<IUser>;
  findUserByEmail: (email: string) => Promise<IUser>;
}
