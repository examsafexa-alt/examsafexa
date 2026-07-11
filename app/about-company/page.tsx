import type { Metadata } from "next";
import { Navbar } from "@/components/landing/Navbar";
import { Company } from "@/components/landing/Company";
import { Footer } from "@/components/landing/Footer";

export const metadata: Metadata = {
  title: "About Company | ExamSafexa",
  description:
    "Learn about ExamSafexa, Safexa Technologies Company, and the team building safer exam journeys for students.",
};

export default function AboutCompanyPage() {
  return (
    <main>
      <Navbar />
      <Company />
      <Footer />
    </main>
  );
}
