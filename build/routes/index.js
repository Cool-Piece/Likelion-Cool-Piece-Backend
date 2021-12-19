"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _studyController = require("../controllers/studyController");

var _userController = require("../controllers/userController");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexRouter = _express["default"].Router();

indexRouter.get("/", _studyController.home);
indexRouter.get("/project", _studyController.showProject);
indexRouter.get("/study", _studyController.showStudy);
indexRouter.get("/interview", _studyController.showInterview);
indexRouter.get("/login", _userController.getLogin); //user

indexRouter.get("users/github/start", _userController.githubAuth);
indexRouter.get("users/github/callback", _userController.githubAuthCallback);
var _default = indexRouter;
exports["default"] = _default;