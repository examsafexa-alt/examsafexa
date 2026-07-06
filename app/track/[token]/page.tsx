import { MapPin, ShieldCheck } from "lucide-react";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import LocationShare from "@/models/LocationShare";
import User from "@/models/User";
import { Card } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function TrackingPage({ params }: { params: { token: string } }) {
  await connectToDatabase();
  const share = (await LocationShare.findOne({ shareToken: params.token })
    .populate({ path: "userId", model: User, select: "name" })
    .lean()) as any;

  if (!share) notFound();

  const location = share.lastLocation;
  const updatedAt = location?.updatedAt
    ? new Date(location.updatedAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
    : "Waiting for first location update";

  return (
    <main className="min-h-screen bg-cloud px-5 py-8 text-navy-900">
      <div className="mx-auto grid max-w-3xl gap-5">
        <header>
          <p className="text-sm font-semibold text-teal-600">ExamSafexa read-only tracking</p>
          <h1 className="font-display text-4xl font-semibold">{share.userId?.name ?? "Student"}&apos;s journey</h1>
        </header>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-teal-50 text-teal-700">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-normal text-navy-700/50">Status</p>
              <h2 className="text-2xl font-semibold">{share.isActive ? "Journey mode active" : "Journey ended"}</h2>
            </div>
          </div>
          <p className="mt-4 text-sm text-navy-700/70">
            This link updates when the student shares location from their browser. It is read-only and does not expose account access.
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 shrink-0 text-teal-600" />
            <div>
              <p className="font-semibold">Last location</p>
              {location ? (
                <>
                  <p className="mt-1 text-sm text-navy-700/70">
                    {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
                  </p>
                  <a
                    className="mt-3 inline-flex text-sm font-semibold text-teal-700 hover:underline"
                    href={`https://www.google.com/maps?q=${location.lat},${location.lng}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </>
              ) : (
                <p className="mt-1 text-sm text-navy-700/70">No browser location update has arrived yet.</p>
              )}
              <p className="mt-3 text-xs font-bold uppercase tracking-normal text-navy-700/45">{updatedAt}</p>
            </div>
          </div>
        </Card>
      </div>
    </main>
  );
}
