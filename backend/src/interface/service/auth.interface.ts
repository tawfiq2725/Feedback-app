import { IUser } from "../../models/user.model";

export interface loginServiceInterface {
  login: (data: Partial<IUser>) => Promise<{ user: IUser; token: string }>;
}
export interface createUserServiceInterface {
  signup: (data: Partial<IUser>) => Promise<IUser>;
}
export interface feedbackServiceInterface {
  addFeedback: (feedback: any) => Promise<any>;
  getFeedbacks: () => Promise<any>;
  getFeedbackById: (id: string) => Promise<any>;
}

export interface adminServiceInterface {
  adminLogin: (
    data: Partial<IUser>
  ) => Promise<{ admin: IUser; token: string }>;
  getDashboardData:()=>Promise<{totalUsers:number,totalFeedbacks:number}>;
}

export interface getUserService {
  getUserById: (id: string) => Promise<IUser | null>;
  getAllUsers: () => Promise<IUser[]>;
}
