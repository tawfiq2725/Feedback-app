import mongoose from "mongoose";

export interface IUser {
  email: string;
  password: string;
  isAdmin: boolean;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model<IUser>("User", userSchema);
export default UserModel;
