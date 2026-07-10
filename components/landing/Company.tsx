"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Building2, GraduationCap, UsersRound } from "lucide-react";

const TEAM = [
  {
    name: "Anisha Jaiswal",
    role: "Founder & Owner, Safexa Technology Company",
    copy: "Leads the vision for Exam Safexa and Safexa Technology, building a safer exam journey for students and the families who worry about them.",
    head: true,
  },
  {
    name: "Deepanshu Yadav",
    role: "Research & Development",
    copy: "Researches exams, universities, scholarships, and student needs to shape product planning and market validation.",
  },
  {
    name: "Satyam Kumar Kesarwani",
    role: "Technology",
    copy: "Builds the platform architecture, backend systems, and matching experience that power Exam Safexa.",
  },
];

export function Company() {
  return (
    <section id="company" className="bg-navy-900 py-24 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-teal-300">
              Company
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              About Exam Safexa
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/72">
              Every year, millions of Indian students travel to unfamiliar cities
              for exams that can shape their future. Exam Safexa exists so that
              journey feels safer, more verified, and less lonely.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/72">
              We help students find others appearing for the same exam, in the
              same city, around the same date. Students arrange their own travel;
              we help make sure they are not planning it as strangers.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5">
                <Building2 className="h-5 w-5 text-teal-300" />
                <h3 className="mt-4 font-display text-lg font-semibold">
                  Mission
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/68">
                  Make every exam journey from home to center safe, verified,
                  and stress-free for students and their families.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/8 p-5">
                <BadgeCheck className="h-5 w-5 text-emerald-300" />
                <h3 className="mt-4 font-display text-lg font-semibold">
                  Vision
                </h3>
                <p className="mt-2 text-sm leading-6 text-white/68">
                  A future where no student has to travel alone for an exam
                  without trusted support beside them.
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <UsersRound className="h-5 w-5 text-teal-300" />
              <h3 className="font-display text-2xl font-semibold">
                The Team Behind Exam Safexa
              </h3>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/68">
              A small team building the product, research, and safety systems
              behind the journey.
            </p>

            <div className="mt-7 grid gap-5">
              {TEAM.map((member, index) => (
                <motion.article
                  key={member.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className={
                    member.head
                      ? "rounded-2xl border border-teal-300/35 bg-white p-6 text-navy-900 shadow-[0_24px_70px_-30px_rgba(47,191,113,0.5)]"
                      : "rounded-2xl border border-white/10 bg-white/8 p-5"
                  }
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p
                        className={
                          member.head
                            ? "font-display text-2xl font-semibold text-navy-900"
                            : "font-display text-xl font-semibold text-white"
                        }
                      >
                        {member.name}
                      </p>
                      <p
                        className={
                          member.head
                            ? "mt-1 text-sm font-semibold text-teal-700"
                            : "mt-1 text-sm font-semibold text-teal-300"
                        }
                      >
                        {member.role}
                      </p>
                    </div>
                    {member.head ? (
                      <div className="inline-flex items-center gap-2 rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-teal-700">
                        <GraduationCap className="h-3.5 w-3.5" />
                        Head
                      </div>
                    ) : null}
                  </div>
                  <p
                    className={
                      member.head
                        ? "mt-4 text-sm leading-6 text-navy-700/75"
                        : "mt-4 text-sm leading-6 text-white/68"
                    }
                  >
                    {member.copy}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
