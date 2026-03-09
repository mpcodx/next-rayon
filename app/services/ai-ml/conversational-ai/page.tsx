import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/conversational-ai")

export default function ConversationalAIPage() {
  const features = [
    {
      title: "Custom Chatbots",
      description: "Develop tailored chatbots that reflect your brand voice and address specific business needs.",
      icon: "MessageSquare",
    },
    {
      title: "Virtual Assistants",
      description: "Create intelligent assistants that can handle complex tasks and provide personalized support.",
      icon: "Bot",
    },
    {
      title: "Knowledge Base Integration",
      description: "Connect conversational systems with your knowledge base for accurate, consistent responses.",
      icon: "Database",
    },
    {
      title: "Multi-channel Deployment",
      description: "Deploy conversational AI across websites, mobile apps, messaging platforms, and voice interfaces.",
      icon: "Layers",
    },
    {
      title: "Sentiment Analysis",
      description: "Understand user emotions and adapt responses accordingly for better engagement.",
      icon: "Heart",
    },
    {
      title: "Handoff Protocols",
      description: "Implement smooth transitions to human agents when conversations require personal attention.",
      icon: "Users",
    },
  ]

  const process = [
    {
      title: "Conversation Design",
      description: "We design conversation flows and user journeys that feel natural and address user needs.",
    },
    {
      title: "Knowledge Base Development",
      description: "We organize and structure your information to power accurate AI responses.",
    },
    {
      title: "NLP Model Selection",
      description: "We select and configure the most appropriate language models for your specific requirements.",
    },
    {
      title: "Dialogue Management",
      description: "We implement systems to maintain context and handle complex multi-turn conversations.",
    },
    {
      title: "Integration Development",
      description: "We connect your conversational AI with relevant systems and data sources.",
    },
    {
      title: "Training & Fine-tuning",
      description: "We train and fine-tune the system on your specific domain and use cases.",
    },
    {
      title: "Testing & Optimization",
      description: "We thoroughly test the system and optimize for natural interactions and accuracy.",
    },
    {
      title: "Deployment & Monitoring",
      description: "We deploy the solution and implement analytics to track performance and user satisfaction.",
    },
  ]

  const technologies = [
    "OpenAI GPT Models",
    "Anthropic Claude",
    "Rasa",
    "Dialogflow",
    "LangChain",
    "Vector Databases",
    "WebSockets",
    "Speech-to-Text/Text-to-Speech",
  ]

  const faqs = [
    {
      question: "What's the difference between a chatbot and conversational AI?",
      answer:
        "While the terms are sometimes used interchangeably, there are key differences: Traditional chatbots typically follow predefined rules and decision trees with limited understanding of natural language, while conversational AI uses advanced natural language processing to understand context, intent, and nuance in human language. Conversational AI can maintain context across multiple turns in a conversation, learn from interactions, and handle a much wider range of inputs and scenarios. Think of chatbots as the simpler, rule-based predecessors to more sophisticated conversational AI systems.",
    },
    {
      question: "How can conversational AI benefit my business?",
      answer:
        "Conversational AI offers numerous benefits: 24/7 customer support without staffing limitations, significant cost reduction for handling routine inquiries, consistent service quality across all interactions, ability to handle multiple conversations simultaneously, personalized user experiences based on history and preferences, valuable insights from conversation analytics, reduced wait times for customers, and freeing up human agents to focus on complex issues requiring empathy and judgment. The specific benefits vary by industry and use case.",
    },
    {
      question: "How long does it take to develop and deploy a conversational AI solution?",
      answer:
        "Development timelines vary based on complexity: Simple chatbots with limited functionality might be deployed in 4-6 weeks, moderately complex systems with some integrations typically take 2-3 months, and sophisticated conversational AI with multiple integrations, custom features, and extensive training data can take 3-6 months or more. Factors affecting the timeline include the complexity of use cases, required integrations, availability of training data, and approval processes. We provide detailed timeline estimates during the project planning phase.",
    },
    {
      question: "How do you train conversational AI to understand my specific industry terminology?",
      answer:
        "We use several approaches to train systems on industry-specific terminology: fine-tuning language models on your domain-specific content, developing custom knowledge bases with your terminology and concepts, creating specialized training datasets with examples of industry-specific conversations, implementing retrieval-augmented generation to access your proprietary information, and continuous learning from actual conversations after deployment. This ensures the system can understand and accurately respond to industry-specific queries.",
    },
    {
      question: "How do you measure the success of a conversational AI implementation?",
      answer:
        "We measure success through multiple metrics: resolution rate (percentage of inquiries resolved without human intervention), user satisfaction scores, conversation completion rates, average handling time, containment rate (users who remain with the AI without requesting human assistance), business metrics like conversion rates or cost savings, sentiment analysis of user responses, and specific KPIs aligned with your business objectives. We establish baseline measurements and track improvements over time.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="Conversational AI & Chatbots"
        description="Create intelligent conversational experiences that engage users, provide support, and streamline interactions across channels."
        parentService="AI & Machine Learning"
        parentServiceLink="/services/ai-ml"
        color="from-emerald-500 to-teal-500"
      />
      <SubServiceFeatures features={features} />
      <SubServiceProcess process={process} />
      <SubServiceTechnologies technologies={technologies} color="from-emerald-500 to-teal-500" />
      <SubServiceFAQ faqs={faqs} />
      <SubServiceCTA />
    </div>
  )
}
