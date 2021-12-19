"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showStudy = exports.showProject = exports.showInterview = exports.home = void 0;

var home = function home(req, res, next) {
  res.send("ok home page");
};

exports.home = home;

var showProject = function showProject(req, res, next) {
  res.send("project route");
};

exports.showProject = showProject;

var showInterview = function showInterview(req, res, next) {
  res.send("interview banner Route");
};

exports.showInterview = showInterview;

var showStudy = function showStudy(req, res, next) {
  res.send("Study nav banner Route");
};

exports.showStudy = showStudy;