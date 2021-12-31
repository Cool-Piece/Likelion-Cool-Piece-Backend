import express from "express";
import {
  home,
  showProject,
  showInterview,
  showStudy,
  makeStudy,
  getStudyInfo,
} from "../controllers/studyController";

const indexRouter = express.Router();

indexRouter.get("/", home);
indexRouter.get("/project", showProject);
indexRouter.get("/study", showStudy);
indexRouter.get("/interview", showInterview);
indexRouter.post("/create", makeStudy);
indexRouter.get("/:id", getStudyInfo);

export default indexRouter;
