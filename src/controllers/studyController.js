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

export const makeStudy = async (req, res, next) => {
  console.log(req.body, " request");
  const {
    title,
    description,
    study_type,
    total,
    location,
    skills,
    start_date,
    due_date,
  } = req.body;

  // TODO: currentUser Object Id find and save from cookies

  try {
    if (!title) {
      return res.status(400).json({ message: "title should be required" });
    }

    if (!(start_date && due_date)) {
      return res
        .status(400)
        .json({ message: "start date and duedate is needed" });
    }

    if (!location) {
      return res.status(400).json({ message: "location should be required" });
    }

    if (!skills) {
      return res.status(400).json({ message: "skills should be required" });
    }

    const newStudy = await Study.create({
      title,
      creator: _id,
      description,
      study_type,
      total,
      location,
      skills,
      start_date,
      due_date,
      // $push: { participants: _id },
    });

    return res.json({ result: "ok" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
