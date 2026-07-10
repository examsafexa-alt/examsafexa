import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Exam from "@/models/Exam";

export const dynamic = "force-dynamic";

export async function GET() {
  await connectToDatabase();
  const exams = (await Exam.find({}).sort({ category: 1, group: 1, name: 1 }).lean()) as any[];

  return NextResponse.json({
    exams: exams.map((exam) => ({
      id: String(exam._id),
      name: exam.name,
      code: exam.code,
      category: exam.category,
      examDate: exam.examDate,
      group: exam.group,
      conductingBody: exam.conductingBody,
      purpose: exam.purpose,
      sourceSheet: exam.sourceSheet,
    })),
  });
}
