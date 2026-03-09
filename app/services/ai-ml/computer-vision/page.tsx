import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/computer-vision")

export default function ComputerVisionPage() {
  const features = [
    {
      title: "Image Classification",
      description: "Automatically categorize and tag images based on their content with high accuracy.",
    },
    {
      title: "Object Detection",
      description: "Identify and locate multiple objects within images or video streams in real-time.",
    },
    {
      title: "Image Segmentation",
      description: "Precisely outline and separate different objects or regions within images.",
    },
    {
      title: "Facial Recognition",
      description: "Detect, analyze, and identify faces with advanced neural network architectures.",
    },
    {
      title: "Video Analysis",
      description: "Process video content to track objects, detect activities, and extract insights.",
    },
    {
      title: "Optical Character Recognition",
      description: "Extract text from images and documents with high accuracy across multiple languages.",
    },
  ]

  const process = [
    {
      title: "Requirements Analysis",
      description: "We analyze your specific computer vision needs and define clear project objectives.",
    },
    {
      title: "Data Collection & Preparation",
      description: "We gather and prepare the image or video data needed for your computer vision solution.",
    },
    {
      title: "Model Selection & Architecture",
      description: "We select the most appropriate computer vision models and architectures for your use case.",
    },
    {
      title: "Training & Optimization",
      description: "We train the models on your data and optimize them for accuracy and performance.",
    },
    {
      title: "Integration & Testing",
      description: "We integrate the computer vision system with your existing infrastructure and thoroughly test it.",
    },
    {
      title: "Deployment & Monitoring",
      description: "We deploy the solution to your environment and set up monitoring for ongoing performance.",
    },
    {
      title: "Maintenance & Updates",
      description: "We provide ongoing support and updates to ensure your computer vision system remains effective.",
    },
  ]

  // Array of strings for technologies
  const technologies = [
    "OpenCV",
    "TensorFlow",
    "PyTorch",
    "YOLO",
    "Detectron2",
    "MediaPipe",
    "ONNX Runtime",
    "TensorRT",
    "CoreML",
    "TFLite",
  ]

  const faqs = [
    {
      question: "What business problems can computer vision solve?",
      answer:
        "Computer vision can address numerous business challenges including: quality control in manufacturing, inventory management through object detection, security through surveillance and anomaly detection, customer analytics through facial recognition and behavior tracking, document processing through OCR, medical image analysis for diagnostics, and autonomous systems like self-driving vehicles or robots.",
    },
    {
      question: "How accurate are computer vision systems?",
      answer:
        "Modern computer vision systems can achieve very high accuracy, often exceeding 95% for well-defined tasks with good data. However, accuracy depends on factors like image quality, lighting conditions, model complexity, and training data. We work to optimize these factors and set realistic expectations based on your specific use case.",
    },
    {
      question: "Can computer vision work in real-time?",
      answer:
        "Yes, many computer vision applications can operate in real-time. We can optimize models for speed using techniques like model quantization, hardware acceleration (GPUs/TPUs), and efficient architectures. For edge devices with limited processing power, we can implement lightweight models specifically designed for real-time performance.",
    },
    {
      question: "What hardware is required for computer vision systems?",
      answer:
        "Hardware requirements vary based on the application. Cloud-based solutions can run on standard servers, while edge deployments might use specialized hardware like NVIDIA Jetson devices, Intel Neural Compute Sticks, or custom FPGA solutions. We can recommend the most cost-effective hardware configuration for your specific needs.",
    },
    {
      question: "How do you handle privacy concerns with computer vision?",
      answer:
        "We implement privacy-preserving techniques such as on-device processing to avoid sending sensitive data to the cloud, face blurring or anonymization, data encryption, and compliance with regulations like GDPR. We can also design systems that extract only the necessary information without storing raw images or videos.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="Computer Vision Solutions"
        description="Implement advanced image and video analysis capabilities to extract valuable insights, automate visual inspection, and enable new possibilities for your business."
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
