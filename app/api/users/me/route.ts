import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { findOrCreateCommunityForSelection } from "@/lib/community";
import User from "@/models/User";
import Community from "@/models/Community";

export const dynamic = "force-dynamic";

const updateSchema = z.object({
  examSelected: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), { message: "examSelected must be a valid id." })
    .optional(),
  examCenterSelected: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), { message: "examCenterSelected must be a valid id." })
    .optional(),
  parentEmail: z.string().email().optional().or(z.literal("")),
  liveLocationOptIn: z.boolean().optional(),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional().or(z.literal("")),
  notificationPrefs: z
    .object({
      parentEmailOnJourney: z.boolean().optional(),
    })
    .optional(),
});

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  await connectToDatabase();
  const user = (await User.findById(session.user.id).lean()) as any;
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const community = user.examSelected && user.examCenterSelected
    ? ((await Community.findOne({
        examId: user.examSelected,
        examCenterId: user.examCenterSelected,
      }).lean()) as any)
    : null;

  return NextResponse.json({
    id: String(user._id),
    name: user.name,
    email: user.email,
    gender: user.gender,
    parentEmail: user.parentEmail,
    liveLocationOptIn: user.liveLocationOptIn,
    notificationPrefs: {
      parentEmailOnJourney: user.notificationPrefs?.parentEmailOnJourney ?? true,
    },
    examSelected: user.examSelected ? String(user.examSelected) : undefined,
    examCenterSelected: user.examCenterSelected ? String(user.examCenterSelected) : undefined,
    communityId: community?._id ? String(community._id) : undefined,
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  const parsed = updateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the update fields and try again." }, { status: 400 });
  }

  const payload = parsed.data;
  await connectToDatabase();

  const updates = {
    ...payload,
    parentEmail: payload.parentEmail || undefined,
    gender: payload.gender || undefined,
  };

  const user = (await User.findByIdAndUpdate(session.user.id, updates, { new: true })) as any;

  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  const community = await findOrCreateCommunityForSelection({
    userId: session.user.id,
    examId: user.examSelected,
    examCenterId: user.examCenterSelected,
  });

  return NextResponse.json({ ok: true, communityId: community?._id ? String(community._id) : undefined });
}
