import mongoose from "mongoose";

const LOGIN_TYPES = ["github", "google"];

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "",
    },
    socialLogin: {
      type: String,
      enum: LOGIN_TYPES,
    },
    avatarUrl: { type: String },
    location: { type: String },
    interested_color: { type: [String] },
    bookmark: { type: [String] },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
