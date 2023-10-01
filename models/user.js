import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      requred: true,
    },
    email: {
      type: String,
      requred: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      requred: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema)
