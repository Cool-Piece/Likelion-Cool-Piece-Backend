"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var StudySchema = new _mongoose["default"].Schema({
  title: {
    type: String,
    required: true,
    maxlength: 100,
    trim: true
  },
  creator: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: {
    type: Date,
    required: true,
    "default": Date.now
  },
  start_date: {
    type: Date,
    require: [true, "startDate is required"]
  },
  due_date: {
    type: Date,
    require: [true, "dueDate is required"]
  },
  total: {
    type: Number,
    "default": 1,
    max: 30
  },
  participants: [{
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: "User"
  }],
  skills: {
    type: [String],
    "default": ["javascript"]
  },
  meta: {
    like: {
      type: Number,
      "default": 0
    },
    ratings: {
      type: Number
    }
  }
});

var Study = _mongoose["default"].model("Study", StudySchema);

var _default = Study;
exports["default"] = _default;