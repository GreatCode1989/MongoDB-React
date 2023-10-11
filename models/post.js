import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      requred: true,
    },
    text: {
      type: String,
      requred: true,
      unique: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    viewCount: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avatarUrl: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", PostSchema)
