"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var LOGIN_TYPES = ["github", "google"];
var userSchema = new _mongoose["default"].Schema({
  username: {
    type: String,
    "default": "",
    trim: true,
    unique: true
  },
  socialLogin: {
    type: String,
    "enum": LOGIN_TYPES
  },
  avatarUrl: {
    type: String
  },
  location: {
    type: String
  },
  interested_color: {
    type: [String]
  },
  bookmark: {
    type: [String]
  }
}, {
  timestamps: true
});

var User = _mongoose["default"].model("User", userSchema);

var _default = User;
exports["default"] = _default;