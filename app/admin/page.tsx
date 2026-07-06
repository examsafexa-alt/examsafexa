import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Activity, Building2, ClipboardList, GraduationCap, Users } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { isAdminEmail } from "@/lib/admin";
import { connectToDatabase } from "@/lib/db";
import CenterRequest from "@/models/CenterRequest";
import Community from "@/models/Community";
import Exam from "@/models/Exam";
import ExamCenter from "@/models/ExamCenter";
import LocationShare from "@/models/LocationShare";
import User from "@/models/User";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect("/login");
  if (!isAdminEmail(session.user.email)) redirect("/dashboard");

  await connectToDatabase();
  const [examCount, centerCount, userCount, communityCount, activeJourneyCount, centerRequests] = await Promise.all([
    Exam.countDocuments(),
    ExamCenter.countDocuments(),
    User.countDocuments(),
    Community.countDocuments(),
    LocationShare.countDocuments({ isActive: true }),
    CenterRequest.find({}).sort({ createdAt: -1 }).limit(10).populate({ path: "examId", model: Exam }).lean(),
  ]);

  return (
    <main className="min-h-screen bg-cloud px-5 py-8 text-navy-900">
      <div className="mx-auto grid max-w-6xl gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-600">Admin panel</p>
            <h1 className="font-display text-4xl font-semibold">Moderator overview</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </header>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Metric icon={<GraduationCap className="h-5 w-5" />} label="Exams" value={examCount} />
          <Metric icon={<Building2 className="h-5 w-5" />} label="Centers" value={centerCount} />
          <Metric icon={<Users className="h-5 w-5" />} label="Students" value={userCount} />
          <Metric icon={<ClipboardList className="h-5 w-5" />} label="Communities" value={communityCount} />
          <Metric icon={<Activity className="h-5 w-5" />} label="Active journeys" value={activeJourneyCount} />
        </div>

        <Card className="p-5">
          <h2 className="text-2xl font-semibold">Center request queue</h2>
          <div className="mt-5 grid gap-3">
            {centerRequests.length ? (
              centerRequests.map((request: any) => (
                <div key={String(request._id)} className="rounded-2xl border border-navy-900/10 p-4">
                  <p className="font-semibold">{request.centerName}</p>
                  <p className="mt-1 text-sm text-navy-700/70">
                    {request.city}
                    {request.state ? `, ${request.state}` : ""} · {request.examId?.name ?? "Exam"}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-navy-700/70">No center requests yet.</p>
            )}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-2xl font-semibold">Phase 5 remaining controls</h2>
          <p className="mt-2 text-sm text-navy-700/70">
            CRUD forms for exams and centers, report review actions, and public stats publishing should build on this protected admin route.
          </p>
        </Card>
      </div>
    </main>
  );
}

function Metric({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <Card className="p-5">
      <div className="mb-4 grid h-10 w-10 place-items-center rounded-2xl bg-teal-50 text-teal-700">{icon}</div>
      <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">{label}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </Card>
  );
}
