import Link from "next/link";
import { Instagram, Twitter, Linkedin, Send } from "lucide-react";

const QUICK_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Safety", href: "/#safety" },
  { label: "Community", href: "/#community" },
  { label: "Company", href: "/about-company" },
  { label: "FAQs", href: "/#faq" },
];

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
  { label: "Safety Guidelines", href: "/safety-guidelines" },
];

const SOCIAL_LINKS = [
  { label: "ExamSafexa on X", href: "https://x.com/examsafexa", icon: Twitter },
  { label: "ExamSafexa on Telegram", href: "https://t.me/ExamSafexa", icon: Send },
  {
    label: "ExamSafexa on Instagram",
    href: "https://www.instagram.com/examsafexa?igsh=MWp4NWhpMDF1Y3Jkag==",
    icon: Instagram,
  },
  {
    label: "ExamSafexa on LinkedIn",
    href: "https://www.linkedin.com/company/exam-safexa/",
    icon: Linkedin,
  },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-white/70">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <span className="font-display text-xl font-semibold">
              <span className="text-white">Exam</span>
              <span className="text-gradient">Safexa</span>
            </span>
            <p className="mt-3 max-w-xs text-sm text-white/50">
              An independent student companion platform. Not affiliated with
              any exam board or government body.
            </p>
            <div className="mt-5 flex gap-3">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Legal &amp; Safety</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <p className="mt-4 text-sm text-white/50">
              examsafexa@gmail.com
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} ExamSafexa Technology . All rights reserved.
        </div>
      </div>
    </footer>
  );
}
