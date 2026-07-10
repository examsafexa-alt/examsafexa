"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  Camera,
  GraduationCap,
  HeartHandshake,
  MapPinned,
  ShieldCheck,
  Sparkles,
  UsersRound,
} from "lucide-react";

const TEAM = [
  {
    name: "Anisha Jaiswal",
    role: "Founder & Owner, Safexa Technology Company",
    copy: "Leads the vision for Exam Safexa and Safexa Technology, building a safer exam journey for students and the families who worry about them.",
    head: true,
    initials: "AJ",
  },
  {
    name: "Deepanshu Yadav",
    role: "Research & Development",
    copy: "Researches exams, universities, scholarships, and student needs to shape product planning and market validation.",
    initials: "DY",
  },
  {
    name: "Satyam Kumar Kesarwani",
    role: "Technology",
    copy: "Builds the platform architecture, backend systems, and matching experience that power Exam Safexa.",
    initials: "SK",
  },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: "Verified by intent",
    copy: "Students connect around real exam, city, and center context before making travel plans.",
  },
  {
    icon: MapPinned,
    title: "Built for journeys",
    copy: "The product focuses on the exact time when students need clarity, company, and safety.",
  },
  {
    icon: HeartHandshake,
    title: "Family confidence",
    copy: "Safety choices, journey mode, and contact preferences keep parents in the loop when needed.",
  },
];

export function Company() {
  return (
    <section id="company" className="bg-cloud text-navy-900">
      <div className="bg-navy-900 text-white">
        <div className="mx-auto grid min-h-[calc(100vh-84px)] max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Company
            </p>
            <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              About Exam Safexa
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              Every year, millions of Indian students travel to unfamiliar cities
              for exams that can shape their future. Exam Safexa exists so that
              journey feels safer, more verified, and less lonely.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/70">
              We help students find others appearing for the same exam, in the
              same city, around the same date. Students arrange their own travel;
              we help make sure they are not planning it as strangers.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoBlock
                icon={<Building2 className="h-5 w-5" />}
                title="Mission"
                copy="Make every exam journey from home to center safe, verified, and stress-free for students and their families."
              />
              <InfoBlock
                icon={<BadgeCheck className="h-5 w-5" />}
                title="Vision"
                copy="A future where no student has to travel alone for an exam without trusted support beside them."
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid gap-4"
          >
            <div className="grid aspect-[4/3] place-items-center rounded-lg border border-white/10 bg-white/8 p-6 shadow-[0_32px_90px_-46px_rgba(20,184,174,0.75)]">
              <div className="text-center">
                <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-white/10 text-teal-300">
                  <Camera className="h-9 w-9" />
                </div>
                <p className="mt-5 font-display text-2xl font-semibold">
                  Company photo space
                </p>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-white/62">
                  Add your office, team, founder, or student-safety visual here
                  when your photo set is ready.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="rounded-lg border border-white/10 bg-white/8 p-4">
                  <Icon className="h-5 w-5 text-teal-300" />
                  <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                  <p className="mt-2 text-xs leading-5 text-white/62">{copy}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <UsersRound className="h-5 w-5 text-teal-600" />
              <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">
                Team
              </p>
            </div>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              The Team Behind Exam Safexa
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-navy-700/70">
            A small team building the product, research, and safety systems
            behind each student journey.
          </p>
        </div>

        <div className="mt-9 grid gap-5 lg:grid-cols-[1.35fr_0.85fr]">
          {TEAM.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className={
                member.head
                  ? "rounded-lg border border-teal-200 bg-white p-5 shadow-card lg:row-span-2 lg:p-6"
                  : "rounded-lg border border-navy-900/10 bg-white p-5 shadow-card lg:grid lg:grid-cols-[150px_1fr] lg:gap-5"
              }
            >
              <div
                className={
                  member.head
                    ? "grid aspect-[4/3] place-items-center rounded-lg border border-dashed border-navy-900/15 bg-navy-50 text-navy-700 lg:aspect-[5/4]"
                    : "grid aspect-square place-items-center rounded-lg border border-dashed border-navy-900/15 bg-navy-50 text-navy-700"
                }
              >
                <div className="text-center">
                  <div
                    className={
                      member.head
                        ? "mx-auto grid h-20 w-20 place-items-center rounded-full bg-white text-2xl font-bold text-teal-700 shadow-sm"
                        : "mx-auto grid h-12 w-12 place-items-center rounded-full bg-white text-base font-bold text-teal-700 shadow-sm"
                    }
                  >
                    {member.initials}
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-navy-700/45">
                    Photo space
                  </p>
                </div>
              </div>

              <div className={member.head ? "mt-6" : "mt-5 lg:mt-0"}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className={
                        member.head
                          ? "font-display text-3xl font-semibold text-navy-900 sm:text-4xl"
                          : "font-display text-2xl font-semibold text-navy-900 lg:text-xl"
                      }
                    >
                      {member.name}
                    </h3>
                    <p
                      className={
                        member.head
                          ? "mt-2 text-base font-semibold text-teal-700"
                          : "mt-1 text-sm font-semibold text-teal-700"
                      }
                    >
                      {member.role}
                    </p>
                  </div>
                  {member.head ? (
                    <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700">
                      <GraduationCap className="h-3.5 w-3.5" />
                      Founder
                    </div>
                  ) : null}
                </div>

                <p
                  className={
                    member.head
                      ? "mt-5 max-w-2xl text-base leading-8 text-navy-700/75"
                      : "mt-3 text-sm leading-6 text-navy-700/72"
                  }
                >
                  {member.copy}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 rounded-lg border border-navy-900/10 bg-white p-6 shadow-card">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-teal-50 text-teal-700">
             
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">
                More stories can grow here
              </h2>
              <p className="mt-2 text-sm leading-6 text-navy-700/70">
                This page is ready for future team photos, company moments,
                milestones, student stories, or office images without changing
                the main layout.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoBlock({
  icon,
  title,
  copy,
}: {
  icon: React.ReactNode;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/8 p-5">
      <div className="text-teal-300">{icon}</div>
      <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/68">{copy}</p>
    </div>
  );
}
