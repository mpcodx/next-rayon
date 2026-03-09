import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/llm-development")

export default function LLMDevelopmentPage() {
  const features = [
    {
      title: "LangChain Framework Integration",
      description: "Leverage the power of LangChain to build complex applications with large language models.",
    },
    {
      title: "Custom LLM Agents",
      description: "Develop intelligent agents that can perform complex tasks and reasoning using LLMs.",
    },
    {
      title: "Document Processing & RAG",
      description:
        "Implement Retrieval Augmented Generation for accurate, context-aware responses from your documents.",
    },
    {
      title: "Memory & Context Management",
      description: "Build applications with sophisticated memory systems for maintaining conversation context.",
    },
    {
      title: "Multi-step Reasoning Chains",
      description: "Create complex reasoning chains that break down problems into manageable steps.",
    },
    {
      title: "Tool & API Integration",
      description: "Connect LLMs to external tools, APIs, and data sources for enhanced capabilities.",
    },
  ]

  const process = [
    {
      title: "Use Case Definition",
      description: "We work with you to define the specific use case and requirements for your LLM application.",
    },
    {
      title: "Architecture Design",
      description: "We design the architecture of your LLM application using LangChain components and patterns.",
    },
    {
      title: "Model Selection",
      description: "We select the most appropriate language models based on your requirements and constraints.",
    },
    {
      title: "Prompt Engineering",
      description: "We develop and refine prompts to achieve optimal performance for your specific tasks.",
    },
    {
      title: "Chain & Agent Development",
      description: "We build the chains, agents, and tools needed for your application's functionality.",
    },
    {
      title: "Integration & Testing",
      description: "We integrate the LLM components with your existing systems and thoroughly test performance.",
    },
    {
      title: "Deployment & Optimization",
      description: "We deploy your LLM application and optimize it for performance, cost, and reliability.",
    },
  ]

  // Array of strings for technologies
  const technologies = [
    "LangChain",
    "OpenAI",
    "Anthropic",
    "Hugging Face",
    "LlamaIndex",
    "Pinecone",
    "Weaviate",
    "ChromaDB",
    "FastAPI",
    "Redis",
  ]

  const faqs = [
    {
      question: "What is LangChain?",
      answer:
        "LangChain is a framework designed to simplify the development of applications using large language models (LLMs). It provides a standardized interface for chains, integrations with other tools, and end-to-end chains for common applications. LangChain makes it easier to build applications that are context-aware, reason, and interact with their environment.",
    },
    {
      question: "What types of applications can be built with LangChain?",
      answer:
        "LangChain enables the development of various applications including: document analysis and question answering, chatbots with long-term memory, personal assistants that can take actions, code analysis and generation tools, autonomous agents that can perform complex tasks, and data analysis applications that can reason about data.",
    },
    {
      question: "How does Retrieval Augmented Generation (RAG) work?",
      answer:
        "RAG combines retrieval-based and generation-based approaches. When a query is received, the system retrieves relevant documents or information from a knowledge base, then provides this context to the language model along with the query. This allows the model to generate responses that are both factual (based on the retrieved information) and fluent (leveraging the language model's capabilities).",
    },
    {
      question: "Can LangChain integrate with our existing systems?",
      answer:
        "Yes, LangChain is designed to be highly integrable. It can connect with various databases, APIs, and tools. We can help you integrate LangChain-based applications with your existing infrastructure, whether it's document stores, knowledge bases, CRMs, or custom internal tools.",
    },
    {
      question: "What are the cost considerations for LLM applications?",
      answer:
        "Costs for LLM applications depend on factors like model selection, usage volume, and complexity. We help optimize costs by selecting appropriate models for your needs, implementing caching strategies, using embeddings efficiently, and designing architectures that minimize token usage while maintaining quality.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="LLM Development with LangChain"
        description="Build sophisticated applications powered by large language models using the LangChain framework for context-aware, reasoning-capable AI solutions."
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
