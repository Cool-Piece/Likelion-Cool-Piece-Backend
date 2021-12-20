import mongoose from "mongoose";

const STUDY_TYPES = ["project", "interview", "study"];
const StudySchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 100, trim: true },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: { type: Date, required: true, default: Date.now },
  start_date: { type: Date, require: [true, "startDate is required"] },
  due_date: {
    type: Date,
    require: [true, "dueDate is required"],
  },
  study_status: {
    type: Boolean,
    default: false,
  },
  study_type: {
    type: String,
    enum: STUDY_TYPES,
  },
  total: { type: Number, default: 1, max: 30 },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  skills: { type: [String], default: ["javascript"] },
  meta: {
    like: { type: Number, default: 0 },
    ratings: { type: Number },
  },
});

const Study = mongoose.model("Study", StudySchema);
export default Study;
