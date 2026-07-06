import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { findOrCreateCommunityForSelection } from "@/lib/community";
import { sendJourneyStartedEmail } from "@/lib/notifications";
import LocationShare from "@/models/LocationShare";
import User from "@/models/User";

export const dynamic = "force-dynamic";

const locationSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  accuracy: z.number().optional(),
});

function trackingUrl(request: Request, token: string) {
  const url = new URL(request.url);
  return `${url.origin}/track/${token}`;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  await connectToDatabase();
  const share = (await LocationShare.findOne({ userId: session.user.id, isActive: true }).lean()) as any;

  return NextResponse.json({
    active: Boolean(share),
    trackingUrl: share?.shareToken ? `/track/${share.shareToken}` : undefined,
    lastLocation: share?.lastLocation,
    journeyStartedAt: share?.journeyStartedAt,
  });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  await connectToDatabase();
  const user = (await User.findById(session.user.id).lean()) as any;
  if (!user) {
    return NextResponse.json({ message: "User not found." }, { status: 404 });
  }

  if (!user.liveLocationOptIn) {
    return NextResponse.json({ message: "Turn on live location opt-in before starting journey mode." }, { status: 400 });
  }

  const community = await findOrCreateCommunityForSelection({
    userId: session.user.id,
    examId: user.examSelected,
    examCenterId: user.examCenterSelected,
  });

  const existing = (await LocationShare.findOne({ userId: session.user.id, isActive: true })) as any;
  const share =
    existing ??
    (await LocationShare.create({
      userId: session.user.id,
      communityId: community?._id,
      isActive: true,
      shareToken: randomUUID(),
      journeyStartedAt: new Date(),
    }));

  if (!share.communityId && community?._id) {
    share.communityId = community._id;
    await share.save();
  }

  const link = trackingUrl(request, share.shareToken);
  const shouldEmailParent = user.notificationPrefs?.parentEmailOnJourney ?? true;
  if (user.parentEmail && shouldEmailParent && !share.parentNotifiedAt) {
    try {
      await sendJourneyStartedEmail({ to: user.parentEmail, studentName: user.name, trackingUrl: link });
      share.parentNotifiedAt = new Date();
      await share.save();
    } catch (error) {
      console.error("[journey-email:error]", error);
    }
  }

  return NextResponse.json({
    active: true,
    trackingUrl: link,
    parentNotified: Boolean(share.parentNotifiedAt),
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  const parsed = locationSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Location payload is invalid." }, { status: 400 });
  }

  await connectToDatabase();
  const share = await LocationShare.findOneAndUpdate(
    { userId: session.user.id, isActive: true },
    {
      lastLocation: {
        ...parsed.data,
        updatedAt: new Date(),
      },
    },
    { new: true }
  );

  if (!share) {
    return NextResponse.json({ message: "Journey mode is not active." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, lastLocation: share.lastLocation });
}

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  await connectToDatabase();
  await LocationShare.findOneAndUpdate(
    { userId: session.user.id, isActive: true },
    { isActive: false, journeyEndedAt: new Date() },
    { new: true }
  );

  return NextResponse.json({ ok: true, active: false });
}
