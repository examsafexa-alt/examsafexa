"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOADER_KEY = "examsafexa-loader-seen";

export function BrandLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let hasSeenLoader = false;

    try {
      hasSeenLoader = window.localStorage.getItem(LOADER_KEY) === "true";
    } catch {
      hasSeenLoader = false;
    }

    if (hasSeenLoader) {
      setIsVisible(false);
      return;
    }

    try {
      window.localStorage.setItem(LOADER_KEY, "true");
    } catch {
      // If storage is blocked, show the loader for this page load only.
    }

    const timer = window.setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="fixed inset-0 z-[9999] grid place-items-center bg-cloud"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          role="status"
          aria-live="polite"
          aria-label="Loading ExamSafexa"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(47,191,113,0.18),transparent_30%),radial-gradient(circle_at_50%_58%,rgba(15,163,163,0.16),transparent_34%)]" />
          <div className="relative flex flex-col items-center">
            <motion.div
              className="relative grid h-28 w-28 place-items-center rounded-full bg-white shadow-soft ring-1 ring-navy-900/5"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            >
              <motion.span
                className="absolute inset-[-10px] rounded-full border-2 border-teal-500/25"
                animate={{ scale: [0.9, 1.18], opacity: [0.85, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
              />
              <Image
                src="/brand/examsafexa-logo.jpeg"
                alt="ExamSafexa"
                width={76}
                height={76}
                priority
                className="rounded-full object-cover"
              />
            </motion.div>

            <motion.p
              className="mt-6 font-display text-2xl font-semibold text-navy-900"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
            >
              ExamSafexa
            </motion.p>
            <motion.div
              className="mt-4 h-1.5 w-48 overflow-hidden rounded-full bg-navy-900/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, delay: 0.35 }}
            >
              <motion.div
                className="h-full rounded-full bg-brand-gradient"
                initial={{ x: "-100%" }}
                animate={{ x: ["-100%", "0%", "100%"] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
