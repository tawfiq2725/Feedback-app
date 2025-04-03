import { IUser } from "../../models/user.model";
import { Token } from "../../types/auth.types";

export interface AuthInterface {
  login: (data: Partial<IUser>) => Promise<{ user: IUser; token: Token }>;
  signup: (data: Partial<IUser>) => Promise<IUser>;
  logout: () => Promise<void>;
  addFeedback: (feedback: any) => Promise<any>;
  getFeedbacks: () => Promise<any>;
  getFeedbackById: (id: string) => Promise<any>;
}
