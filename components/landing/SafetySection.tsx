"use client";

import { motion } from "framer-motion";

import {
  MapPinned,
  UsersRound,
  BadgeCheck,
  HeartHandshake,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";

const FEATURES = [
  {
    icon: MapPinned,
    title: "Live location — your choice, your timing",
    copy: "Turn it on only for the journey to your center. Nothing is ever tracked by default. One tap on, one tap off.",
  },
  {
    icon: Eye,
    title: "Only your guardian sees it",
    copy: "Add one trusted email at signup. If you opt in, they — and only they — can see where you are in real time.",
  },
  {
    icon: UsersRound,
    title: "Travel with your community",
    copy: "Don't want to travel alone? Get matched with other students from your center heading the same way.",
  },
  {
    icon: BadgeCheck,
    title: "Verified-student identity",
    copy: "Every person in your center community is a real student — so you know exactly who you're coordinating with.",
  },
];

const REASSURANCES = [
  { icon: Lock, text: "Zero tracking by default — opt-in only" },
  { icon: EyeOff, text: "Guardian link expires after your exam" },
  { icon: HeartHandshake, text: "Built with women solo travelers in mind" },
];

export function SafetySection() {
  return (
    <section
      id="safety"
      className="overflow-hidden bg-[radial-gradient(ellipse_at_60%_0%,rgba(200,90,131,0.22),transparent_55%),linear-gradient(180deg,#FDEEF4_0%,#F9D9E8_100%)] py-24"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* ── Hero statement row ── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">

          {/* Left — headline & reassurance pills */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-[#B33D70]">
              Safety · Especially for women &amp; solo travelers
            </p>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.18] text-navy-900 sm:text-5xl">
              You should never have to travel to an exam{" "}
              <span
                style={{
                  backgroundImage:
                    "linear-gradient(90deg,#C85A83 0%,#A72E64 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                alone or unseen.
              </span>
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-navy-700/75">
              Every safety feature below is entirely opt-in — built with women
              traveling to unfamiliar exam centers in mind, but available to
              every student who wants the extra reassurance.
            </p>

            {/* Reassurance pills */}
            <ul className="mt-8 flex flex-col gap-3">
              {REASSURANCES.map((r) => (
                <li key={r.text} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#A72E64]/10">
                    <r.icon className="h-4 w-4 text-[#A72E64]" />
                  </span>
                  <span className="text-sm font-semibold text-navy-900">
                    {r.text}
                  </span>
                </li>
              ))}
            </ul>


          </motion.div>

          {/* Right — feature cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                className="rounded-2xl bg-white/90 p-6 shadow-[0_12px_32px_-14px_rgba(179,61,112,0.35)] backdrop-blur"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F2B8CE]">
                  <f.icon className="h-5 w-5 text-[#A72E64]" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold leading-snug text-navy-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-700/70">
                  {f.copy}
                </p>
              </motion.div>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}
