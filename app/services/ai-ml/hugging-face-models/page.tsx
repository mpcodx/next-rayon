import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/hugging-face-models")

export default function HuggingFaceModelsPage() {
  const features = [
    {
      title: "Pre-trained Model Integration",
      description: "Seamlessly integrate state-of-the-art pre-trained models from Hugging Face into your applications.",
    },
    {
      title: "Fine-tuning Services",
      description:
        "Customize pre-trained models with your specific data to achieve optimal performance for your use case.",
    },
    {
      title: "Multi-modal Applications",
      description: "Build applications that combine text, image, audio, and video processing capabilities.",
    },
    {
      title: "NLP Solutions",
      description: "Implement text classification, sentiment analysis, named entity recognition, and other NLP tasks.",
    },
    {
      title: "Computer Vision Integration",
      description: "Leverage vision models for image classification, object detection, segmentation, and more.",
    },
    {
      title: "Model Deployment & Optimization",
      description: "Deploy models efficiently with optimizations for performance, latency, and resource utilization.",
    },
  ]

  const process = [
    {
      title: "Requirements Analysis",
      description:
        "We analyze your business needs and determine the most suitable Hugging Face models for your use case.",
    },
    {
      title: "Model Selection",
      description:
        "We select the appropriate pre-trained models from Hugging Face's extensive model hub based on your requirements.",
    },
    {
      title: "Data Preparation",
      description: "We prepare and preprocess your data to match the input requirements of the selected models.",
    },
    {
      title: "Fine-tuning & Customization",
      description: "We fine-tune the models on your specific data to improve performance for your particular use case.",
    },
    {
      title: "Integration & Development",
      description: "We integrate the models into your application with appropriate APIs and interfaces.",
    },
    {
      title: "Optimization & Deployment",
      description:
        "We optimize the models for production and deploy them in your environment with monitoring capabilities.",
    },
    {
      title: "Maintenance & Updates",
      description:
        "We provide ongoing support, updates, and improvements to keep your AI solutions performing optimally.",
    },
  ]

  // Fixed: Changed from array of objects to array of strings to match component expectations
  const technologies = [
    "Hugging Face Transformers",
    "PyTorch",
    "TensorFlow",
    "ONNX Runtime",
    "Hugging Face Datasets",
    "Hugging Face Spaces",
    "Accelerate",
    "Gradio",
  ]

  const faqs = [
    {
      question: "What are Hugging Face models?",
      answer:
        "Hugging Face models are pre-trained machine learning models available through the Hugging Face model hub. These models cover a wide range of tasks including natural language processing, computer vision, audio processing, and more. They're built on transformer architecture and other advanced neural network designs, allowing for state-of-the-art performance across various AI tasks.",
    },
    {
      question: "Can Hugging Face models be customized for my specific needs?",
      answer:
        "Yes, Hugging Face models can be fine-tuned on your specific data to adapt them to your particular use case. This process, known as transfer learning, allows you to leverage the knowledge in pre-trained models while customizing them for your specific domain, terminology, or task requirements.",
    },
    {
      question: "What types of applications can be built with Hugging Face models?",
      answer:
        "Hugging Face models can power a wide variety of applications including: text classification, sentiment analysis, named entity recognition, question answering, text generation, summarization, translation, image classification, object detection, speech recognition, text-to-speech, and multimodal applications combining text, images, and audio.",
    },
    {
      question: "How are Hugging Face models deployed in production?",
      answer:
        "Hugging Face models can be deployed in various ways depending on your requirements. Options include: deploying as REST APIs using Hugging Face Inference API, containerization with Docker for cloud deployment, optimization with ONNX or TensorRT for improved performance, edge deployment for mobile or IoT devices, and integration with existing ML platforms like TensorFlow Serving or PyTorch Serve.",
    },
    {
      question: "What are the hardware requirements for running Hugging Face models?",
      answer:
        "Hardware requirements vary based on the model size and application needs. Large models may require GPUs for efficient inference, while smaller or optimized models can run on CPUs. We can help optimize models to match your hardware constraints through techniques like quantization, pruning, and knowledge distillation.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="Hugging Face Models & Applications"
        description="Leverage state-of-the-art pre-trained models from Hugging Face to build powerful AI applications for natural language processing, computer vision, and more."
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
