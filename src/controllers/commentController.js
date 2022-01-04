import Comment from "../models/Comment";
import Study from "../models/Study";
import User from "../models/User";
import parseToken from "../utils/token";
import jwt from "jsonwebtoken";

export const makeComment = async (req, res, next) => {
  const { studyId, content } = req.body;
  const authorization = req.get("Authorization");

  try {
    const accessToken = parseToken(authorization);
    const secretKey = process.env.SECRET_KEY;

    if (accessToken === "undefined") {
      next({ message: "check your token!" });
    }

    const decoded = jwt.verify(accessToken, secretKey);
    const { _id: userId } = decoded;

    const newComment = await Comment.create({
      creator: userId,
      content,
      study: studyId,
    });

    await Study.findByIdAndUpdate(studyId, {
      $push: { comments: newComment._id },
    });

    return res.status(201).json({ message: "success to add comment" });
  } catch (error) {
    return res.json({ message: "mongoose Error" });
  }
};

export const deleteComment = async (req, res, next) => {
  const commentId = req.params.id;
  const studyId = req.body.studyId;

  try {
    if (!commentId) {
      return res.status(403).json({ message: "check your request" });
    }

    await Study.findByIdAndUpdate(studyId, {
      $pull: { comments: commentId },
    });

    await Comment.findByIdAndDelete(commentId);

    return res.json({ message: "comment is deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "mongoose error" });
  }
};

export const editComment = async (req, res, next) => {
  const commentId = req.params.id;
  const { contents } = req.body;
  try {
    if (!commentId) {
      return res.status(403).json({ message: "check your request" });
    }

    await Comment.findByIdAndUpdate(commentId, {
      contents,
    });

    return res.json({ message: "comment is deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "mongoose error" });
  }
};
