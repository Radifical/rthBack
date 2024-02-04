import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    studentName: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    classesLeft: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
