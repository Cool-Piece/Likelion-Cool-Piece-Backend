import express from "express";
import {
  githubAuthCallback,
  getUserInfo,
  editUserInfo,
  enrollBookmark,
  getMyStudy,
} from "../controllers/userController";

import {
  makeComment,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const userRouter = express.Router();

userRouter.get("/", getUserInfo);
userRouter.post("/github/callback", githubAuthCallback);
userRouter.post("/edit", editUserInfo);
userRouter
  .route("/comments/:id([0-9a-f]{24})")
  .put(editComment)
  .delete(deleteComment);

userRouter.post("/comments/create", makeComment);
userRouter.get("/bookmark", getMyStudy);
userRouter.post("/bookmark", enrollBookmark);

export default userRouter;
