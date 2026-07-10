"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Menu, X, LayoutDashboard, LogOut, ChevronDown, User } from "lucide-react";
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
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);
  const { data: session, status } = useSession();
  const router = useRouter();
  const isLoggedIn = status === "authenticated";

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close user dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    setUserMenuOpen(false);
    setOpen(false);
    await signOut({ redirect: false });
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Thin gradient accent bar */}
      <div className="h-1 w-full bg-brand-gradient" />
      <div
        className={cn(
          "w-full bg-white/95 backdrop-blur transition-shadow",
          scrolled && "shadow-soft"
        )}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8">
          {/* Logo / wordmark — always stays on landing page */}
          <Link href="/" className="flex items-center gap-2" aria-label="ExamSafexa home">
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

          {/* Desktop right-side actions */}
          <div className="hidden items-center gap-3 lg:flex">
            {isLoggedIn ? (
              <>
                {/* Dashboard quick link */}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard" className="flex items-center gap-1.5">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>

                {/* User avatar dropdown */}
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full border border-navy-900/10 bg-navy-50 py-1.5 pl-2 pr-3 text-sm font-semibold text-navy-900 transition hover:bg-navy-100"
                  >
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-gradient text-white text-xs font-bold">
                      {session?.user?.name?.[0]?.toUpperCase() ?? <User className="h-3.5 w-3.5" />}
                    </span>
                    <span className="max-w-[100px] truncate">{session?.user?.name ?? "Account"}</span>
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", userMenuOpen && "rotate-180")} />
                  </button>

                  {userMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-navy-900/10 bg-white py-1 shadow-soft">
                      <div className="border-b border-navy-900/10 px-4 py-3">
                        <p className="text-xs font-semibold text-navy-700/50 uppercase tracking-wide">Signed in as</p>
                        <p className="mt-0.5 truncate text-sm font-semibold text-navy-900">{session?.user?.email}</p>
                      </div>
                      <Link
                        href="/dashboard"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
                      >
                        <LayoutDashboard className="h-4 w-4 text-teal-600" />
                        My Dashboard
                      </Link>
                      <Link
                        href="/onboarding/select-exam"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-navy-700 transition hover:bg-navy-50 hover:text-navy-900"
                      >
                        <span className="h-4 w-4 text-center text-teal-600 text-xs font-bold">✓</span>
                        My Exam Setup
                      </Link>
                      <div className="border-t border-navy-900/10 mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                        >
                          <LogOut className="h-4 w-4" />
                          Sign out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button variant="gradient" size="sm" asChild>
                  <Link href="/register">Get Started</Link>
                </Button>
              </>
            )}
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
              {isLoggedIn ? (
                <>
                  {/* Logged-in user info */}
                  <div className="flex items-center gap-3 rounded-xl border border-navy-900/10 px-3 py-2.5">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-gradient text-white text-sm font-bold">
                      {session?.user?.name?.[0]?.toUpperCase() ?? "?"}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-navy-900">{session?.user?.name}</p>
                      <p className="truncate text-xs text-navy-700/60">{session?.user?.email}</p>
                    </div>
                  </div>
                  <Button variant="outline" asChild onClick={() => setOpen(false)}>
                    <Link href="/dashboard" className="flex items-center gap-2">
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" asChild onClick={() => setOpen(false)}>
                    <Link href="/onboarding/select-exam">My Exam Setup</Link>
                  </Button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 rounded-full border-2 border-rose-200 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button variant="gradient" asChild>
                    <Link href="/register">Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
