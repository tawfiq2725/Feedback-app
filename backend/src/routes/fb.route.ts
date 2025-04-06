import { Router } from "express";
import { authMiddleware } from "../middleware/auth.middle";
import { feedbackController } from "../container/feedback.dI";
const router = Router();
router.post(
  "/feedback",
  authMiddleware(["user"]),
  feedbackController.createFeedback.bind(feedbackController)
); // create feedback
router.get(
  "/feedbacks",
  authMiddleware(["admin"]),
  feedbackController.getAllFeedbacks.bind(feedbackController)
); // all feedbacks
router.get(
  "/feedback-user/:userId",
  authMiddleware(["user"]),
  feedbackController.getFeedbackByUserId.bind(feedbackController)
); //total feedbacks by userId
router.get(
  "/feedback/:feedbackId",
  authMiddleware(["admin", "user"]),
  feedbackController.getFeedbackById.bind(feedbackController)
); // feedback by feedbackId
export default router;
