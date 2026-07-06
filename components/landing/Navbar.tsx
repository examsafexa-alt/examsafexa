"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, X, Home, Compass, ShieldCheck, Users, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "#home", icon: Home },
  { label: "How It Works", href: "#how-it-works", icon: Compass },
  { label: "Safety", href: "#safety", icon: ShieldCheck },
  { label: "Community", href: "#community", icon: Users },
  { label: "FAQs", href: "#faq", icon: HelpCircle },
];

export function Navbar() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Thin gradient accent bar, per brief */}
      <div className="h-1 w-full bg-brand-gradient" />
      <div
        className={cn(
          "w-full bg-white/95 backdrop-blur transition-shadow",
          scrolled && "shadow-soft"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo / wordmark */}
          <Link href="#home" className="flex items-center gap-2" aria-label="ExamSafexa home">
            <img
              src="/brand/examsafexa-logo.jpeg"
              alt=""
              className="h-11 w-11 rounded-full border border-navy-900/10 bg-white object-cover object-top shadow-sm"
            />
            <span className="font-display text-xl font-semibold tracking-tight">
              <span className="text-navy-900">Exam</span>
              <span className="text-gradient">Safexa</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map(({ label, href, icon: Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="flex items-center gap-1.5 text-sm font-medium text-navy-700/80 transition-colors hover:text-teal-600"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button variant="gradient" size="sm" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="p-2 text-navy-900 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-navy-900/10 bg-white px-5 pb-6 pt-2 lg:hidden">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2 py-3 text-sm font-medium text-navy-700 hover:bg-navy-50"
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-col gap-2">
              <Button variant="outline" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
