import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";

export const dynamic = "force-dynamic";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  password: z.string().min(8),
  gender: z.enum(["male", "female", "other", "prefer_not_to_say"]).optional().or(z.literal("")),
  parentEmail: z.string().email().optional().or(z.literal("")),
});

function getRegisterErrorResponse(error: unknown) {
  if (error instanceof z.ZodError) {
    return NextResponse.json({ message: "Please check the form fields and try again." }, { status: 400 });
  }

  const mongoError = error as Error & { code?: number };
  const message = mongoError?.message?.toLowerCase() ?? "";

  if (mongoError?.code === 11000) {
    return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
  }

  if (message.includes("mongodb_uri is not set")) {
    return NextResponse.json(
      { message: "MongoDB is not configured. Add MONGODB_URI to the deployment environment variables." },
      { status: 500 }
    );
  }

  if (message.includes("authentication failed") || message.includes("bad auth")) {
    return NextResponse.json(
      { message: "MongoDB authentication failed. Check the username and password in MONGODB_URI." },
      { status: 500 }
    );
  }

  if (
    message.includes("server selection timed out") ||
    message.includes("querysrv") ||
    message.includes("econnrefused") ||
    message.includes("enotfound") ||
    message.includes("before initial connection is complete") ||
    message.includes("buffering timed out") ||
    message.includes("connection is not open")
  ) {
    return NextResponse.json(
      {
        message:
          "Could not reach MongoDB. Check Atlas Network Access and make sure your deployment can connect to the cluster.",
      },
      { status: 500 }
    );
  }

  console.error("[register:error]", error);
  return NextResponse.json({ message: "Could not create your account right now." }, { status: 500 });
}

export async function POST(request: Request) {
  try {
    const payload = registerSchema.parse(await request.json());
    await connectToDatabase();

    const email = payload.email.toLowerCase().trim();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "An account with this email already exists." }, { status: 409 });
    }

    const password = await bcrypt.hash(payload.password, 12);
    const user = await User.create({
      name: payload.name.trim(),
      email,
      phone: payload.phone.trim(),
      password,
      gender: payload.gender || undefined,
      parentEmail: payload.parentEmail || undefined,
      liveLocationOptIn: Boolean(payload.parentEmail),
    });

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return getRegisterErrorResponse(error);
  }
}
