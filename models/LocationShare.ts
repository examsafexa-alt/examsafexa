import { Schema, models, model } from "mongoose";

const LocationShareSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    communityId: { type: Schema.Types.ObjectId, ref: "Community" },
    isActive: { type: Boolean, default: false },
    shareToken: { type: String, unique: true, sparse: true },
    lastLocation: {
      lat: Number,
      lng: Number,
      accuracy: Number,
      updatedAt: Date,
    },
    journeyStartedAt: Date,
    journeyEndedAt: Date,
    parentNotifiedAt: Date,
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

LocationShareSchema.index({ userId: 1, isActive: 1 });

export default models.LocationShare || model("LocationShare", LocationShareSchema);
