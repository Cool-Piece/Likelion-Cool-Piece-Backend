import express from "express";
import { githubAuth, githubAuthCallback } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get("/github/start", githubAuth);
userRouter.get("/github/callback", githubAuthCallback);

export default userRouter;
