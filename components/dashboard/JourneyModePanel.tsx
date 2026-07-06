"use client";

import { useEffect, useRef, useState } from "react";
import { Bell, LocateFixed, ShieldCheck, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type JourneyModePanelProps = {
  liveLocationOptIn: boolean;
  parentEmail?: string;
  initialActive: boolean;
  initialTrackingUrl?: string;
};

export function JourneyModePanel({
  liveLocationOptIn,
  parentEmail,
  initialActive,
  initialTrackingUrl,
}: JourneyModePanelProps) {
  const watchId = useRef<number | null>(null);
  const [active, setActive] = useState(initialActive);
  const [trackingUrl, setTrackingUrl] = useState(initialTrackingUrl);
  const [status, setStatus] = useState(initialActive ? "Journey mode is already active." : "Ready when you are.");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    return () => {
      if (watchId.current !== null) navigator.geolocation.clearWatch(watchId.current);
    };
  }, []);

  async function pushLocation(position: GeolocationPosition) {
    await fetch("/api/journey", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
      }),
    }).catch(() => setStatus("Location update failed. We will retry on the next browser update."));
  }

  function startWatcher() {
    if (!("geolocation" in navigator)) {
      setStatus("This browser does not support live location.");
      return;
    }

    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        setStatus("Live location is updating.");
        void pushLocation(position);
      },
      () => setStatus("Location permission was blocked or unavailable."),
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 }
    );
  }

  async function startJourney() {
    setBusy(true);
    setStatus("Starting journey mode...");
    const response = await fetch("/api/journey", { method: "POST" });
    const payload = await response.json().catch(() => null);
    setBusy(false);

    if (!response.ok) {
      setStatus(payload?.message ?? "Could not start journey mode.");
      return;
    }

    setActive(true);
    setTrackingUrl(payload.trackingUrl);
    setStatus(parentEmail ? "Journey started. Parent notification is queued." : "Journey started. Add parent email for alerts.");
    startWatcher();
  }

  async function stopJourney() {
    setBusy(true);
    await fetch("/api/journey", { method: "DELETE" });
    setBusy(false);
    setActive(false);
    setStatus("Journey mode stopped.");
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
      watchId.current = null;
    }
  }

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">Journey mode</p>
          <h2 className="mt-1 text-2xl font-semibold">{active ? "Sharing live location" : "Start when leaving"}</h2>
        </div>
        <div className="grid h-11 w-11 place-items-center rounded-2xl bg-rose-50 text-rose-600">
          <ShieldCheck className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-navy-700/70">
        <p>{status}</p>
        <p className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-teal-600" />
          {parentEmail ? `Parent alert: ${parentEmail}` : "No parent email saved yet"}
        </p>
        {trackingUrl ? (
          <a className="font-semibold text-teal-700 hover:underline" href={trackingUrl} target="_blank" rel="noreferrer">
            Open read-only tracking link
          </a>
        ) : null}
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button type="button" disabled={!liveLocationOptIn || active || busy} onClick={startJourney}>
          <LocateFixed className="h-4 w-4" />
          Start journey
        </Button>
        <Button type="button" variant="outline" disabled={!active || busy} onClick={stopJourney}>
          <Square className="h-4 w-4" />
          Stop
        </Button>
      </div>

      {!liveLocationOptIn ? (
        <p className="mt-3 text-xs font-semibold text-rose-600">Turn on live location opt-in from profile settings to use this.</p>
      ) : null}
    </Card>
  );
}
