import { Document, Schema, model, Types } from "mongoose";


export interface IFeedback extends Document {
  name: string;
  gender: "male" | "female" | "other";
  nationality: string;
  email: string;
  phoneNumber: string;
  address: string;
  message: string;
  userId: string | Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}


const feedbackSchema = new Schema<IFeedback>(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    nationality: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Feedback = model<IFeedback>("Feedback", feedbackSchema);
