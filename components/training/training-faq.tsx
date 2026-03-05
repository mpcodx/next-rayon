"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "Do I need prior programming experience to join your courses?",
    answer:
      "It depends on the course. Our beginner-level courses are designed for those with no prior experience, while intermediate and advanced courses may require some foundational knowledge. Each course page clearly indicates the prerequisites needed.",
  },
  {
    question: "What is the format of your training programs?",
    answer:
      "Our training programs combine live instructor-led sessions, hands-on projects, coding exercises, and mentorship. We offer both in-person and remote options with flexible scheduling to accommodate different time zones and work commitments.",
  },
  {
    question: "How long do the training programs last?",
    answer:
      "Program duration varies from 4 to 12 weeks depending on the course and intensity level. We offer full-time, part-time, and weekend options to fit your schedule. The specific duration is listed on each course page.",
  },
  {
    question: "Will I receive a certificate upon completion?",
    answer:
      "Yes, all graduates receive an industry-recognized certificate upon successful completion of the program. Many of our courses also prepare you for external certifications from companies like AWS, Google, and Microsoft.",
  },
  {
    question: "Do you offer job placement assistance?",
    answer:
      "Yes, we provide comprehensive career support including resume reviews, interview preparation, portfolio development, and connections to our network of hiring partners. Our job placement rate is over 85% within three months of graduation.",
  },
  {
    question: "What happens if I miss a class?",
    answer:
      "All sessions are recorded and made available to enrolled students. You'll also have access to instructors and teaching assistants during office hours to catch up on any material you missed.",
  },
  {
    question: "Is there a payment plan available?",
    answer:
      "Yes, we offer flexible payment options including monthly installments and income share agreements for select programs. We also provide scholarships for underrepresented groups in tech.",
  },
  {
    question: "Can I get a refund if I'm not satisfied with the course?",
    answer:
      "We offer a 7-day money-back guarantee for all our courses. If you're not satisfied with the quality of instruction within the first week, you can request a full refund with no questions asked.",
  },
]

export default function TrainingFaq() {
  return (
    <section className="py-24 bg-slate-950/35">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Find answers to common questions about our training programs
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-white/15 rounded-xl glass-card px-6"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline">
                  <span className="font-medium text-lg">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 pb-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400">
            Still have questions?{" "}
            <a href="/contact" className="text-cyan-300 hover:underline">
              Contact our team
            </a>{" "}
            for more information.
          </p>
        </div>
      </div>
    </section>
  )
}
