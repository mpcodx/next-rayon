import { HelpCircle } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export type BlogFaq = {
  question: string
  answer: string
}

interface BlogFaqSectionProps {
  faqs: BlogFaq[]
}

export default function BlogFaqSection({ faqs }: BlogFaqSectionProps) {
  if (!faqs || faqs.length === 0) return null

  return (
    <section
      id="faq-section"
      aria-labelledby="faq-heading"
      className="mt-12 rounded-2xl border border-white/15 glass-card p-6 sm:p-8"
    >
      <div className="flex items-center gap-2.5 mb-6">
        <div className="p-1.5 rounded-lg bg-cyan-500/15 border border-cyan-400/30 text-cyan-300">
          <HelpCircle className="h-5 w-5" />
        </div>
        <div>
          <h2 id="faq-heading" className="text-2xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Answers to common questions for readers and AI search engines
          </p>
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full divide-y divide-white/10">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
            <AccordionTrigger className="text-left text-base font-semibold text-gray-100 hover:text-cyan-300 transition-colors py-4">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm sm:text-base text-gray-300 leading-relaxed pt-1 pb-4">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
