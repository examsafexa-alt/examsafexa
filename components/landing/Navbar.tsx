"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Safety", href: "/#safety" },
  { label: "Community", href: "/#community" },
  { label: "Company", href: "/about-company" },
  { label: "FAQs", href: "/#faq" },
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
          <Link href="/#home" className="flex items-center gap-2" aria-label="ExamSafexa home">
            <Image
              src="/brand/examsafexa-logo.jpeg"
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 rounded-full border border-navy-900/10 bg-white object-cover object-top shadow-sm"
            />
            <span className="font-display text-xl font-semibold tracking-tight">
              <span className="text-navy-900">Exam</span>
              <span className="text-gradient">Safexa</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center rounded-full border border-navy-900/5 bg-navy-50/70 p-1 lg:flex">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group relative block overflow-hidden rounded-full px-4 py-2 text-sm font-semibold text-navy-700/75 transition-colors duration-300 hover:text-navy-900"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 rounded-full bg-white shadow-sm transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <span className="absolute inset-x-4 bottom-1 h-0.5 origin-left scale-x-0 rounded-full bg-brand-gradient transition-transform duration-300 ease-out group-hover:scale-x-100" />
                  <span className="relative">{label}</span>
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
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-navy-700 transition-colors hover:bg-navy-50 hover:text-teal-700"
                  >
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
