import express from "express";
import {
  githubAuth,
  githubAuthCallback,
  logout,
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start", githubAuth);
userRouter.post("/github/callback", githubAuthCallback);
userRouter.get("/logout", logout);

export default userRouter;
