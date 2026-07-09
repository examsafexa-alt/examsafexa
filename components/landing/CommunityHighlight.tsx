"use client";

import { motion } from "framer-motion";
import { MessageSquare, UserRound } from "lucide-react";

const ROUTE_POINTS = [
  { state: "Delhi", code: "DL", left: "18%", top: "18%", x: 115, y: 85, delay: 0 },
  { state: "Rajasthan", code: "RJ", left: "15%", top: "60%", x: 96, y: 270, delay: 0.7 },
  { state: "Bihar", code: "BR", left: "80%", top: "24%", x: 512, y: 108, delay: 1.4 },
  { state: "Madhya Pradesh", code: "MP", left: "24%", top: "74%", x: 154, y: 340, delay: 2.1 },
  { state: "West Bengal", code: "WB", left: "83%", top: "70%", x: 531, y: 315, delay: 2.8 },
  { state: "Maharashtra", code: "MH", left: "48%", top: "78%", x: 307, y: 360, delay: 3.5 },
];

const CENTER_POINT = { x: 320, y: 220, left: "50%", top: "50%" };

export function CommunityHighlight() {
  return (
    <section id="community" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
            Your Exam Community
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
            You&apos;re not the only one going to that center
          </h2>
          <p className="mt-4 max-w-lg text-navy-700/70">
            The moment you select your exam and center, ExamSafexa auto-matches
            you with every other student headed to the same place — so you can
            plan travel together, swap centre tips, and walk in a little less
            nervous.
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Matched automatically by exam + exact center — no searching.",
              "Coordinate a shared auto, train, or meetup point if you'd like.",
              "Ask questions about parking, entry gates, and timing from people who'll be there too.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-navy-700/80">
                <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 text-teal-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <ExamCenterAnimation />
      </div>
    </section>
  );
}

function ExamCenterAnimation() {
  return (
    <div
      className="relative mx-auto aspect-[1.12] w-full max-w-xl overflow-hidden rounded-3xl border border-navy-900/5 bg-white shadow-soft"
      aria-label="Animated map showing students from different states meeting at one exam center"
    >
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.65 }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(47,191,113,0.18),transparent_34%),linear-gradient(135deg,rgba(15,163,163,0.08),rgba(15,42,94,0.04))]" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 640 460"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="routeGradient" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#2FBF71" />
            <stop offset="100%" stopColor="#0FA3A3" />
          </linearGradient>
        </defs>

        {ROUTE_POINTS.map((point) => (
          <motion.path
            key={point.code}
            d={`M ${point.x} ${point.y} Q ${(point.x + CENTER_POINT.x) / 2} ${
              point.y < CENTER_POINT.y ? point.y + 48 : point.y - 48
            } ${CENTER_POINT.x} ${CENTER_POINT.y}`}
            fill="none"
            stroke="url(#routeGradient)"
            strokeLinecap="round"
            strokeWidth="3"
            strokeDasharray="9 14"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.7 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, delay: point.delay * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {ROUTE_POINTS.map((point) => (
        <div
          key={point.code}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1"
          style={{ left: point.left, top: point.top }}
        >
          <div className="grid h-11 w-11 place-items-center rounded-full border-2 border-white bg-navy-900 text-xs font-bold text-white shadow-card">
            {point.code}
          </div>
          <span className="hidden rounded-full bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-navy-700 shadow-sm sm:block">
            {point.state}
          </span>
        </div>
      ))}

      {ROUTE_POINTS.map((point) => (
        <motion.div
          key={`${point.code}-traveler`}
          className="absolute z-20 grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-2 border-white bg-brand-gradient text-white shadow-card"
          style={{ left: point.left, top: point.top }}
          animate={{
            left: [point.left, CENTER_POINT.left],
            top: [point.top, CENTER_POINT.top],
            opacity: [0, 1, 1, 0],
            scale: [0.75, 1, 0.92, 0.65],
          }}
          transition={{
            duration: 4.8,
            delay: point.delay,
            repeat: Infinity,
            repeatDelay: 1.2,
            ease: "easeInOut",
          }}
        >
          <UserRound className="h-4 w-4" />
        </motion.div>
      ))}

      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="grid h-28 w-28 place-items-center rounded-full border-4 border-white bg-navy-900 text-center text-sm font-bold uppercase leading-tight text-white shadow-soft ring-8 ring-white/55 backdrop-blur sm:h-32 sm:w-32 sm:text-base"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span>Exam Center</span>
        </motion.div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-30 w-[calc(100%-2.5rem)] -translate-x-1/2 rounded-2xl border border-navy-900/5 bg-white/80 px-4 py-3 text-center text-xs font-semibold text-navy-700/70 shadow-card backdrop-blur sm:text-sm">
        Students from nearby states get matched to the same exam center.
      </div>
    </div>
  );
}
