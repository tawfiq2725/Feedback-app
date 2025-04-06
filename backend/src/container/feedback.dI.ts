import { FeedbackController } from "../controller/feedback.controller";
import { FeedbackService } from "../service/feedback.service";
import { FeedbackRepository } from "../repo/feedback.repo";
import { Feedback } from "../models/feedback.model";
import UserModel from "../models/user.model";
const feedbackRepo = new FeedbackRepository(Feedback,UserModel);
const feedbackService = new FeedbackService(feedbackRepo);
export const feedbackController = new FeedbackController(feedbackService);
