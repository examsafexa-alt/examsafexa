"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollToSection() {
  const pathname = usePathname();

  useEffect(() => {
    const routeToId: Record<string, string> = {
      "/how-it-works": "how-it-works",
      "/features": "features",
      "/safety": "safety",
      "/community": "community",
      "/about-company": "company",
      "/faq": "faq",
    };

    const id = routeToId[pathname];
    if (id) {
      // Timeout to ensure elements are fully rendered before scrolling
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [pathname]);

  return null;
}
