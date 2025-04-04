import { AuthController } from "../controller/auth.controller";
import { createUserService } from "../service/auth.service";
import { loginService } from "../service/auth.service";
import { AuthRepository } from "../repo/auth.repo";
import { AdminService, GetUserService } from "../service/admin.service";
import { AdminController } from "../controller/admin.controller";

const authRepo = new AuthRepository();
const createUser = new createUserService(authRepo);
const login = new loginService(authRepo);
const adminService = new AdminService(authRepo);
const feedbackService = new GetUserService(authRepo);
export const authController = new AuthController(login, createUser);
export const adminController = new AdminController(
  adminService,
  feedbackService
);
