import mongoose from "mongoose";

const STUDY_TYPES = ["project", "interview", "study"];
const StudySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, maxlength: 100, trim: true },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    start_date: { type: Date, require: [true, "startDate is required"] },
    due_date: {
      type: Date,
      require: [true, "dueDate is required"],
    },
    study_status: {
      type: Boolean,
      default: true,
    },
    study_type: {
      type: String,
      enum: STUDY_TYPES,
    },
    total: { type: Number, default: 1, max: 30 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    skills: { type: [String], default: ["javascript"] },
    description: { type: String, required: true, trim: true, minLength: 2 },
    meta: {
      like: { type: Number, default: 0 },
      ratings: { type: Number },
    },
  },
  {
    timestamps: true,
  }
);

const Study = mongoose.model("Study", StudySchema);
export default Study;
