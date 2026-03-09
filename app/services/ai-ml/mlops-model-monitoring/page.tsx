import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/mlops-model-monitoring")

export default function MLOpsModelMonitoringPage() {
  const features = [
    {
      title: "Model CI/CD Pipelines",
      description:
        "Automate model testing, packaging, and deployment with reliable CI/CD workflows for ML systems.",
    },
    {
      title: "Model Registry & Versioning",
      description:
        "Track experiments, model versions, and approvals with a structured registry and reproducible lineage.",
    },
    {
      title: "Drift Detection",
      description:
        "Continuously detect data and concept drift to prevent silent model degradation in production.",
    },
    {
      title: "Performance Monitoring",
      description:
        "Monitor prediction quality, latency, uptime, and business KPIs with alerting and operational dashboards.",
    },
    {
      title: "Governance & Compliance",
      description:
        "Implement audit trails, access controls, and policy checks for secure and compliant AI operations.",
    },
    {
      title: "Automated Retraining",
      description:
        "Trigger retraining pipelines when quality thresholds drop, reducing downtime and manual intervention.",
    },
  ]

  const process = [
    {
      title: "Platform Assessment",
      description:
        "We review your current data, ML tooling, and deployment architecture to identify MLOps gaps.",
    },
    {
      title: "MLOps Architecture Design",
      description:
        "We design workflows for training, validation, release management, observability, and rollback.",
    },
    {
      title: "Pipeline Implementation",
      description:
        "We implement CI/CD for models, feature pipelines, model registry integration, and environment promotion.",
    },
    {
      title: "Monitoring Setup",
      description:
        "We configure dashboards and alerts for model health, drift, data quality, and infrastructure signals.",
    },
    {
      title: "Governance Enablement",
      description:
        "We enforce review workflows, artifact traceability, and access policies aligned to your compliance needs.",
    },
    {
      title: "Optimization & Handoff",
      description:
        "We optimize runtime costs and document operational playbooks for your internal engineering teams.",
    },
  ]

  const technologies = [
    "MLflow",
    "Kubeflow",
    "Airflow",
    "Docker",
    "Kubernetes",
    "Prometheus",
    "Grafana",
    "Evidently",
    "GitHub Actions / GitLab CI",
    "Terraform",
  ]

  const faqs = [
    {
      question: "What is the difference between MLOps and regular DevOps?",
      answer:
        "DevOps focuses on application delivery, while MLOps extends this for machine learning systems by managing data pipelines, model training, drift, experiment tracking, and continuous model performance in production.",
    },
    {
      question: "Why is model monitoring important after deployment?",
      answer:
        "Model behavior can degrade as real-world data changes. Monitoring catches drift, bias, and quality drops early so teams can retrain or roll back before business impact grows.",
    },
    {
      question: "Can you work with our existing cloud stack?",
      answer:
        "Yes. We design MLOps workflows for AWS, Azure, GCP, and hybrid environments, and integrate with existing CI/CD and observability tooling where possible.",
    },
    {
      question: "How long does it take to establish an MLOps baseline?",
      answer:
        "A baseline setup usually takes 4-8 weeks depending on current maturity, number of models, and governance requirements. We define phased milestones so value is delivered early.",
    },
    {
      question: "Do you provide support after implementation?",
      answer:
        "Yes. We offer ongoing support for incident response, model performance tuning, retraining strategy, and platform cost optimization.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="MLOps & Model Monitoring"
        description="Keep your AI systems stable, observable, and scalable with production-grade MLOps practices."
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
