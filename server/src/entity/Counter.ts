import mongoose, { Schema, InferSchemaType } from "mongoose";

const counterSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  seq: {
    type: Number,
    required: true,
  },
});

export type ICounter = InferSchemaType<typeof counterSchema>;
export const Counter = mongoose.model("Counter", counterSchema);
