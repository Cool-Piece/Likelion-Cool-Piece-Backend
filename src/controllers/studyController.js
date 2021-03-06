import Study from "../models/Study";
import parseToken from "../utils/token";
import jwt from "jsonwebtoken";

export const home = async (req, res, next) => {
  const studies = await Study.find({})
    .sort({ createdAt: "desc" })
    .populate("creator");

  return res.json({ result: "ok", studies });
};

export const showProject = async (req, res, next) => {
  const projects = await Study.find({ study_type: "프로젝트" }).populate(
    "creator"
  );

  console.log(projects, "asdf");

  return res.json({ result: "ok", projects });
};

export const showInterview = async (req, res, next) => {
  const interviews = await Study.find({ study_type: "면접" }).populate(
    "creator"
  );
  return res.json({ result: "ok", interviews });
};

export const showStudy = async (req, res, next) => {
  const studies = await Study.find({ study_type: "스터디" }).populate(
    "creator"
  );
  return res.json({ result: "ok", studies });
};

export const makeStudy = async (req, res, next) => {
  const {
    title,
    description,
    study_type,
    total,
    location,
    skills,
    start_date,
    due_date,
    userId,
  } = req.body;

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
      creator: userId,
      description,
      study_type,
      total: Number(total),
      location,
      skills,
      start_date: new Date(start_date),
      due_date: new Date(due_date),
    });

    await Study.findByIdAndUpdate(newStudy._id, {
      $push: { participants: userId },
    });

    return res.json({
      result: "ok",
      message: "study groups are succeed to be crated",
    });
  } catch (error) {
    console.log(error, "error ");
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStudyInfo = async (req, res, next) => {
  const { id } = req.params;
  try {
    const study = await Study.findById(id)
      .populate("creator")
      .populate({
        path: "comments",
        populate: {
          path: "creator",
          model: "User",
        },
      });

    if (!study) {
      return res.status(404).json({ message: "Can not find Study" });
    }

    return res.json({ studyInfo: study });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server serror" });
  }
};

export const joinStudy = async (req, res, next) => {
  const authorization = req.get("Authorization");
  const { studyId } = req.body;
  const secretKey = process.env.SECRET_KEY;

  if (!studyId) {
    console.log(" study ID 없을때 와야되");
    return res.status(400).json({ message: "study Id is needed" });
  }

  try {
    const accessToken = parseToken(authorization);
    const decoded = jwt.verify(accessToken, secretKey);
    const { _id } = decoded;

    await Study.findByIdAndUpdate(
      studyId,
      {
        $push: { participants: _id },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ result: "ok", message: "added on paticipants list" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
