import mongoose from "mongoose";

const deviceSchema = mongoose.Schema(
  {
    deviceName: {
      require: true,
      type: String,
    },
    deviceLocation: {
      require: true,
      type: Array,
    },
    deviceCode: {
      require: true,
      type: String,
    },
    deviceType: {
      require: true,
      type: String,
    },
    importDate: {
      require: true,
      type: String,
    },
    manager: {
      require: true,
      type: String,
    },
    purpose: {
      require: true,
      type: String,
    },
    status: {
      default: 0,
      type: Number,
    },
    userId: String,
    borrowDate: String,
    note: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Device", deviceSchema);
