import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/custom-model-training")

export default function CustomModelTrainingPage() {
  const features = [
    {
      title: "Custom Model Architecture",
      description: "Design and implement custom neural network architectures tailored to your specific needs.",
    },
    {
      title: "Transfer Learning",
      description: "Leverage pre-trained models and fine-tune them on your domain-specific data.",
    },
    {
      title: "Data Preparation & Augmentation",
      description: "Process, clean, and augment your data to maximize model performance.",
    },
    {
      title: "Hyperparameter Optimization",
      description: "Find the optimal configuration for your models through systematic hyperparameter tuning.",
    },
    {
      title: "Model Evaluation & Validation",
      description: "Rigorously test and validate models to ensure they meet performance requirements.",
    },
    {
      title: "Deployment & Integration",
      description: "Deploy trained models to production and integrate them with your existing systems.",
    },
  ]

  const process = [
    {
      title: "Problem Definition",
      description: "We work with you to clearly define the problem and determine appropriate success metrics.",
    },
    {
      title: "Data Collection & Analysis",
      description: "We gather and analyze the data needed for training your custom AI models.",
    },
    {
      title: "Data Preprocessing",
      description: "We clean, normalize, and prepare your data for effective model training.",
    },
    {
      title: "Model Selection & Design",
      description: "We select or design the most appropriate model architecture for your specific use case.",
    },
    {
      title: "Training & Optimization",
      description: "We train the model on your data and optimize it for performance and efficiency.",
    },
    {
      title: "Evaluation & Refinement",
      description: "We evaluate the model against your requirements and refine it as needed.",
    },
    {
      title: "Deployment & Monitoring",
      description: "We deploy the model to your environment and set up monitoring for ongoing performance.",
    },
  ]

  // Array of strings for technologies
  const technologies = [
    "PyTorch",
    "TensorFlow",
    "Scikit-learn",
    "Keras",
    "ONNX",
    "MLflow",
    "Weights & Biases",
    "DVC",
    "Kubeflow",
    "Ray",
  ]

  const faqs = [
    {
      question: "Why would I need a custom AI model instead of using off-the-shelf solutions?",
      answer:
        "Custom AI models are beneficial when you have unique requirements, domain-specific data, or need higher performance than generic solutions can provide. They can be tailored to your specific business processes, terminology, and data characteristics, often resulting in significantly better performance for your particular use case.",
    },
    {
      question: "How much data do I need for custom model training?",
      answer:
        "The amount of data required depends on the complexity of the problem and the type of model. Some models can perform well with hundreds of examples, while others may require millions. We can advise on data requirements for your specific case and implement techniques like data augmentation and transfer learning to make the most of limited data.",
    },
    {
      question: "How long does it take to train a custom AI model?",
      answer:
        "Training time varies widely based on factors like data size, model complexity, and hardware resources. Simple models might train in hours, while complex deep learning models could take days or weeks. We provide estimates based on your specific requirements and can implement strategies to optimize training time.",
    },
    {
      question: "Can you help with data collection and labeling?",
      answer:
        "Yes, we offer comprehensive data services including data collection, cleaning, and labeling. We can help design data collection strategies, implement data pipelines, and set up efficient labeling workflows. For projects requiring large-scale labeling, we can also recommend and integrate with specialized data labeling services.",
    },
    {
      question: "How do you ensure the quality and reliability of custom models?",
      answer:
        "We implement rigorous validation procedures including cross-validation, holdout test sets, and real-world testing. We also monitor for issues like overfitting, bias, and drift. Our deployment pipelines include continuous monitoring to detect performance degradation over time, ensuring your models remain reliable in production.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="Custom AI Model Training"
        description="Develop tailored artificial intelligence models trained on your specific data to solve your unique business challenges with maximum effectiveness."
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
