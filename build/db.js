"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _this = void 0;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_mongoose["default"].connect(process.env.DB_URI, function (err) {
  if (err) {
    (0, _httpErrors["default"])(500, "mongodb connection error");
  }
});

var db = _mongoose["default"].connection;

var handleOpen = function handleOpen() {
  return console.log("✅ Connected to DB");
};

var handleError = function handleError(error) {
  return console.log("❌ DB  can not connect", error);
};

db.once("open", handleOpen);
db.on("error", handleError);
db.on("disconnected", function () {
  console.log("❌ DB  can not connect", error);
  (0, _httpErrors["default"])(500), "Database Disconnected, so we try to connect again";

  _this.connect();
});