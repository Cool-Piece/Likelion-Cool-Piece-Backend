import express from "express";
import {
  home,
  showProject,
  showInterview,
  showStudy,
  makeStudy,
  getStudyInfo,
  joinStudy,
} from "../controllers/studyController";

const indexRouter = express.Router();

indexRouter.get("/", home);
indexRouter.get("/project", showProject);
indexRouter.get("/study", showStudy);
indexRouter.get("/interview", showInterview);
indexRouter.post("/create", makeStudy);
indexRouter.get("/:id([0-9a-f]{24})", getStudyInfo);
indexRouter.post("/study/join".joinStudy);

export default indexRouter;
