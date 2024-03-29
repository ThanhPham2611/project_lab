import mongoose from "mongoose";

const borrowEquiment = mongoose.Schema(
  {
    idCreator: {
      type: String,
      require: true,
    },
    creator: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    majors: {
      type: String,
      require: true,
    },
    studentCode: String,
    devices: {
      type: Array,
      require: true,
    },
    borrowDate: {
      type: Date,
      require: true,
    },
    returnDate: {
      type: Date,
      require: true,
    },
    status: {
      type: Number,
      default: 1,
    },
    rejectReason: {
      type: String,
      require: true,
    },
    purpose: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("borrowEquiment", borrowEquiment);
