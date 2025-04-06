import express from "express";
import { authController } from "../container/auth.dI";
import { authMiddleware } from "../middleware/auth.middle";
const router = express.Router();

router.post("/register", authController.signup.bind(authController));
router.post("/login", authController.login.bind(authController));
router.get(
  "/logout",
  authMiddleware(["user", "admin"]),
  authController.logout.bind(authController)
);



export default router;
