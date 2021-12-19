import express from "express";
import {
  home,
  showProject,
  showInterview,
  showStudy,
} from "../controllers/studyController";

import {
  getLogin,
  githubAuth,
  githubAuthCallback,
} from "../controllers/userController";

const indexRouter = express.Router();

indexRouter.get("/", home);
indexRouter.get("/project", showProject);
indexRouter.get("/study", showStudy);
indexRouter.get("/interview", showInterview);
indexRouter.get("/login", getLogin);

//user
indexRouter.get("/users/github/start", githubAuth);
indexRouter.get("/users/github/callback", githubAuthCallback);

export default indexRouter;
