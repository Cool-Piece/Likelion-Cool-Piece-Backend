import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      trim: true,
      default: "",
    },
    study: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Study",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
