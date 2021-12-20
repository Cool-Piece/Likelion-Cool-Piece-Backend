import Study from "../models/Study";

export const home = async (req, res, next) => {
  const studies = await Study.find({}).sort({ createdAt: "desc" });
  return res.json({ result: "ok", studies });
};

export const showProject = async (req, res, next) => {
  const projects = await Study.find({ study_type: "project" });
  return res.json({ result: "ok", projects });
};

export const showInterview = async (req, res, next) => {
  const interviews = await Study.find({ study_type: "interview" });
  return res.json({ result: "ok", interviews });
};

export const showStudy = async (req, res, next) => {
  const studies = await Study.find({ study_type: "study" }).sort({
    createdAt: "desc",
  });
  return res.json({ result: "ok", studies });
};
