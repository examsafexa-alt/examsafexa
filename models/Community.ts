import { Schema, models, model } from "mongoose";

const CommunitySchema = new Schema(
  {
    examId: { type: Schema.Types.ObjectId, ref: "Exam", required: true },
    examCenterId: { type: Schema.Types.ObjectId, ref: "ExamCenter", required: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: "User" }],
    scope: {
      type: String,
      enum: ["center"],
      default: "center",
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: false } }
);

CommunitySchema.index({ examId: 1, examCenterId: 1 }, { unique: true });

export default models.Community || model("Community", CommunitySchema);
