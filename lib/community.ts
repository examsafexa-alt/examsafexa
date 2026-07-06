import mongoose from "mongoose";
import Community from "@/models/Community";

type CommunityMatchInput = {
  userId: string;
  examId?: string | mongoose.Types.ObjectId | null;
  examCenterId?: string | mongoose.Types.ObjectId | null;
};

export async function findOrCreateCommunityForSelection({
  userId,
  examId,
  examCenterId,
}: CommunityMatchInput) {
  if (!examId || !examCenterId) return null;

  const community = await Community.findOneAndUpdate(
    { examId, examCenterId },
    {
      $setOnInsert: { examId, examCenterId, scope: "center" },
      $addToSet: { memberIds: userId },
    },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );

  return community;
}
