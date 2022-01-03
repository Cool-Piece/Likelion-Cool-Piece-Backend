import express from "express";
import {
  githubAuthCallback,
  logout,
  getUserInfo,
  editUserInfo,
} from "../controllers/userController";

import { sendComment } from "../controllers/commentController";

const userRouter = express.Router();

userRouter.get("/", getUserInfo);
userRouter.post("/github/callback", githubAuthCallback);
userRouter.get("/logout", logout);
userRouter.post("/edit", editUserInfo);
userRouter.post("/comment/:id", sendComment);

export default userRouter;
