"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Code2,
  BrainCircuit,
  Server,
  ShieldCheck,
  MapPin,
  Clock,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Mail,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Search,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import JobApplicationForm from "@/components/careers/job-application-form"

interface JobOpening {
  id: string
  title: string
  category: "frontend" | "aiml" | "devops" | "cybersecurity"
  categoryLabel: string
  department: string
  location: string
  type: string
  experience: string
  batch: string
  icon: typeof Code2
  accentColor: {
    gradient: string
    badgeBg: string
    badgeText: string
    borderHover: string
    buttonGlow: string
  }
  tagline: string
  skills: string[]
  overview: string
  responsibilities: string[]
  requirements: string[]
  perks: string[]
}

const jobOpenings: JobOpening[] = [
  {
    id: "frontend-developer",
    title: "Frontend Developer (Fresher)",
    category: "frontend",
    categoryLabel: "Frontend",
    department: "Frontend Engineering",
    location: "Mohali / Hybrid / Remote",
    type: "Full-Time",
    experience: "Fresher (0 - 1 Year)",
    batch: "2024, 2025 & 2026 Batch",
    icon: Code2,
    accentColor: {
      gradient: "from-cyan-500/20 via-blue-500/10 to-indigo-500/20",
      badgeBg: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30",
      badgeText: "text-cyan-400",
      borderHover: "hover:border-cyan-500/50 hover:shadow-cyan-500/10",
      buttonGlow: "from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500",
    },
    tagline: "Build fluid, high-performance web applications using React, Next.js, and Tailwind CSS.",
    skills: ["React.js", "Next.js 14/15", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)", "REST APIs", "Git & GitHub", "HTML5 & CSS3"],
    overview:
      "Join our engineering team to build sleek, lightning-fast digital experiences. You will work on real client products, modern component design systems, and progressive web apps with direct guidance from senior frontend architects.",
    responsibilities: [
      "Develop responsive, pixel-perfect user interfaces using Next.js, React, and Tailwind CSS.",
      "Integrate RESTful APIs and asynchronous state handling with clean TypeScript patterns.",
      "Collaborate with UI/UX designers to translate Figma wireframes into fluid, accessible code.",
      "Optimize web pages for maximum speed, SEO, Core Web Vitals, and cross-browser reliability.",
      "Participate in code reviews, write clean self-documenting code, and learn automated testing.",
    ],
    requirements: [
      "B.Tech / B.E. / BCA / MCA / B.Sc in Computer Science, IT, or related technical stream (2024–2026).",
      "Strong conceptual grasp of JavaScript (ES6+), DOM manipulation, HTML5, and CSS3 fundamentals.",
      "Hands-on practice or academic projects built with React.js or Next.js.",
      "Familiarity with Tailwind CSS, Git version control, and browser debugging tools.",
      "Keen eye for visual detail, smooth animations, and responsive mobile-first layouts.",
      "A live portfolio, personal website, or active GitHub profile with frontend projects is a strong plus.",
    ],
    perks: [
      "1-on-1 mentorship with experienced senior frontend engineers.",
      "Hands-on exposure to Next.js 15, Turbopack, and modern cloud deployment.",
      "Structured learning roadmap with regular code reviews and performance appraisals.",
    ],
  },
  {
    id: "python-aiml-engineer",
    title: "Python AI / ML Engineer (Fresher)",
    category: "aiml",
    categoryLabel: "AI & ML",
    department: "AI & Intelligent Systems",
    location: "Mohali / Hybrid / Remote",
    type: "Full-Time",
    experience: "Fresher (0 - 1 Year)",
    batch: "2024, 2025 & 2026 Batch",
    icon: BrainCircuit,
    accentColor: {
      gradient: "from-purple-500/20 via-pink-500/10 to-indigo-500/20",
      badgeBg: "bg-purple-500/10 text-purple-400 border border-purple-500/30",
      badgeText: "text-purple-400",
      borderHover: "hover:border-purple-500/50 hover:shadow-purple-500/10",
      buttonGlow: "from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
    },
    tagline: "Build generative AI pipelines, intelligent LLM agents, and scalable machine learning microservices.",
    skills: ["Python 3", "FastAPI", "PyTorch / TensorFlow", "Scikit-Learn", "Pandas & NumPy", "LangChain & RAG", "LLM APIs", "Vector DBs"],
    overview:
      "Step into the future of applied artificial intelligence. You will collaborate on generative AI tools, Retrieval-Augmented Generation (RAG) pipelines, data preprocessing workflows, and production-ready Python APIs.",
    responsibilities: [
      "Build, test, and deploy high-performance Python APIs and AI services using FastAPI or Flask.",
      "Implement Retrieval-Augmented Generation (RAG) pipelines with vector search (ChromaDB, Pinecone, FAISS).",
      "Perform data cleaning, feature engineering, and exploratory data analysis using Pandas and NumPy.",
      "Integrate modern LLM APIs (OpenAI, Anthropic, Hugging Face) into business workflows and chatbots.",
      "Evaluate model performance, optimize inference latency, and document experimental results.",
    ],
    requirements: [
      "Degree in Computer Science, Data Science, AI/ML, Mathematics, or related field (2024–2026 batch).",
      "Solid proficiency in Python programming and object-oriented design patterns.",
      "Strong understanding of core ML fundamentals (supervised/unsupervised learning, neural networks, loss functions).",
      "Hands-on experience with NumPy, Pandas, Scikit-learn, and basic PyTorch or TensorFlow.",
      "Curiosity about generative AI, prompt engineering, and modern LLM orchestration frameworks.",
      "Kaggle achievements, GitHub projects with AI/ML notebooks, or AI project demonstrations.",
    ],
    perks: [
      "Dedicated GPU computing environment & access to leading commercial and open-source AI models.",
      "Direct guidance from senior AI architects working on enterprise generative AI systems.",
      "Opportunity to contribute to open-source and cutting-edge production AI applications.",
    ],
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer (Fresher)",
    category: "devops",
    categoryLabel: "DevOps",
    department: "Cloud & Infrastructure",
    location: "Mohali / Hybrid / Remote",
    type: "Full-Time",
    experience: "Fresher (0 - 1 Year)",
    batch: "2024, 2025 & 2026 Batch",
    icon: Server,
    accentColor: {
      gradient: "from-amber-500/20 via-orange-500/10 to-emerald-500/20",
      badgeBg: "bg-amber-500/10 text-amber-400 border border-amber-500/30",
      badgeText: "text-amber-400",
      borderHover: "hover:border-amber-500/50 hover:shadow-amber-500/10",
      buttonGlow: "from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500",
    },
    tagline: "Automate cloud infrastructure, build rock-solid CI/CD pipelines, and manage containerized systems.",
    skills: ["Linux / Bash", "Docker", "GitHub Actions", "CI/CD", "AWS Basics", "Nginx", "Git & GitHub", "CloudWatch / Monitoring"],
    overview:
      "Become the backbone of our deployment operations. You will learn to architect automated deployment workflows, configure Linux servers, containerize applications, and monitor mission-critical systems in the cloud.",
    responsibilities: [
      "Containerize frontend and backend microservices using Docker and Docker Compose.",
      "Build, maintain, and troubleshoot automated CI/CD pipelines using GitHub Actions.",
      "Configure and administer Linux servers, SSH keys, reverse proxies (Nginx), and SSL certificates.",
      "Monitor system health, log streams, and server metrics using monitoring and alerting tools.",
      "Write clean Bash and Python automation scripts for scheduled maintenance, database backups, and health checks.",
    ],
    requirements: [
      "B.Tech / B.E. / BCA / MCA in Computer Science, IT, Electronics, or related fields (2024–2026 batch).",
      "Solid understanding of Linux operating system concepts, file permissions, and CLI navigation.",
      "Basic grasp of networking concepts: TCP/IP, DNS, ports, HTTP/HTTPS, load balancing, and firewalls.",
      "Hands-on practice with Docker containerization and Git version control.",
      "Exposure to any public cloud platform (AWS, GCP, or DigitalOcean) via coursework or home projects.",
      "Certifications (AWS Certified Cloud Practitioner, Linux Essentials) or home-lab projects are a huge plus.",
    ],
    perks: [
      "Real-world cloud sandbox accounts and enterprise infrastructure practice.",
      "Mentorship on Kubernetes, Terraform, and modern Site Reliability Engineering (SRE).",
      "Accelerated career pathway into high-demand Cloud Architect and DevOps Specialist roles.",
    ],
  },
  {
    id: "cybersecurity-specialist",
    title: "Cybersecurity Specialist (Fresher)",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    department: "Information Security",
    location: "Mohali / Hybrid / Remote",
    type: "Full-Time",
    experience: "Fresher (0 - 1 Year)",
    batch: "2024, 2025 & 2026 Batch",
    icon: ShieldCheck,
    accentColor: {
      gradient: "from-emerald-500/20 via-teal-500/10 to-cyan-500/20",
      badgeBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
      badgeText: "text-emerald-400",
      borderHover: "hover:border-emerald-500/50 hover:shadow-emerald-500/10",
      buttonGlow: "from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500",
    },
    tagline: "Defend applications, conduct vulnerability assessments, and champion secure engineering practices.",
    skills: ["OWASP Top 10", "Network Security", "Wireshark", "Burp Suite", "Vulnerability Scanning", "Linux Security", "Nmap", "Python / Bash"],
    overview:
      "Protect our web applications and client infrastructure against evolving digital threats. You will conduct security assessments, investigate vulnerabilities, perform web pen-testing, and learn defensive & offensive cybersecurity strategies.",
    responsibilities: [
      "Perform web application security evaluations based on OWASP Top 10 (SQLi, XSS, CSRF, IDOR, etc.).",
      "Conduct network scans, port discovery, and traffic analysis using tools like Nmap and Wireshark.",
      "Assist in vulnerability scanning and manual penetration testing using Burp Suite and OWASP ZAP.",
      "Collaborate with developers to explain vulnerability findings and verify remediation patches.",
      "Help formulate security checklists, incident response playbooks, and secure coding guidelines.",
    ],
    requirements: [
      "Degree in Cyber Security, Computer Science, IT, or related engineering discipline (2024–2026 batch).",
      "Sound understanding of network security, cryptography basics, TCP/IP stack, and SSL/TLS handshakes.",
      "Thorough theoretical and practical knowledge of OWASP Top 10 web vulnerabilities.",
      "Familiarity with standard security toolkits: Wireshark, Burp Suite Community, Nmap, or Kali Linux.",
      "Basic scripting ability in Python, Bash, or JavaScript for proof-of-concept verification.",
      "Active participation in TryHackMe, Hack The Box, CTF challenges, or certifications (CEH, Security+) is highly valued.",
    ],
    perks: [
      "Work alongside seasoned cybersecurity consultants on live vulnerability assessments.",
      "Hands-on experience across both defensive (Blue Team) and offensive (Red Team) disciplines.",
      "Support and sponsorship for industry-recognized security certifications and CTF competitions.",
    ],
  },
]

