import express from "express";
import {
  githubAuthCallback,
  logout,
  getUserInfo,
  editUserInfo,
} from "../controllers/userController";

import {
  makeComment,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const userRouter = express.Router();

userRouter.get("/", getUserInfo);
userRouter.post("/github/callback", githubAuthCallback);
userRouter.get("/logout", logout);
userRouter.post("/edit", editUserInfo);
userRouter
  .route("/comments/:id([0-9a-f]{24})")
  .put(editComment)
  .delete(deleteComment);

userRouter.post("/comments/create", makeComment);

export default userRouter;
