"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  Building2,
  GraduationCap,
  HeartHandshake,
  Linkedin,
  MapPinned,
  ShieldCheck,
  UsersRound,
} from "lucide-react";

const TEAM = [
  {
    name: "Anisha Jaiswal",
    role: "Founder & Owner, Safexa Technologies Company",
    tag: "Founder",
    edu: "MBA in Human Resources Management, National Institute of Technology, Kurukshetra",
    copy: "Leads the vision for Exam Safexa and Safexa Technology, building a safer exam journey for students and the families who worry about them. Started this because every year, millions of Indian students travel alone to exams that can change their lives — with no trusted way to find someone to make that journey with.",
    quote: "Thank you for being here this early. Never travel alone for an exam.",
    linkedin: "https://www.linkedin.com/in/anisha-jaiswal-125870100/",
    head: true,
    initials: "AJ",
  },
  {
    name: "Deepanshu Yadav",
    role: "Core Team — Research & Development",
    tag: "R&D",
    edu: "MBA in Business Analytics, Kurukshetra University",
    copy: "Leads R&D at Exam Safexa — researching government exams, universities, scholarships, and student needs to shape what we build next. Works on product planning, exam database design, user journey mapping, and market validation.",
    linkedin: "",
    initials: "DY",
  },
  {
    name: "Satyam Kumar Kesarwani",
    role: "Core Team — Technology",
    tag: "Engineering",
    edu: "B.Tech in Computer Science & Engineering, NIT Agartala",
    copy: "Leads engineering at Exam Safexa — backend, full-stack architecture, and the platform's matching engine. Currently interning in AI/backend engineering at the National Informatics Centre (NIC), with hands-on experience shipping full-stack platforms with real users.",
    linkedin: "https://www.linkedin.com/in/satyam-kumar-kesarwani-763b61293/",
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
    copy: "The product focuses on the exact time when students need clarity, company, and safety most.",
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
      {/* ── Hero banner ── */}
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
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Every year, millions of Indian students travel to unfamiliar cities
              for exams that can shape their entire future. Exam Safexa exists
              so that journey feels safer, more connected, and less lonely.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/65">
              We help students find others appearing for the same exam at the
              same center — so they plan travel as a community, not as
              strangers.
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

          {/* Right — values grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="grid gap-4"
          >
            <div className="grid aspect-[4/3] place-items-center rounded-2xl border border-white/10 bg-white/5 p-8 shadow-[0_32px_90px_-46px_rgba(20,184,174,0.75)]">
              <div className="flex flex-col items-center text-center">
                <Image
                  src="/brand/examsafexa-logo.jpeg"
                  alt="ExamSafexa logo"
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white/20 shadow-soft"
                />
                <p className="mt-6 font-display text-2xl font-semibold text-white">
                  Exam<span className="text-teal-300">Safexa</span>
                </p>
                <p className="mt-2 text-sm text-white/55">
                  Safexa Technologies Company
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {VALUES.map(({ icon: Icon, title, copy }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <Icon className="h-5 w-5 text-teal-300" />
                  <h2 className="mt-3 text-sm font-semibold">{title}</h2>
                  <p className="mt-2 text-xs leading-5 text-white/60">{copy}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Team section ── */}
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
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
            We're a small team building Exam Safexa because we've either lived
            this problem ourselves or watched someone we care about live it.
            Here's who's behind the journey so far.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
          {TEAM.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={
                member.head
                  ? "rounded-2xl border border-teal-200 bg-white p-6 shadow-card lg:row-span-2"
                  : "rounded-2xl border border-navy-900/10 bg-white p-5 shadow-card"
              }
            >
              {/* Photo placeholder */}
              <div
                className={
                  member.head
                    ? "grid aspect-[4/3] place-items-center rounded-xl border border-dashed border-navy-900/12 bg-navy-50 text-navy-700 lg:aspect-[5/4]"
                    : "grid aspect-[3/1] place-items-center rounded-xl border border-dashed border-navy-900/12 bg-navy-50 text-navy-700 sm:aspect-square lg:aspect-auto lg:h-36"
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
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-navy-700/35">
                    Photo space
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className={member.head ? "mt-6" : "mt-5"}>
                {/* Name + tag row */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3
                      className={
                        member.head
                          ? "font-display text-3xl font-semibold text-navy-900 sm:text-4xl"
                          : "font-display text-xl font-semibold text-navy-900"
                      }
                    >
                      {member.name}
                    </h3>
                    <p
                      className={
                        member.head
                          ? "mt-1.5 text-base font-semibold text-teal-700"
                          : "mt-1 text-sm font-semibold text-teal-700"
                      }
                    >
                      {member.role}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {member.tag}
                  </span>
                </div>

                {/* Bio */}
                <p
                  className={
                    member.head
                      ? "mt-4 max-w-2xl text-base leading-7 text-navy-700/75"
                      : "mt-3 text-sm leading-6 text-navy-700/72"
                  }
                >
                  {member.copy}
                </p>

                {/* Education badge */}
                <div className="mt-4 inline-flex items-start gap-2 rounded-xl border border-navy-900/8 bg-navy-50 px-4 py-3">
                  <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
                  <p className="text-sm font-semibold text-navy-900">
                    {member.edu}
                  </p>
                </div>

                {/* Founder's quote */}
                {member.quote && (
                  <blockquote className="mt-5 border-l-2 border-teal-400 pl-4">
                    <p className="text-sm font-semibold italic text-navy-900/80">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </blockquote>
                )}

                {/* LinkedIn */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-full border border-navy-900/10 bg-navy-50 px-4 py-2 text-sm font-semibold text-navy-700 transition hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
              </div>
            </motion.article>
          ))}
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-5">
      <div className="text-teal-300">{icon}</div>
      <h2 className="mt-4 font-display text-xl font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-white/65">{copy}</p>
    </div>
  );
}
