import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { Bell, MapPin, MessageSquareWarning, Users } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import Community from "@/models/Community";
import Exam from "@/models/Exam";
import ExamCenter from "@/models/ExamCenter";
import User from "@/models/User";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  await connectToDatabase();
  const user = (await User.findById(session.user.id).lean()) as any;
  if (!user) redirect("/login");
  if (!user.examSelected || !user.examCenterSelected) redirect("/onboarding/select-exam");

  const community = (await Community.findOne({
    examId: user.examSelected,
    examCenterId: user.examCenterSelected,
  })
    .populate({ path: "examId", model: Exam })
    .populate({ path: "examCenterId", model: ExamCenter })
    .populate({ path: "memberIds", model: User, select: "name gender" })
    .lean()) as any;

  if (!community) redirect("/dashboard");

  const exam = community.examId;
  const center = community.examCenterId;
  const members = (community.memberIds ?? []) as any[];

  return (
    <main className="min-h-screen bg-cloud px-5 py-8 text-navy-900">
      <div className="mx-auto grid max-w-6xl gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-600">Center community</p>
            <h1 className="font-display text-4xl font-semibold">{exam?.name ?? "Exam"} at {center?.name ?? "your center"}</h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/dashboard">Back to dashboard</Link>
          </Button>
        </header>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">Members</p>
                <h2 className="mt-1 text-2xl font-semibold">{members.length} students matched</h2>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                <Users className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {members.map((member) => (
                <div
                  key={String(member._id)}
                  className="flex items-center gap-2 rounded-full border border-navy-900/10 bg-white py-2 pl-2 pr-4"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-navy-900 text-sm font-bold text-white">
                    {initials(member.name)}
                  </span>
                  <span className="text-sm font-semibold">{member.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
              <div>
                <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">Exam center</p>
                <h2 className="mt-1 text-2xl font-semibold">{center?.name}</h2>
                <p className="mt-2 text-sm text-navy-700/70">
                  {center?.address}, {center?.city}, {center?.state}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-5">
          <div className="mb-5 flex items-center gap-3">
            <Bell className="h-5 w-5 text-teal-600" />
            <h2 className="text-2xl font-semibold">Community announcements</h2>
          </div>
          <div className="grid gap-3">
            <Announcement title="Community matched" detail="This group is automatically formed from students with the same selected exam and exam center." />
            <Announcement title="Buddy matching scope" detail="Phase 3 uses whole-center communities first. Small buddy clusters can be layered on after there are enough active members per center." />
            <Announcement title="Chat scope" detail="Full chat is intentionally deferred to Phase 3.5. This keeps moderation and misuse review simpler while the safety layer comes online." />
          </div>
        </Card>

        <Card className="border-rose-200 bg-rose-50 p-5 shadow-none">
          <div className="flex items-start gap-3">
            <MessageSquareWarning className="mt-1 h-5 w-5 shrink-0 text-rose-600" />
            <div>
              <h2 className="text-xl font-semibold">Report misuse flow pending admin review tools</h2>
              <p className="mt-1 text-sm text-navy-700/70">
                Moderation queues and report handling belong in the Phase 5 admin panel. Until then this community stays announcement-only.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}

function initials(name?: string) {
  return (name ?? "S")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function Announcement({ title, detail }: { title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-navy-900/10 p-4">
      <p className="font-semibold">{title}</p>
      <p className="mt-1 text-sm text-navy-700/70">{detail}</p>
    </div>
  );
}
