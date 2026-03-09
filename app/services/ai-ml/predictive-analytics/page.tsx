import SubServiceHero from "@/components/services/sub-service-hero"
import SubServiceFeatures from "@/components/services/sub-service-features"
import SubServiceProcess from "@/components/services/sub-service-process"
import SubServiceTechnologies from "@/components/services/sub-service-technologies"
import SubServiceFAQ from "@/components/services/sub-service-faq"
import SubServiceCTA from "@/components/services/sub-service-cta"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/services/ai-ml/predictive-analytics")

export default function PredictiveAnalyticsPage() {
  const features = [
    {
      title: "Demand Forecasting",
      description:
        "Forecast product demand, staffing needs, and seasonal behavior with machine learning time-series models.",
    },
    {
      title: "Churn & Risk Prediction",
      description:
        "Identify customers or transactions at risk so teams can take proactive action before loss occurs.",
    },
    {
      title: "Revenue & KPI Modeling",
      description:
        "Model revenue, conversion, and operational KPIs to support planning and strategic decision-making.",
    },
    {
      title: "Anomaly Detection",
      description:
        "Detect unusual trends in operations, payments, or user behavior to reduce incidents and fraud exposure.",
    },
    {
      title: "Scenario Simulation",
      description:
        "Run what-if simulations to evaluate business decisions under different market or operational conditions.",
    },
    {
      title: "Decision Intelligence Dashboards",
      description:
        "Deliver predictions and confidence metrics inside clear dashboards for executives and operations teams.",
    },
  ]

  const process = [
    {
      title: "Business Goal Mapping",
      description:
        "We align forecasting objectives to measurable business outcomes such as growth, retention, and efficiency.",
    },
    {
      title: "Data Audit & Feature Engineering",
      description:
        "We assess data quality, create meaningful features, and define the right prediction targets.",
    },
    {
      title: "Model Selection",
      description:
        "We choose and benchmark the best models for your use case, balancing accuracy, latency, and explainability.",
    },
    {
      title: "Training & Validation",
      description:
        "We train, cross-validate, and backtest models against historical performance and business constraints.",
    },
    {
      title: "Deployment & Integration",
      description:
        "We deploy predictions through APIs, dashboards, or workflows integrated with your existing systems.",
    },
    {
      title: "Monitoring & Continuous Improvement",
      description:
        "We monitor model drift, recalibrate thresholds, and retrain to keep results accurate over time.",
    },
  ]

  const technologies = [
    "Python",
    "Pandas",
    "Scikit-learn",
    "XGBoost",
    "LightGBM",
    "Prophet",
    "PyTorch",
    "MLflow",
    "Airflow",
    "Power BI / Looker",
  ]

  const faqs = [
    {
      question: "What types of businesses benefit from predictive analytics?",
      answer:
        "Predictive analytics is valuable across retail, logistics, finance, healthcare, SaaS, and manufacturing. Common use cases include demand forecasting, churn prediction, fraud detection, sales planning, and operational optimization.",
    },
    {
      question: "How much historical data is required for forecasting?",
      answer:
        "Requirements vary by use case, but most forecasting projects benefit from at least 6-12 months of historical data. If data is limited, we can use transfer approaches, external signals, and simpler models to provide useful insights while data matures.",
    },
    {
      question: "Can you explain model predictions to non-technical teams?",
      answer:
        "Yes. We include explainability techniques and business-readable reporting so stakeholders can understand key drivers, confidence levels, and recommended actions behind each prediction.",
    },
    {
      question: "How often should prediction models be retrained?",
      answer:
        "Retraining frequency depends on data volatility and business cadence. Some models update weekly, others monthly or quarterly. We define retraining schedules and alerts based on drift and performance thresholds.",
    },
    {
      question: "Do you support real-time and batch prediction workflows?",
      answer:
        "Yes. We build both batch pipelines for periodic planning and real-time endpoints for live decision support, depending on your operational requirements.",
    },
  ]

  return (
    <div className="flex flex-col gap-0">
      <SubServiceHero
        title="Predictive Analytics & Forecasting"
        description="Use machine learning forecasting and risk models to make faster, smarter business decisions with confidence."
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
