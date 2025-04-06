import { feedbackRepoInterface } from "../interface/repo/feedback.interface";
import { feedbackInterfaceService } from "../interface/service/feedback.interface";
import { IFeedback } from "../models/feedback.model";

export class FeedbackService implements feedbackInterfaceService {
  constructor(private feedbackRepo: feedbackRepoInterface) {}

  public async createFeedback(
    feedback: Partial<IFeedback>
  ): Promise<IFeedback> {
    try {
      const newFeedback = await this.feedbackRepo.create(feedback);
      return newFeedback;
    } catch (err: any) {
      throw new Error("Error creating feedback: " + err.message);
    }
  }
  public async getFeedback(id: string): Promise<IFeedback> {
    try {
      const feedback = await this.feedbackRepo.getById(id);
      if (!feedback) {
        throw new Error("Feedback not found");
      }
      return feedback;
    } catch (err: any) {
      throw new Error("Error getting feedback: " + err.message);
    }
  }
  public async getAllFeedback(): Promise<IFeedback[]> {
    try {
      const allFeedback = await this.feedbackRepo.getAll();
      return allFeedback;
    } catch (err: any) {
      throw new Error("Error getting all feedback: " + err.message);
    }
  }
  public async getAllFeedbackByUser(userId: string): Promise<IFeedback[]> {
    try {
      const feedbackByUser = await this.feedbackRepo.getByUserId(userId);
      return feedbackByUser;
    } catch (err: any) {
      throw new Error("Error getting feedback by user: " + err.message);
    }
  }
}
