import { User } from "./user.types";

export interface ApiTypes {
  url: string;
  method: string;
  body?: object | null;
  params?: object | null;
  autoFetch?: boolean;
}

export interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  role: string | null;
  authToken: string | null;
  setAuth: (role: string, token: string) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export interface Data{
  success: boolean;
  message: string;
  data:any
}