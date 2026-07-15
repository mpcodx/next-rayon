export type FaqItem = {
  question: string
  answer: string
}

export const faqs: FaqItem[] = [
  {
    question: "How quickly can you respond to my inquiry?",
    answer:
      "We typically respond to all inquiries within 24 hours during business days. For urgent matters, please indicate so in your message and we'll prioritize your request.",
  },
  {
    question: "Do you work with clients remotely?",
    answer:
      "Yes, we work with clients remotely. Our team is distributed across multiple time zones, allowing us to provide flexible support and services.",
  },
  {
    question: "What information should I include in my project inquiry?",
    answer:
      "To help us understand your needs better, please include details about your project scope, timeline, budget range, and any specific requirements or challenges you're facing.",
  },
  {
    question: "Do you offer maintenance services after project completion?",
    answer:
      "Yes, we offer various maintenance packages to ensure your digital solutions remain up-to-date, secure, and performing optimally after launch.",
  },
  {
    question: "How do you handle project pricing?",
    answer:
      "Our pricing is based on project scope, complexity, and timeline. We offer both fixed-price quotes and time-and-materials billing depending on the nature of your project.",
  },
]
