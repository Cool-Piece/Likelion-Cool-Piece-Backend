import Study from "../models/Study";

export const home = async (req, res, next) => {
  const studies = await Study.find({}).sort({ createdAt: "desc" });
  return res.json({ result: "ok", studies });
};

export const showProject = (req, res, next) => {
  res.send("project route");
};

export const showInterview = (req, res, next) => {
  res.send("interview banner Route");
};

export const showStudy = (req, res, next) => {
  res.send("Study nav banner Route");
};
