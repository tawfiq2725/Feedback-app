import { IFeedback } from "../../models/feedback.model";

export interface feedbackInterfaceService {
  createFeedback: (feedback: Partial<IFeedback>) => Promise<IFeedback>;
  getFeedback: (id: string) => Promise<IFeedback>;
  getAllFeedback: () => Promise<IFeedback[]>;
  getAllFeedbackByUser: (userId: string) => Promise<IFeedback[]>;
}
