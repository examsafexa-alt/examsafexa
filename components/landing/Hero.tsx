"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    src: "/landing/route-glow.jpeg",
    position: "center",
  },
  {
    src: "/landing/exam-centre-platform.jpeg",
    position: "center",
  },
  {
    src: "/landing/something-big.jpeg",
    position: "center",
  },
];

const SLIDE_INTERVAL_MS = 5000;

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const slideTimer = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % heroSlides.length);
    }, SLIDE_INTERVAL_MS);

    return () => window.clearInterval(slideTimer);
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden bg-navy-950">
      <AnimatePresence mode="sync" initial={false}>
        <motion.div
          key={heroSlides[activeSlide].src}
          initial={{ opacity: 0, x: 64, scale: 1.04 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -64, scale: 1.02 }}
          transition={{ duration: 0.75, ease: "easeInOut" }}
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url('${heroSlides[activeSlide].src}')`,
            backgroundPosition: heroSlides[activeSlide].position,
          }}
          aria-hidden="true"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-navy-950/20" aria-hidden="true" />
      <div
        className="absolute inset-0 bg-gradient-to-r from-navy-950/85 via-navy-950/35 to-navy-950/10"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-navy-950/10"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-start px-5 py-28 lg:px-8 lg:py-36">
        {/* <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-white/15"
        >
          <Sparkles className="h-3.5 w-3.5" />
         
        </motion.div> */}

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-2xl font-display text-4xl font-semibold leading-[1.15] text-white sm:text-5xl lg:text-6xl"
        >
          Never travel alone
          <br />
          for an exam.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-base text-white/75 sm:text-lg"
        >
          Find your exam center, see the route before exam day, and get matched
          with other students headed to the same place - with an optional
          safety layer for solo travelers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row"
        >
          <Button size="lg" variant="gradient" asChild>
            <Link href="/register">Register Now</Link>
          </Button>
          <Button size="lg" variant="outlineLight" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </motion.div>

        <div className="mt-16 flex gap-2" aria-hidden="true">
          {heroSlides.map((slide, index) => (
            <span
              key={slide.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === activeSlide ? "w-6 bg-white" : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
