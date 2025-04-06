import { IFeedback } from "../../models/feedback.model";

export interface feedbackRepoInterface {
  create: (feedback: Partial<IFeedback>) => Promise<IFeedback>;
  getAll: () => Promise<IFeedback[]>;
  getById: (id: string) => Promise<IFeedback | null>;
  getByUserId: (userId: string) => Promise<IFeedback[]>;
}
