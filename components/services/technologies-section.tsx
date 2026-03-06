"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const technologies = [
  {
    category: "Frontend",
    techs: [
      { name: "React", logo: "/technologies/react.png" },
      { name: "TypeScript" },
      { name: "JavaScript" },
      { name: "Next.js", logo: "/technologies/next.png" },
      { name: "Vue.js", logo: "/technologies/vue.png" },
      { name: "Nuxt.js" },
      { name: "Redux" },
      { name: "Angular", logo: "/technologies/angularjs.png" },
      { name: "Svelte" },
      { name: "Tailwind CSS", logo: "/technologies/tailwind.png" },
      { name: "Bootstrap" },
    ],
  },
  {
    category: "Backend",
    techs: [
      { name: "Node.js", logo: "/technologies/node.png" },
      { name: "Express.js" },
      { name: "NestJS" },
      { name: "Python", logo: "/technologies/python.png" },
      { name: "Django" },
      { name: "FastAPI" },
      { name: "PHP", logo: "/technologies/php.png" },
      { name: "Laravel" },
      { name: "Java", logo: "/technologies/java.png" },
      { name: "Spring Boot" },
      { name: ".NET", logo: "/technologies/net.png" },
    ],
  },
  {
    category: "Mobile",
    techs: [
      { name: "React Native", logo: "/technologies/react-native.png" },
      { name: "Flutter", logo: "/technologies/flutter.png" },
      { name: "Swift", logo: "/technologies/swift.png" },
      { name: "Kotlin", logo: "/technologies/kotlin.png" },
      { name: "Android SDK" },
      { name: "iOS SDK" },
      { name: "Expo" },
      { name: "Firebase" },
    ],
  },
  {
    category: "Cloud & DevOps",
    techs: [
      { name: "Docker", logo: "/technologies/docker.png" },
      { name: "Kubernetes", logo: "/technologies/kubernetes.png" },
      { name: "AWS", logo: "/technologies/aws.png" },
      { name: "Azure", logo: "/technologies/azure.png" },
      { name: "Google Cloud", logo: "/technologies/gcp.jpeg" },
      { name: "GitHub Actions" },
      { name: "Jenkins" },
      { name: "Terraform" },
      { name: "Helm" },
      { name: "Nginx" },
      { name: "Linux" },
    ],
  },
  {
    category: "Database & Analytics",
    techs: [
      { name: "PostgreSQL" },
      { name: "MySQL" },
      { name: "MongoDB" },
      { name: "Redis" },
      { name: "Elasticsearch" },
      { name: "BigQuery" },
      { name: "Snowflake" },
      { name: "Supabase" },
    ],
  },
  {
    category: "AI & ML",
    techs: [
      { name: "OpenAI API" },
      { name: "Hugging Face" },
      { name: "LangChain" },
      { name: "LlamaIndex" },
      { name: "PyTorch" },
      { name: "TensorFlow" },
      { name: "scikit-learn" },
      { name: "MLflow" },
      { name: "Pinecone" },
      { name: "ChromaDB" },
      { name: "Apache Airflow" },
      { name: "Weights & Biases" },
    ],
  },
]

export default function TechnologiesSection() {
  return (
    <section className="py-20 bg-gray-950/45">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <span className="inline-flex rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-200 mb-4">
            Technology Stack
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Technologies We <span className="gradient-text">Build With</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            We choose stable, modern tools that keep your product fast, secure, and easy to evolve.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {technologies.map((category, catIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: catIndex * 0.08 }}
              className="glass-card rounded-2xl p-6 border border-white/10"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-xl font-bold">{category.category}</h3>
                <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                  {category.techs.length} tools
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {category.techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3 flex items-center gap-3 hover:border-cyan-400/35 transition-colors"
                  >
                    <div className="h-9 w-9 rounded-md bg-slate-900/80 flex items-center justify-center overflow-hidden">
                      {tech.logo ? (
                        <Image src={tech.logo} alt={tech.name} width={28} height={28} className="object-contain" />
                      ) : (
                        <span className="text-[10px] font-semibold text-cyan-300">{tech.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <span className="text-sm text-gray-200 leading-tight">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
