import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    q: "Is Exam Safexa free to use?",
    a: "Yes, completely free right now during early access. Core group formation, matching, and basic safety tools will stay free. Optional paid services may be added later with clear notice.",
  },
  {
    q: "How does matching work today?",
    a: "When you sign up, we form groups based on the details you provide, including your exam, city, date, and selected center. Students in the same group are travelling for the same exam around the same time.",
  },
  {
    q: "Is my identity verified before I am matched with others?",
    a: "Right now, matching uses self-declared details plus account information. Stronger admit-card-based verification is planned, so students should still chat with their group and keep a parent or guardian informed before finalizing travel.",
  },
  {
    q: "Does Exam Safexa book my travel or stay?",
    a: "No, not yet. Exam Safexa currently helps form your travel group. You and your group members arrange travel and accommodation independently. Booking support for trains, buses, cabs, and stays is planned for a future update.",
  },
  {
    q: "Is location sharing mandatory?",
    a: "No. Location sharing is completely opt-in and off by default. You choose if, when, and with whom you share it.",
  },
  {
    q: "Is my personal data safe?",
    a: "We collect only what is needed to create your account, match your exam journey, and power optional safety features. We do not sell your data, and you can request deletion of your account and data.",
  },
  {
    q: "Will Exam Safexa always be free?",
    a: "Core group formation, matching, and basic safety tools will remain free. Future services like verified accommodation, travel booking, or concierge support may become optional paid features.",
  },
  {
    q: "Is there an Exam Safexa app?",
    a: "Not yet. Exam Safexa is currently available on the web. A dedicated mobile app for faster matching, chat, and alerts is planned.",
  },
  {
    q: "Which exams does Exam Safexa currently support?",
    a: "We are starting with major national exams such as UPSC, SSC, Railways, Banking, NEET, JEE, and CUET, then expanding to state-level exams as we grow city by city.",
  },
  {
    q: "Is Exam Safexa affiliated with UPSC, NTA, SSC, or any government exam body?",
    a: "No. Exam Safexa is an independent student safety and travel platform. Always confirm your official exam center and admit card details on the official exam-body website.",
  },
  {
    q: "I run a coaching institute. Can we partner with Exam Safexa?",
    a: "Yes. Coaching institutes can partner with us to offer verified group travel and safety support to their students.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">
          FAQs
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold text-navy-900 sm:text-4xl">
          Common questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-10">
        {FAQS.map((faq, i) => (
          <AccordionItem key={faq.q} value={`item-${i}`}>
            <AccordionTrigger>{faq.q}</AccordionTrigger>
            <AccordionContent>{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
