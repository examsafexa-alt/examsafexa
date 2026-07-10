"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type Testimonial = {
  quote: string;
  name: string;
  detail: string;
};

// Placeholder testimonials — swap for real student quotes post-launch.
const TESTIMONIALS: Testimonial[] = [
  // {
  //   quote:
  //     "I found three other people going to my center and we shared an auto on exam day. Genuinely calmed my nerves.",
  //   name: "Ritika P.",
  //   detail: "NEET UG aspirant, Prayagraj",
  // },
  // {
  //   quote:
  //     "Seeing the route a week early meant no last-minute panic about how to get there.",
  //   name: "Aman J.",
  //   detail: "JEE Main aspirant, Kanpur",
  // },
  // {
  //   quote:
  //     "My mother could see I'd reached safely without me having to call every ten minutes.",
  //   name: "Sneha K.",
  //   detail: "UPSC CSE aspirant, Lucknow",
  // },
];

const TRUST_STATS = [
  { value: 50, suffix: "+", label: "Students" },
  { value: 500, suffix: "+", label: "Cities" },
  { value: 28, suffix: "+", label: "States" },
] as const;

export function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          Trusted By Students Preparing For All Exams
        </p>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {TRUST_STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-navy-900/5 bg-white px-6 py-5 shadow-card"
            >
              <div className="font-display text-4xl font-semibold text-navy-900">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="mt-1 text-sm font-semibold uppercase tracking-wide text-navy-700/60">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {TESTIMONIALS.length > 0 ? (
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-2xl border border-navy-900/5 bg-white p-6 shadow-card"
            >
              <blockquote className="font-display text-base italic leading-relaxed text-navy-900">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-4 text-sm">
                <span className="font-semibold text-navy-900">{t.name}</span>
                <span className="text-navy-700/60"> — {t.detail}</span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;
    const totalFrames = 56;

    const tick = () => {
      frame += 1;
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setValue(Math.round(end * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    };

    const animation = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animation);
  }, [end, isInView]);

  return (
    <span ref={ref}>
      {value}
      {suffix}
    </span>
  );
}
