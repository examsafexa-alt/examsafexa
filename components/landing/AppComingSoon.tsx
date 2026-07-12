"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Smartphone, Apple, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Smartphone,
    title: "Live route & navigation",
    copy: "Turn-by-turn directions to your exam center with live traffic, right from your phone.",
  },
  {
    icon: Bell,
    title: "Exam-day alerts",
    copy: "Get reminders, gate updates, and last-minute tips from your center community.",
  },
  {
    icon: Star,
    title: "Safety on the go",
    copy: "One-tap live location sharing with your guardian — only when you want it.",
  },
];

export function AppComingSoon() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleNotify(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
    setEmail("");
  }

  return (
    <section className="mx-auto max-w-7xl px-5 pt-24 pb-10 lg:px-8">
      {/* Section header — same pattern as HowItWorks / CommunityHighlight */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          Mobile App
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          ExamSafexa is coming to your pocket
        </h2>
        <p className="mt-4 text-navy-700/70">
          Everything you love on the web routes, community, safety alerts 
          arriving on iOS &amp; Android soon. Be first to know.
        </p>
      </div>

      {/* Feature cards — same grid as HowItWorks */}
      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="flex flex-col rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card"
          >
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

      {/* Bottom banner — same pattern as FinalCTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, delay: 0.2 }}
        className="relative mt-10 overflow-hidden rounded-3xl bg-navy-gradient px-8 py-14 text-center sm:px-16"
      >
        {/* Glow orb — same as FinalCTA */}
        <div
          className="absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-brand-gradient opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 left-[-8%] h-56 w-56 rounded-full bg-teal-500/30 blur-3xl"
          aria-hidden="true"
        />

        {/* Pulsing live badge */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white/80">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Launching Soon
        </div>

        <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
          The app is on its way. Get early access.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm text-white/70">
          Drop your email and we&apos;ll notify you the moment it lands on the App Store and Google Play.
        </p>

        {/* Store chips */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <div className="flex cursor-not-allowed items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
            <Apple className="h-5 w-5 text-white" />
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">Coming to</p>
              <p className="text-sm font-semibold text-white leading-none mt-0.5">App Store</p>
            </div>
          </div>
          <div className="flex cursor-not-allowed items-center gap-2.5 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 backdrop-blur-sm">
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M3.18 1.4a1.5 1.5 0 0 0-.68 1.28v18.64c0 .54.28 1.01.68 1.28l.07.06 10.44-10.44v-.25L3.25 1.34l-.07.06Z" fill="#EA4335" />
              <path d="M17.16 15.63 13.69 12.17v-.25l3.47-3.47.08.05 4.11 2.34c1.17.67 1.17 1.76 0 2.43l-4.11 2.34-.08.02Z" fill="#FBBC04" />
              <path d="M17.24 15.61 13.69 12.04 3.18 22.6c.39.41.99.46 1.68.05l12.38-7.04" fill="#34A853" />
              <path d="M17.24 8.47 4.86 1.43C4.17 1.02 3.57 1.07 3.18 1.48l10.51 10.56 3.55-3.57Z" fill="#4285F4" />
            </svg>
            <div className="text-left">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/50">Coming to</p>
              <p className="text-sm font-semibold text-white leading-none mt-0.5">Google Play</p>
            </div>
          </div>
        </div>

        {/* Notify-me form */}
        <div className="mx-auto mt-8 max-w-md">
          {submitted ? (
            <div className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4">
              <Star className="h-5 w-5 shrink-0 text-emerald-400" />
              <p className="text-sm font-semibold text-white">
                You&apos;re on the list! We&apos;ll email you when we launch. 🎉
              </p>
            </div>
          ) : (
            <form onSubmit={handleNotify} className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="h-12 flex-1 rounded-full border border-white/15 bg-white/10 px-5 text-sm text-white placeholder:text-white/40 outline-none transition focus:border-emerald-400/60 focus:ring-2 focus:ring-emerald-400/25"
              />
              <button
                type="submit"
                disabled={loading}
                className="h-12 shrink-0 rounded-full bg-brand-gradient px-7 text-sm font-semibold text-white shadow-soft transition hover:brightness-110 disabled:opacity-60"
              >
                {loading ? "Saving…" : "Notify Me"}
              </button>
            </form>
          )}
          <p className="mt-3 text-xs text-white/40">
            No spam. Just one email when we launch.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