export default function CareersOpenings() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [expandedJobId, setExpandedJobId] = useState<string | null>(null)
  const [applicationJobTitle, setApplicationJobTitle] = useState<string | null>(null)
  const [emailCopied, setEmailCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("hr@rayonweb.com")
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  const toggleExpand = (id: string) => {
    setExpandedJobId((prev) => (prev === id ? null : id))
  }

  const filteredJobs = jobOpenings.filter((job) => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === "" ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      job.tagline.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <section id="openings" className="py-16 relative">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-purple-600/5 blur-[120px] pointer-events-none -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Fresher & Early Career Openings (2024 - 2026 Batch)
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
            Kickstart Your Tech Career at <span className="gradient-text">Rayon</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We are actively hiring ambitious freshers across 4 specialized technical tracks. Build real products, learn from senior engineers, and accelerate your career.
          </p>
        </motion.div>

        {/* Prominent Quick Email Application Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-12 rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-purple-900/30 via-blue-900/20 to-gray-900/60 border border-purple-500/30 shadow-xl relative overflow-hidden"
        >
          <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-purple-400 text-sm font-semibold">
                <Mail className="h-4 w-4" />
                <span>Direct Application to HR</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Two Simple Ways to Apply: Submit Form or Email Directly
              </h3>
              <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
                Click <span className="text-purple-400 font-medium">"Apply with Form"</span> on any role to open our application modal, or send your resume directly to{" "}
                <span className="text-white font-mono bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800/40">
                  hr@rayonweb.com
                </span>{" "}
                with the role name in your subject line.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              <Button
                type="button"
                onClick={handleCopyEmail}
                variant="outline"
                className="border-purple-500/40 text-purple-300 hover:bg-purple-950/50 hover:text-white flex items-center gap-2"
              >
                {emailCopied ? (
                  <>
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span className="text-emerald-400">Copied hr@rayonweb.com</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span>Copy hr@rayonweb.com</span>
                  </>
                )}
              </Button>

              <a
                href="mailto:hr@rayonweb.com?subject=Fresher%20Job%20Application%20-%20Rayon%20Web%20Solutions&body=Hello%20HR%20Team%2C%0A%0AI%20am%20interested%20in%20applying%20for%20a%20Fresher%20position%20at%20Rayon%20Web%20Solutions.%0A%0APlease%20find%20my%20resume%20attached.%0A%0AName%3A%20%0APhone%3A%20%0ARole%20Applied%20For%3A%20%0AGraduation%20Year%3A%20%0AGitHub%2FPortfolio%3A%20%0A%0AThank%20you!"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-semibold shadow-lg shadow-purple-600/20 transition-all"
              >
                <Mail className="h-4 w-4" />
                <span>Open Email App</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {[
              { id: "all", label: "All Roles (4)" },
              { id: "frontend", label: "Frontend" },
              { id: "aiml", label: "Python AI / ML" },
              { id: "devops", label: "DevOps" },
              { id: "cybersecurity", label: "Cybersecurity" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-gray-900/80 text-gray-400 hover:text-white border border-gray-800 hover:border-gray-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search skills or roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-full bg-gray-900/80 border border-gray-800 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredJobs.map((job, index) => {
              const Icon = job.icon
              const isExpanded = expandedJobId === job.id

              const mailtoSubject = encodeURIComponent(`Application: ${job.title} - [Your Name]`)
              const mailtoBody = encodeURIComponent(
                `Hello Rayon HR Team,\n\nI would like to apply for the ${job.title} position.\n\nMy details:\n- Full Name: \n- Phone Number: \n- College & Degree: \n- Graduation Year: \n- GitHub / Portfolio Link: \n\nPlease find my resume attached.\n\nThank you,\n`
              )

              return (
                <motion.div
                  key={job.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className={`rounded-2xl p-6 sm:p-8 bg-gradient-to-b from-gray-900/90 to-gray-950/90 border border-gray-800 transition-all duration-300 flex flex-col justify-between ${job.accentColor.borderHover} shadow-xl`}
                >
                  <div>
                    {/* Top Header & Badges */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${job.accentColor.gradient} border border-gray-700/50 text-white`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${job.accentColor.badgeBg}`}>
                            {job.department}
                          </span>
                          <span className="ml-2 text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Actively Hiring
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Job Title & Tagline */}
                    <h3 className="text-2xl font-bold text-white mb-2">{job.title}</h3>
                    <p className="text-sm text-gray-300 mb-5 leading-relaxed">{job.tagline}</p>

                    {/* Meta Information Pills */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6 text-xs text-gray-300">
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                        <Briefcase className="h-3.5 w-3.5 text-purple-400 flex-shrink-0" />
                        <span className="truncate">{job.experience}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                        <GraduationCap className="h-3.5 w-3.5 text-blue-400 flex-shrink-0" />
                        <span className="truncate">{job.batch}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 p-2 rounded-lg bg-gray-900/60 border border-gray-800/80">
                        <Clock className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{job.type}</span>
                      </div>
                    </div>

                    {/* Skills Chips */}
                    <div className="mb-6">
                      <div className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
                        Key Technologies & Tools
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {job.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1 rounded-md bg-gray-800/80 text-gray-300 text-xs border border-gray-700/60 font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expandable Details Accordion */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-5 pt-4 border-t border-gray-800 text-xs text-gray-300 overflow-hidden mb-6"
                        >
                          {/* Role Overview */}
                          <div>
                            <h4 className="font-bold text-white text-sm mb-1.5">Role Overview</h4>
                            <p className="leading-relaxed text-gray-300">{job.overview}</p>
                          </div>

                          {/* Responsibilities */}
                          <div>
                            <h4 className="font-bold text-white text-sm mb-2">What You'll Do (Responsibilities)</h4>
                            <ul className="space-y-1.5">
                              {job.responsibilities.map((r, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-300">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                                  <span>{r}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Requirements */}
                          <div>
                            <h4 className="font-bold text-white text-sm mb-2">What We're Looking For (Eligibility & Skills)</h4>
                            <ul className="space-y-1.5">
                              {job.requirements.map((req, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-300">
                                  <CheckCircle2 className="h-3.5 w-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Fresher Growth & Perks */}
                          <div className="p-3 rounded-lg bg-gray-900/80 border border-gray-800">
                            <h4 className="font-bold text-purple-300 text-xs mb-1.5 flex items-center gap-1.5">
                              <Sparkles className="h-3.5 w-3.5 text-purple-400" />
                              What Freshers Get at Rayon
                            </h4>
                            <ul className="space-y-1">
                              {job.perks.map((p, i) => (
                                <li key={i} className="text-gray-300 flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                                  <span>{p}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Actions Bar */}
                  <div className="space-y-3 pt-4 border-t border-gray-800/80">
                    {/* Expand/Collapse Toggle Button */}
                    <button
                      type="button"
                      onClick={() => toggleExpand(job.id)}
                      className="w-full py-1.5 text-xs text-gray-400 hover:text-white flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? "Hide Requirements & Overview" : "View Full Job Requirements & Details"}</span>
                      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    </button>

                    {/* Dual Action Buttons: Form Modal & Direct Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <Button
                        type="button"
                        onClick={() => setApplicationJobTitle(job.title)}
                        className={`w-full bg-gradient-to-r ${job.accentColor.buttonGlow} text-white font-medium text-xs sm:text-sm py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-1.5`}
                      >
                        <span>Apply with Form</span>
                        <ArrowRight className="h-4 w-4" />
                      </Button>

                      <a
                        href={`mailto:hr@rayonweb.com?subject=${mailtoSubject}&body=${mailtoBody}`}
                        className="w-full inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg border border-gray-700 bg-gray-900/80 hover:bg-gray-800 text-gray-200 text-xs sm:text-sm font-medium transition-all hover:border-gray-600 text-center"
                      >
                        <Mail className="h-4 w-4 text-purple-400" />
                        <span>Email Resume to HR</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No openings found matching your filter criteria.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("all")
                setSearchQuery("")
              }}
              className="mt-4 text-sm border-gray-700"
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Application Modal Dialog */}
        {applicationJobTitle !== null && (
          <Dialog open={applicationJobTitle !== null} onOpenChange={() => setApplicationJobTitle(null)}>
            <DialogContent className="sm:max-w-[620px] bg-gray-950/95 backdrop-blur-xl border border-purple-500/30 text-white shadow-2xl p-6">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                    Fresher Application
                  </span>
                </div>
                <DialogTitle className="text-2xl font-bold text-white">
                  Apply for <span className="gradient-text">{applicationJobTitle}</span>
                </DialogTitle>
                <DialogDescription className="text-gray-400 text-xs sm:text-sm">
                  Complete the quick form below or email your resume directly to{" "}
                  <a href="mailto:hr@rayonweb.com" className="text-purple-400 underline font-medium">
                    hr@rayonweb.com
                  </a>
                  . We will review your application within 2–3 business days.
                </DialogDescription>
              </DialogHeader>

              <JobApplicationForm
                jobTitle={applicationJobTitle}
                onClose={() => setApplicationJobTitle(null)}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  )
}
