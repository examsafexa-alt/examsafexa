import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { CalendarDays, History, MapPin, ShieldCheck, Users } from "lucide-react";
import { authOptions } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Community from "@/models/Community";
import LocationShare from "@/models/LocationShare";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JourneyModePanel } from "@/components/dashboard/JourneyModePanel";
import { ProfileSettingsForm } from "@/components/dashboard/ProfileSettingsForm";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  await connectToDatabase();
  const user = (await User.findById(session.user.id).populate("examSelected").populate("examCenterSelected").lean()) as any;
  if (!user) redirect("/login");

  const exam = user.examSelected as any;
  const center = user.examCenterSelected as any;
  const community = exam && center
    ? ((await Community.findOne({ examId: exam._id, examCenterId: center._id }).lean()) as any)
    : null;
  const activeJourney = (await LocationShare.findOne({ userId: user._id, isActive: true }).lean()) as any;
  const pastJourneys = (await LocationShare.find({ userId: user._id, isActive: false })
    .sort({ journeyStartedAt: -1 })
    .limit(3)
    .lean()) as any[];
  const countdown = exam?.examDate ? getCountdownLabel(exam.examDate) : "Choose your exam to continue";

  return (
    <main className="min-h-screen bg-cloud px-5 py-8 text-navy-900">
      <div className="mx-auto grid max-w-6xl gap-6">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-600">ExamSafexa dashboard</p>
            <h1 className="font-display text-4xl font-semibold">Hi, {user.name}</h1>
          </div>
          <Button asChild>
            <Link href="/onboarding/select-exam">Update exam setup</Link>
          </Button>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Selected exam"
            value={exam?.name ?? "Not selected"}
            detail={exam?.examDate ? `${new Date(exam.examDate).toLocaleDateString("en-IN", { dateStyle: "medium" })} · ${countdown}` : countdown}
          />
          <DashboardCard
            icon={<MapPin className="h-5 w-5" />}
            label="Exam center"
            value={center?.name ?? "Not selected"}
            detail={center ? `${center.city}, ${center.state}` : "Select your center after exam selection"}
          />
          <DashboardCard
            icon={<ShieldCheck className="h-5 w-5" />}
            label="Safety contact"
            value={user.parentEmail ?? "Optional"}
            detail={user.liveLocationOptIn ? "Live-location opt-in is on" : "Turn on from profile settings"}
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <JourneyModePanel
            liveLocationOptIn={Boolean(user.liveLocationOptIn)}
            parentEmail={user.parentEmail}
            initialActive={Boolean(activeJourney)}
            initialTrackingUrl={activeJourney?.shareToken ? `/track/${activeJourney.shareToken}` : undefined}
          />
          <Card className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">Community snapshot</p>
                <h2 className="mt-1 text-2xl font-semibold">
                  {community ? `${community.memberIds?.length ?? 0} matched students` : "No community yet"}
                </h2>
              </div>
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
                <Users className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm text-navy-700/70">
              {community
                ? "Matched by the same exam and center. Buddy matching is center-scoped for Phase 3."
                : "Choose both exam and center to create or join a center community."}
            </p>
            {community ? (
              <Button asChild className="mt-5" variant="outline">
                <Link href="/community">Open community</Link>
              </Button>
            ) : null}
          </Card>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="p-5">
            <div className="mb-4 flex items-center gap-3">
              <History className="h-5 w-5 text-teal-600" />
              <h2 className="text-2xl font-semibold">Past journeys</h2>
            </div>
            {pastJourneys.length ? (
              <div className="grid gap-3">
                {pastJourneys.map((journey) => (
                  <div key={String(journey._id)} className="rounded-2xl border border-navy-900/10 p-4">
                    <p className="font-semibold">
                      {journey.journeyStartedAt
                        ? new Date(journey.journeyStartedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
                        : "Journey"}
                    </p>
                    <p className="mt-1 text-sm text-navy-700/65">
                      Ended {journey.journeyEndedAt ? new Date(journey.journeyEndedAt).toLocaleTimeString("en-IN", { timeStyle: "short" }) : "without a stop time"}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-navy-700/70">No completed journeys yet.</p>
            )}
          </Card>

          <ProfileSettingsForm
            parentEmail={user.parentEmail}
            gender={user.gender}
            liveLocationOptIn={Boolean(user.liveLocationOptIn)}
            parentEmailOnJourney={user.notificationPrefs?.parentEmailOnJourney ?? true}
          />
        </div>
      </div>
    </main>
  );
}

function getCountdownLabel(examDate: Date | string) {
  const examTime = new Date(examDate).getTime();
  const days = Math.ceil((examTime - Date.now()) / (1000 * 60 * 60 * 24));
  if (days < 0) return "Date passed";
  if (days === 0) return "Today";
  return `${days} days left`;
}

function DashboardCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <Card className="p-5">
      <div className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
        {icon}
      </div>
      <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">{label}</p>
      <h2 className="mt-2 text-xl font-semibold">{value}</h2>
      <p className="mt-2 text-sm text-navy-700/65">{detail}</p>
    </Card>
  );
}
