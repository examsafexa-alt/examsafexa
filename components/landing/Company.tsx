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
    edu: "MBA in Human Resources Management, NIT Kurukshetra",
    copy: "Leads the vision for Exam Safexa and Safexa Technologies : building a safer exam journey for students and the families who worry about them. Started this because every year, millions of Indian students travel alone to life-changing exams with no trusted way to find someone to make that journey with.",
    quote: "Thank you for being here this early. Never travel alone for an exam.",
    linkedin: "https://www.linkedin.com/in/anisha-jaiswal-125870100/",
    photo: "/brand/anisha-jaiswal.jpeg",
    head: true,
    initials: "AJ",
  },
  {
    name: "Deepanshu Yadav",
    role: "Core Team : Research & Development",
    tag: "R&D",
    edu: "MBA in Business Analytics, Kurukshetra University",
    copy: "Leads R&D at Exam Safexa : researching government exams, universities, scholarships, and student needs to shape what we build next. Works on product planning, exam database design, and market validation.",
    linkedin: "https://www.linkedin.com/in/deepanshuyadav30",
    initials: "DY",
  },
  {
    name: "Satyam Kumar Kesarwani",
    role: "Core Team : Technology",
    tag: "Developer",
    edu: "B.Tech in CSE, NIT Agartala",
    copy: "Leads engineering at Exam Safexa : backend, full-stack architecture, and the platform's matching engine, with hands-on experience shipping production platforms.",
    linkedin: "https://www.linkedin.com/in/satyam-kumar-kesarwani-763b61293/",
    photo: "/brand/satyam-kesarwani.jpeg",
    photoPosition: "object-center",
    initials: "SK",
  },
  {
    name: "Nitin Jaiswal",
    role: "Head of Operations & Customer Relations",
    tag: "Operations",
    edu: "MBA in Operations Management, Lovely Professional University (LPU)",
    copy: "Leads operations and customer relations at Exam Safexa — overseeing day-to-day platform operations, student and parent support, and building the processes that keep the community running smoothly as we grow city by city.",
    linkedin: "",
    photo: "/brand/nitin-jaiswal.jpeg",
    initials: "NJ",
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
    copy: "Focused on the exact moment students need clarity, company, and safety.",
  },
  {
    icon: HeartHandshake,
    title: "Family confidence",
    copy: "Safety choices and contact preferences keep parents in the loop — only when you want.",
  },
];

