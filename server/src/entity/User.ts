import mongoose, { Schema, InferSchemaType } from "mongoose";
import AutoIncrement from "mongoose-sequence";

const userSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      required: true,
      unique: true,
    },
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
    broughtByID: {
      type: Number,
    },
    supervisor: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    superviserID: {
      type: Number,
    },
    levelTwo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    levelTwoID: {
      type: Number,
    },
    levelThree: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    levelThreeID: {
      type: Number,
    },
    superCommision: {
      type: Boolean,
      default: true,
      required: true,
    },
    street: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    iban: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
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

userSchema.plugin(AutoIncrement, { inc_field: "ID" });

userSchema.post("save", async function (doc, next) {
  if (doc.broughtByID) {
    if (
      (doc.ID == 5 && doc.broughtByID == 2) ||
      (doc.ID == 2 && doc.broughtByID == 1) ||
      doc.ID == 5
    ) {
      let level2Update = await User.findOne(
        { ID: 1, deleted: false },
        { new: true }
      );
      if (!level2Update) {
        return next();
      }
      doc.updateOne({
        levelTwoID: level2Update?.ID,
        levelTwo: level2Update?._id,
      });
      return next();
    }
    return next();
  }

  return next();
});

userSchema.post("findOneAndUpdate", async function (doc, next) {
  if (doc.broughtByID) {
    if (
      (doc.ID == 5 && doc.broughtByID == 2) ||
      (doc.ID == 2 && doc.broughtByID == 1) ||
      doc.ID == 5
    ) {
      let level2Update = await User.findOne(
        { ID: 1, deleted: false },
        { new: true }
      );
      if (!level2Update) {
        return next();
      }
      doc.updateOne({
        levelTwoID: level2Update?.ID,
        levelTwo: level2Update?._id,
      });
      return next();
    }
    return next();
  }

  return next();
});
export type IUser = InferSchemaType<typeof userSchema>;
export const User = mongoose.model<IUser>("User", userSchema);
