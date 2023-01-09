import mongoose from "mongoose";

const borrowLogs = mongoose.Schema({
  deviceCode: {
    type: String,
    require: true,
  },
  borrowDate: {
    require: true,
    type: String,
  },
  studentCode: {
    require: true,
    type: String,
  },
  borrowerName: {
    require: true,
    type: String,
  },
  status: {
    require: true,
    type: Number,
  },
});

module.exports = mongoose.model("borrowLog", borrowLogs);
