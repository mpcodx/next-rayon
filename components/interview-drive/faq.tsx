import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import Reveal from "./reveal"
import { SectionHeading } from "./sections"

/**
 * FAQ. Rendered with the project's existing Radix accordion, which already
 * handles keyboard navigation and the correct ARIA wiring.
 *
 * Note: no FAQPage structured data here on purpose — this campaign is
 * deliberately excluded from search indexing.
 */
export const INTERVIEW_DRIVE_FAQS = [
  {
    question: "Is this only for experienced developers?",
    answer: "No. This drive is specifically focused on freshers and college students.",
  },
  { question: "Is the interview online?", answer: "Yes. Interviews are conducted online." },
  { question: "How long is the interview?", answer: "Each slot is 15 minutes." },
  {
    question: "Which technologies are available?",
    answer: "Python/Django, AI/ML, Frontend/Vue.js, Mobile App Development and DevOps/Cloud.",
  },
  { question: "Which languages are available?", answer: "Hindi, English and Punjabi." },
  {
    question: "Can I book an already booked slot?",
    answer: "No. Once a slot is booked, it becomes unavailable.",
  },
  {
    question: "Can I book multiple slots?",
    answer: "No. One candidate can have one active booking for this interview drive.",
  },
  {
    question: "What should I prepare?",
    answer: "Prepare your fundamentals, projects, resume and the technology track you selected.",
  },
]

export default function InterviewDriveFaq() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="relative py-16 sm:py-20">
      <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading eyebrow="Questions" title="Frequently Asked" accent="Questions" />
        </Reveal>

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-10 space-y-3">
            {INTERVIEW_DRIVE_FAQS.map((faq, index) => (
              <AccordionItem
                key={faq.question}
                value={`faq-${index}`}
                className="glass-card overflow-hidden rounded-2xl px-5 transition-colors data-[state=open]:border-cyan-400/30"
              >
                <AccordionTrigger className="py-4 text-left text-sm font-semibold text-white hover:no-underline hover:text-cyan-200 sm:text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4 text-sm leading-relaxed text-gray-300/90">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
