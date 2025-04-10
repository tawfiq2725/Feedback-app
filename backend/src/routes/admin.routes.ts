import express from "express";
import { adminController } from "../container/auth.dI";
import { authMiddleware } from "../middleware/auth.middle";

const router = express.Router();

router.post("/login", adminController.adminLogin.bind(adminController));
router.get(
  "/users",
  authMiddleware(["admin"]),
  adminController.getAllUsers.bind(adminController)
);
router.get(
  "/dashboard",
  authMiddleware(["admin"]),
  adminController.getDashboardData.bind(adminController)
);

export default router;
