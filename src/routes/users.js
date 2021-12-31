import express from "express";
import {
  githubAuthCallback,
  logout,
  getUserInfo,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/github/callback", githubAuthCallback);
userRouter.get("/logout", logout);
userRouter.get("/", getUserInfo);

export default userRouter;
