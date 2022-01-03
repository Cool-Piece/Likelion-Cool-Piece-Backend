import express from "express";
import {
  githubAuthCallback,
  logout,
  getUserInfo,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/", getUserInfo);
userRouter.post("/github/callback", githubAuthCallback);
userRouter.get("/logout", logout);

export default userRouter;
