"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.githubAuthCallback = exports.githubAuth = exports.getLogin = void 0;

var getLogin = function getLogin(req, res) {
  return res.render("login");
};

exports.getLogin = getLogin;

var githubAuth = function githubAuth(req, res, next) {
  var baseUrl = "https://github.com/login/oauth/authorize";
  var config = {
    client_id: process.env.DB_URI,
    allow_signup: false,
    scope: "read:user user:email"
  };
  var params = new URLSearchParams(config).toString();
  var finalUrl = "".concat(baseUrl, "?").concat(params);
  return res.redirect(finalUrl);
};

exports.githubAuth = githubAuth;

var githubAuthCallback = function githubAuthCallback(req, res, next) {};

exports.githubAuthCallback = githubAuthCallback;