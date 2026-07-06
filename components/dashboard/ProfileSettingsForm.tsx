"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type ProfileSettingsFormProps = {
  parentEmail?: string;
  gender?: string;
  liveLocationOptIn: boolean;
  parentEmailOnJourney: boolean;
};

export function ProfileSettingsForm({
  parentEmail,
  gender,
  liveLocationOptIn,
  parentEmailOnJourney,
}: ProfileSettingsFormProps) {
  const [email, setEmail] = useState(parentEmail ?? "");
  const [selectedGender, setSelectedGender] = useState(gender ?? "");
  const [locationOptIn, setLocationOptIn] = useState(liveLocationOptIn);
  const [emailOnJourney, setEmailOnJourney] = useState(parentEmailOnJourney);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parentEmail: email,
        gender: selectedGender,
        liveLocationOptIn: locationOptIn,
        notificationPrefs: { parentEmailOnJourney: emailOnJourney },
      }),
    });
    setSaving(false);
    setMessage(response.ok ? "Settings saved." : "Could not save settings.");
  }

  return (
    <Card className="p-5">
      <p className="text-xs font-bold uppercase tracking-normal text-navy-700/50">Profile settings</p>
      <h2 className="mt-1 text-2xl font-semibold">Safety preferences</h2>
      <form className="mt-5 grid gap-4" onSubmit={saveSettings}>
        <label className="grid gap-2 text-sm font-semibold">
          Parent/guardian email
          <input
            className={inputClassName}
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="parent@example.com"
          />
        </label>

        <label className="grid gap-2 text-sm font-semibold">
          Gender
          <Select value={selectedGender || undefined} onValueChange={setSelectedGender}>
            <SelectTrigger>
              <SelectValue placeholder="Choose only if you want to" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
            </SelectContent>
          </Select>
        </label>

        <label className="flex items-center justify-between gap-4 rounded-2xl border border-navy-900/10 p-4 text-sm font-semibold">
          Live location opt-in
          <input
            className="h-5 w-5 accent-teal-600"
            type="checkbox"
            checked={locationOptIn}
            onChange={(event) => setLocationOptIn(event.target.checked)}
          />
        </label>

        <label className="flex items-center justify-between gap-4 rounded-2xl border border-navy-900/10 p-4 text-sm font-semibold">
          Email parent when journey starts
          <input
            className="h-5 w-5 accent-teal-600"
            type="checkbox"
            checked={emailOnJourney}
            onChange={(event) => setEmailOnJourney(event.target.checked)}
          />
        </label>

        <div className="flex items-center gap-3">
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save settings"}
          </Button>
          {message ? <p className="text-sm font-semibold text-teal-700">{message}</p> : null}
        </div>
      </form>
    </Card>
  );
}

const inputClassName =
  "h-11 w-full rounded-xl border border-navy-900/10 bg-white px-3 text-sm text-navy-900 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500";
