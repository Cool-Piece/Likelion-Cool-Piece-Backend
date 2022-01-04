import express from "express";
import {
  githubAuthCallback,
  logout,
  getUserInfo,
  editUserInfo,
} from "../controllers/userController";

import { sendComment, deleteComment } from "../controllers/commentController";

const userRouter = express.Router();

userRouter.get("/", getUserInfo);
userRouter.post("/github/callback", githubAuthCallback);
userRouter.get("/logout", logout);
userRouter.post("/edit", editUserInfo);
userRouter.route("/comments/:id").delete(deleteComment);
userRouter.post("/comments/create", sendComment);

export default userRouter;
