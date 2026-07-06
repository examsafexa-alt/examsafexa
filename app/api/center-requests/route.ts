import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import CenterRequest from "@/models/CenterRequest";

export const dynamic = "force-dynamic";

const requestSchema = z.object({
  examId: z.string().refine((value) => mongoose.Types.ObjectId.isValid(value), {
    message: "examId must be a valid id.",
  }),
  centerName: z.string().min(2),
  city: z.string().min(2),
  state: z.string().optional(),
  note: z.string().optional(),
});

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "You need to be signed in." }, { status: 401 });
  }

  const parsed = requestSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ message: "Please check the center request fields and try again." }, { status: 400 });
  }

  const payload = parsed.data;
  await connectToDatabase();
  await CenterRequest.create({ ...payload, userId: session.user.id });

  return NextResponse.json({ ok: true }, { status: 201 });
}
