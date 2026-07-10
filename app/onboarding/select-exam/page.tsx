"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";
import { cn } from "@/lib/utils";

type Exam = {
  id: string;
  name: string;
  code: string;
  category: string;
  examDate?: string;
  group?: string;
  conductingBody?: string;
};

const CATEGORY_LABELS: Record<string, string> = {
  "central-government": "Central Govt",
  "judiciary-legal": "Judiciary / Legal",
  "state-government": "State Govt",
  "psu-recruitment": "PSU Recruitment",
  "university-entrance": "University Entrance",
  "professional-bodies": "Professional Bodies",
  "school-boards": "School Boards",
  international: "International",
  medical: "Medical",
  engineering: "Engineering",
  "civil-services": "Civil Services",
  "state-psc": "State PSC",
  ssc: "SSC",
  other: "Other",
};

export default function SelectExamPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [selectedExamId, setSelectedExamId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    fetch("/api/exams")
      .then(async (response) => {
        if (!response.ok) throw new Error("Could not load exams.");
        return response.json();
      })
      .then((payload) => setExams(payload.exams ?? []))
      .catch(() =>
        setError(
          "Could not load exams. Check your MongoDB connection and seed data."
        )
      )
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(exams.map((e) => e.category)));
    return cats.sort();
  }, [exams]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return exams.filter((exam) => {
      const matchCat =
        activeCategory === "all" || exam.category === activeCategory;
      const matchSearch =
        !q ||
        exam.name.toLowerCase().includes(q) ||
        exam.code.toLowerCase().includes(q) ||
        (exam.group ?? "").toLowerCase().includes(q) ||
        (exam.conductingBody ?? "").toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [exams, search, activeCategory]);

  async function continueToCenters() {
    if (!selectedExamId) return;
    setSaving(true);
    const response = await fetch("/api/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ examSelected: selectedExamId }),
    });

    setSaving(false);
    if (response.ok) {
      router.push("/onboarding/select-center");
      return;
    }

    setError("Could not save your exam selection. Please try again.");
  }

  return (
    <OnboardingShell
      activeStep={1}
      title="Choose your exam"
      subtitle="Pick the exam you are preparing for. This selection decides which centers appear next."
    >
      {error ? (
        <Card className="p-8 text-sm font-semibold text-rose-600">{error}</Card>
      ) : loading ? (
        <Card className="p-8 text-navy-700/70">Loading exams…</Card>
      ) : (
        <>
          {/* Search bar */}
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-navy-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, code or conducting body…"
              className="w-full rounded-xl border border-navy-900/10 bg-white py-2.5 pl-10 pr-10 text-sm text-navy-900 placeholder:text-navy-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-700"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="mb-6 flex flex-wrap gap-2">
            <CategoryPill
              label="All"
              active={activeCategory === "all"}
              onClick={() => setActiveCategory("all")}
            />
            {categories.map((cat) => (
              <CategoryPill
                key={cat}
                label={CATEGORY_LABELS[cat] ?? cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          {filtered.length === 0 ? (
            <Card className="p-8 text-center text-sm text-navy-700/60">
              No exams match your search.{" "}
              <button
                className="text-teal-600 underline"
                onClick={() => {
                  setSearch("");
                  setActiveCategory("all");
                }}
              >
                Clear filters
              </button>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((exam) => (
                <ExamCard
                  key={exam.id}
                  exam={exam}
                  selected={selectedExamId === exam.id}
                  onSelect={() => setSelectedExamId(exam.id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="sticky bottom-4 mt-6 flex items-center justify-between gap-4">
        {selectedExamId && (
          <p className="text-sm font-semibold text-teal-700">
            ✓ {exams.find((e) => e.id === selectedExamId)?.name} selected
          </p>
        )}
        <Button
          type="button"
          size="lg"
          className="ml-auto"
          disabled={!selectedExamId || saving}
          onClick={continueToCenters}
        >
          {saving ? "Saving…" : "Continue to center selection"}
        </Button>
      </div>
    </OnboardingShell>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold transition",
        active
          ? "bg-teal-600 text-white shadow"
          : "bg-navy-50 text-navy-700 hover:bg-navy-100"
      )}
    >
      {label}
    </button>
  );
}

function ExamCard({
  exam,
  selected,
  onSelect,
}: {
  exam: Exam;
  selected: boolean;
  onSelect: () => void;
}) {
  const countdown = useMemo(() => {
    if (!exam.examDate) return "Date to be announced";
    const examTime = new Date(exam.examDate).getTime();
    if (Number.isNaN(examTime)) return "Date to be announced";
    const days = Math.ceil((examTime - Date.now()) / (1000 * 60 * 60 * 24));
    if (days < 0) return "Date passed";
    if (days === 0) return "Today";
    return `${days} days left`;
  }, [exam.examDate]);

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "min-h-48 rounded-2xl border p-5 text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-soft",
        selected
          ? "border-transparent bg-brand-gradient text-white"
          : "border-navy-900/10 bg-white text-navy-900"
      )}
    >
      <span
        className={cn(
          "inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-normal",
          selected ? "bg-white/20 text-white" : "bg-navy-50 text-navy-700"
        )}
      >
        {(CATEGORY_LABELS[exam.category] ?? exam.category).replace(/-/g, " ")}
      </span>
      <h2 className="mt-5 font-display text-xl font-semibold leading-snug">
        {exam.name}
      </h2>
      <p
        className={cn(
          "mt-1 text-sm font-semibold",
          selected ? "text-white/70" : "text-navy-700/65"
        )}
      >
        {exam.code}
      </p>
      {exam.group || exam.conductingBody ? (
        <p
          className={cn(
            "mt-3 line-clamp-2 text-sm",
            selected ? "text-white/75" : "text-navy-700/65"
          )}
        >
          {[exam.group, exam.conductingBody].filter(Boolean).join(" · ")}
        </p>
      ) : null}
      <div
        className={cn(
          "mt-6 flex items-center gap-2 text-sm font-semibold",
          selected ? "text-white" : "text-teal-700"
        )}
      >
        <CalendarDays className="h-4 w-4" />
        {countdown}
      </div>
    </button>
  );
}
