import Comment from "../models/Comment";
import Study from "../models/Study";
import User from "../models/User";
import parseToken from "../utils/token";
import jwt from "jsonwebtoken";

export const sendComment = async (req, res, next) => {
  const studyId = req.params.id;
  const authorization = req.get("Authorization");

  try {
    const accessToken = parseToken(authorization);
    const secretKey = process.env.SECRET_KEY;

    if (accessToken === "undefined") {
      next({ message: "check your token!" });
    }

    const decoded = jwt.verify(accessToken, secretKey);
    const { _id: userId } = decoded;

    await Comment.create({
      creator: userId,
      content: req.body.content,
    });

    await Study.findByIdAndUpdate(studyId, {
      $push: { comments: userId },
    });

    const study = await Study.findById(studyId);
    const allComments = study.comments;
    const result = [];

    for (let i = 0; i < allComments.length; i++) {
      const userInfo = await User.findById(allComments[i]);
      result.push(userInfo);
    }

    return res
      .status(201)
      .json({ message: "success to add comment", comments: result });
  } catch (error) {
    return res.json({ message: "mongoose Error" });
  }
};
