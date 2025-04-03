import { AuthController } from "../controller/auth.controller";
import { createUserService } from "../service/auth.service";
import { loginService } from "../service/auth.service";
import { AuthRepository } from "../repo/auth.repo";

const authRepo = new AuthRepository();
const createUser = new createUserService(authRepo);
const login = new loginService(authRepo);
export const authController = new AuthController(login, createUser);
