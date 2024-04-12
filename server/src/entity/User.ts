import mongoose, { Schema, InferSchemaType } from "mongoose";

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
    },
    broughtBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    supervisor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    levelTwo: {
      type: Number,
    },
    levelThree: {
      type: Number,
    },
    superCommision: {
      type: Boolean,
    },
    street: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    iban: {
      type: Number,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: String,
    deletedAt: Date,
    deleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);

export type IUser = InferSchemaType<typeof userSchema>;
export const User = mongoose.model("User", userSchema);
