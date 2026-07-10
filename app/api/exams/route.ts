import { NextResponse } from "next/server";
import { EXAM_CATALOG } from "@/lib/examCatalog";

export const dynamic = "force-dynamic";

export async function GET() {
  // Try MongoDB first; fall back to static catalog if DB is unavailable or empty.
  try {
    const { connectToDatabase } = await import("@/lib/db");
    const Exam = (await import("@/models/Exam")).default;

    await connectToDatabase();
    const exams = (await Exam.find({}).sort({ category: 1, group: 1, name: 1 }).lean()) as any[];

    if (exams.length > 0) {
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
  } catch (_err) {
    // DB unreachable — fall through to static catalog
  }

  // Static fallback: return catalog with code as id (no examDate)
  return NextResponse.json({
    exams: EXAM_CATALOG.map((exam) => ({
      id: exam.code,
      name: exam.name,
      code: exam.code,
      category: exam.category,
      examDate: undefined,
      group: (exam as any).group,
      conductingBody: (exam as any).conductingBody,
      purpose: (exam as any).purpose,
      sourceSheet: (exam as any).sourceSheet,
    })),
  });
}
