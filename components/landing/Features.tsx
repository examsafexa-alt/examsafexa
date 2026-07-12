"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Smartphone,
  Siren,
  MapPinned,
  Building2,
  Train,
  Star,
  Handshake,
  Sparkles,
} from "lucide-react";

const LIVE_FEATURES = [
  {
    icon: MapPinned,
    label: "Live",
    title: "Exam center navigation",
    copy: "Route and real-time travel-time guidance the moment your center is confirmed.",
    status: "live" as const,
  },
  {
    icon: BadgeCheck,
    label: "Live",
    title: "Verified-student badge",
    copy: "Every member in your center community is a real, registered exam-goer.",
    status: "live" as const,
  },
  {
    icon: Star,
    label: "Live",
    title: "Community matching",
    copy: "Auto-matched by exam + exact center. Coordinate travel, share tips, arrive calmer.",
    status: "live" as const,
  },
];

const UPCOMING_FEATURES = [
  {
    icon: BadgeCheck,
    title: "Admit-card verification",
    copy: "A stronger verified badge confirming group members are genuine exam-goers, not just self-declared.",
  },
  {
    icon: Smartphone,
    title: "The ExamSafexa app",
    copy: "A dedicated mobile app for faster group formation, real-time chat, and safety alerts on the go.",
  },
  {
    icon: Siren,
    title: "Emergency SOS",
    copy: "One-tap alert to a saved emergency contact with live location for solo travelers.",
  },
  {
    icon: Building2,
    title: "Verified accommodation",
    copy: "PGs, hostels, and budget stays near exam centers — vetted for safety and proximity.",
  },
  {
    icon: Train,
    title: "Train, bus & cab booking",
    copy: "Integrated booking assistance for your exam-day journey, built right into the platform.",
  },
  {
    icon: Star,
    title: "Premium tier",
    copy: "Priority matching, concierge support, and booking access. Your core group-matching will always stay free.",
  },
  {
    icon: Handshake,
    title: "Institute partnerships",
    copy: "Coaching institutes will offer verified safety and travel support directly to their students.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="mx-auto max-w-7xl px-5 py-24 lg:px-8"
    >
      {/* ── Section header ── */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          Features
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Everything you need, exam day and beyond
        </h2>
        <p className="mt-4 text-navy-700/70">
          Some features are live today. The rest are in the pipeline every
          one built around keeping students safe, connected, and stress-free.
        </p>
      </div>

      {/* ── Live features ── */}
      <div className="mt-14">
        <div className="mb-5 flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
          <p className="text-sm font-semibold text-emerald-700">
            Available now
          </p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {LIVE_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="relative flex flex-col rounded-2xl border border-emerald-200 bg-white p-6 shadow-card"
            >
              {/* Live chip */}
              <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700">
                Live
              </span>
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-navy-900">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                {f.copy}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="my-12 flex items-center gap-4">
        <div className="h-px flex-1 bg-navy-900/8" />
        <div className="flex items-center gap-2 rounded-full border border-navy-900/10 bg-navy-50 px-4 py-1.5">
  
          <span className="text-xs font-semibold text-navy-700">
            Coming soon
          </span>
        </div>
        <div className="h-px flex-1 bg-navy-900/8" />
      </div>

      {/* ── Upcoming features grid ── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {UPCOMING_FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="flex flex-col rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card"
          >
            {/* Coming-soon chip */}
            <span className="mb-4 inline-flex w-fit items-center gap-1 rounded-full bg-navy-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-navy-700/60">
              Soon
            </span>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-50 text-navy-700">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 font-display text-base font-semibold text-navy-900">
              {f.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-navy-700/65">
              {f.copy}
            </p>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
