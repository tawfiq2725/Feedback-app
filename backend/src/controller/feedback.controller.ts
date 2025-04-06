import { NextFunction, Request, Response } from "express";
import { feedbackInterfaceService } from "../interface/service/feedback.interface";
import { sendJsonResponse } from "../utils/response";
import { HttpStatus } from "../utils/status";

export class FeedbackController {
  constructor(private feebackService: feedbackInterfaceService) {}

  public async createFeedback(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        gender,
        nationality,
        email,
        phoneNumber,
        address,
        message,
        userId,
      } = req.body;
      const feedbackData = {
        name,
        gender,
        nationality,
        email,
        phoneNumber,
        address,
        message,
        userId,
      };
      const newFeedback = await this.feebackService.createFeedback(
        feedbackData
      );
      sendJsonResponse(
        res,
        HttpStatus.CREATED,
        true,
        "Feedback Created Successfully",
        newFeedback
      );
    } catch (err: any) {
      next(err);
    }
  }

  public async getAllFeedbacks(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const feedbacks = await this.feebackService.getAllFeedback();
      sendJsonResponse(
        res,
        HttpStatus.OK,
        true,
        "All Feedbacks Retrieved Successfully",
        feedbacks
      );
    } catch (err: any) {
      next(err);
    }
  }

  public async getFeedbackByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { userId } = req.params;
      const feedbacks = await this.feebackService.getAllFeedbackByUser(userId);
      sendJsonResponse(
        res,
        HttpStatus.OK,
        true,
        "Feedback Retrieved Successfully",
        feedbacks
      );
    } catch (err: any) {
      next(err);
    }
  }

  public async getFeedbackById(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { feedbackId } = req.params;
      const feedback = await this.feebackService.getFeedback(feedbackId);
      sendJsonResponse(
        res,
        HttpStatus.OK,
        true,
        "Feedback Retrieved Successfully",
        feedback
      );
    } catch (err: any) {
      next(err);
    }
  }
}