export function Company() {
  return (
    <section id="company" className="bg-cloud text-navy-900">

      {/* ── Hero banner ── */}
      <div className="bg-navy-900 text-white">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-teal-400">
                Company
              </p>
              <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.15] sm:text-5xl lg:text-[3.25rem]">
                About Exam Safexa
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-white/70">
                Every year, millions of Indian students travel to unfamiliar
                cities for exams that can shape their entire future. Exam Safexa
                exists so that journey feels safer, more connected, and far less
                lonely.
              </p>

              {/* Mission + Vision */}
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <InfoBlock
                  icon={<Building2 className="h-4 w-4" />}
                  title="Mission"
                  copy="Make every exam journey from home to center safe, verified, and stress-free."
                />
                <InfoBlock
                  icon={<BadgeCheck className="h-4 w-4" />}
                  title="Vision"
                  copy="A future where no student has to travel alone for an exam without trusted support."
                />
              </div>

              {/* Values row */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {VALUES.map(({ icon: Icon, title, copy }) => (
                  <div
                    key={title}
                    className="rounded-xl border border-white/8 bg-white/5 p-4"
                  >
                    <Icon className="h-4 w-4 text-teal-400" />
                    <h2 className="mt-2.5 text-sm font-semibold">{title}</h2>
                    <p className="mt-1 text-xs leading-5 text-white/55">{copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — logo card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.12 }}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-8 py-14 shadow-[0_24px_80px_-30px_rgba(20,184,174,0.5)] lg:py-20"
            >
              <Image
                src="/brand/examsafexa-logo.jpeg"
                alt="ExamSafexa logo"
                width={108}
                height={108}
                className="rounded-full border-[3px] border-white/20 shadow-soft"
              />
              <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-white">
                Exam<span className="text-teal-300">Safexa</span>
              </p>
              <p className="mt-1 text-sm text-white/45">
                Safexa Technologies Company
              </p>
              <div className="mt-8 w-full border-t border-white/8 pt-6 text-center">
                <p className="text-xs font-semibold uppercase tracking-widest text-white/40">
                  Our promise
                </p>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-white/65 italic">
                  &ldquo;Never travel alone for an exam. We&apos;re building this step by
                  step, guided by what students tell us they need.&rdquo;
                </p>
                <p className="mt-2 text-xs text-white/35">— Anisha Jaiswal, Founder</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Team section ── */}
      <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8">

        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <UsersRound className="h-4 w-4 text-teal-600" />
              <p className="text-xs font-bold uppercase tracking-widest text-teal-600">
                Team
              </p>
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              The Team Behind Exam Safexa
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-navy-700/65 md:text-right">
            We&apos;ve either lived this problem ourselves or watched someone we care
            about face it. Here&apos;s who&apos;s behind the journey.
          </p>
        </div>

        {/* Team grid — equal-size cards, 2 cols on md, 4 cols on xl */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {TEAM.map((member, index) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className={
                member.head
                  ? "flex flex-col rounded-2xl border-2 border-teal-200 bg-white shadow-card overflow-hidden"
                  : "flex flex-col rounded-2xl border border-navy-900/8 bg-white shadow-card overflow-hidden"
              }
            >
              {/* ── Photo / Avatar area ── */}
              <div className="relative h-52 w-full bg-gradient-to-br from-teal-50 to-navy-50 shrink-0">
                {member.photo ? (
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    className={`object-cover ${member.photoPosition ?? "object-top"}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="grid h-20 w-20 place-items-center rounded-full bg-white text-2xl font-bold text-teal-700 shadow-sm ring-4 ring-teal-100">
                      {member.initials}
                    </div>
                  </div>
                )}
                {/* Founder badge overlay */}
                {member.head && (
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1 rounded-full bg-teal-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow">
                    ★ Founder
                  </span>
                )}
              </div>

              {/* ── Card body ── */}
              <div className="flex flex-1 flex-col p-5">
                {/* Name + tag */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-display text-base font-semibold text-navy-900 leading-snug">
                      {member.name}
                    </h3>
                    <p className="mt-0.5 text-xs font-semibold text-teal-700">
                      {member.role}
                    </p>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-teal-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-teal-700">
                    <GraduationCap className="h-2.5 w-2.5" />
                    {member.tag}
                  </span>
                </div>

                {/* Bio */}
                <p className="mt-3 text-xs leading-5 text-navy-700/70 flex-1">
                  {member.copy}
                </p>

                {/* Quote (founder only) */}
                {member.quote && (
                  <blockquote className="mt-3 border-l-2 border-teal-400 pl-3">
                    <p className="text-xs italic text-navy-700/60">
                      &ldquo;{member.quote}&rdquo;
                    </p>
                  </blockquote>
                )}

                {/* Education */}
                <div className="mt-3 flex items-start gap-1.5 rounded-lg border border-navy-900/8 bg-navy-50 px-3 py-2">
                  <GraduationCap className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                  <p className="text-[11px] font-semibold text-navy-900 leading-4">{member.edu}</p>
                </div>

                {/* LinkedIn */}
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-navy-900/10 bg-navy-50 px-3 py-1.5 text-xs font-semibold text-navy-700 transition hover:border-teal-400 hover:bg-teal-50 hover:text-teal-700"
                  >
                    <Linkedin className="h-3.5 w-3.5" />
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
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-teal-400">{icon}</div>
      <h2 className="mt-3 text-sm font-semibold">{title}</h2>
      <p className="mt-1 text-xs leading-5 text-white/60">{copy}</p>
    </div>
  );
}
