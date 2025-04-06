import { feedbackRepoInterface } from "../interface/repo/feedback.interface";
import  { IFeedback,Feedback }  from "../models/feedback.model";
import UserModel from "../models/user.model";


export class FeedbackRepository implements feedbackRepoInterface {
  constructor(private feedbackModel: typeof Feedback , 
    private userModel:typeof UserModel
  ) {}

  public async create(feedback: Partial<IFeedback>): Promise<IFeedback> {
    try {
      const newFeedback = await this.feedbackModel.create(feedback);
      await this.userModel.findOneAndUpdate(
        {_id:feedback.userId},
        { $inc: { count: 1 } },
        { new: true }
      );     
      return newFeedback;
    } catch (error:any) {
      throw new Error("Error creating feedback: " + error.message);
    }
  }

  public async getAll(): Promise<IFeedback[]> {
    try {
      const feedbacks = await this.feedbackModel.find().sort({ createdAt: -1 });
      return feedbacks;
    } catch (error:any) {
      throw new Error("Error fetching feedbacks: " + error.message);
    }
  }

  public async getById(id: string): Promise<IFeedback | null> {
    try {
      const feedback = await this.feedbackModel.findById(id);
      return feedback;
    } catch (error:any) {
      throw new Error("Error fetching feedback by ID: " + error.message);
    }
  }

  public async getByUserId(userId: string): Promise<IFeedback[]> {
    try {
      const feedbacks = await this.feedbackModel.find({ userId });
      return feedbacks;
    } catch (error:any) {
      throw new Error("Error fetching feedback by user ID: " + error.message);
    }
  }

}