import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    email: {
      unique: true,
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
      require: true,
    },
    studentCode: {
      type: String,
      require: true,
    },
    phone: {
      type: Number,
      require: true,
    },
    majors: {
      type: String,
    },
    role: {
      type: Number,
      default: 1,
    },
    office: {
      type: Number,
      default: 1,
    },
    isChangePassword: {
      type: Boolean,
      default: false,
    },
    codeResetPass: {
      type: String,
    },
    birthday: {
      type: String,
      require: true,
    },
    avatarUrl: String,
    facebook: String,
    tiktok: String,
    instagram: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
