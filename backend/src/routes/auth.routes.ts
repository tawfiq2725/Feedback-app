import express from "express";
import { authController } from "../container/auth.dI";
const router = express.Router();

router.post("/register", authController.signup.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get("/logout", authController.logout.bind(authController));

export default router;
