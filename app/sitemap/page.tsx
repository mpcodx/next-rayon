import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { blogPosts } from "@/lib/blog-data"

export const metadata: Metadata = {
  title: "Sitemap | Rayon Web Solutions",
  description: "Complete sitemap of Rayon Web Solutions website with links to all pages and services.",
}

export default function SitemapPage() {
  return (
    <main className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Sitemap</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          A complete overview of all pages available on the Rayon Web Solutions website
        </p>
      </div>

      <div className="grid gap-8 mb-16">
        <Card>
          <CardHeader>
            <CardTitle>Main Pages</CardTitle>
            <CardDescription>Primary navigation pages of our website</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <li>
                <Link href="/" className="flex items-center text-purple-500 hover:text-purple-600 transition-colors">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/training"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Training
                </Link>
              </li>
              <li>
                <Link
                  href="/training/courses"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Training Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="flex items-center text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Terms of Use
                </Link>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Services</CardTitle>
            <CardDescription>Our main service categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              <li>
                <div className="mb-2">
                  <Link
                    href="/services/web-development"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    Web Development
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/web-development/custom-website-design"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Custom Website Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/web-development/ecommerce-solutions"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      E-commerce Solutions
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/web-development/cms-integration"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      CMS Integration
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href="/services/app-development"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    App Development
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/app-development/mobile-apps"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Mobile Apps
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/app-development/progressive-web-apps"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Progressive Web Apps
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/app-development/cross-platform-apps"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Cross-Platform Apps
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href="/services/devops-cloud"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    DevOps & Cloud
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/devops-cloud/cloud-setup"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Cloud Setup
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/devops-cloud/ci-cd-pipelines"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      CI/CD Pipelines
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/devops-cloud/docker-kubernetes"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Docker & Kubernetes
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href="/services/ui-ux-design"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    UI/UX Design
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/ui-ux-design/wireframes-prototyping"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Wireframes & Prototyping
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ui-ux-design/web-mobile-design"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Web & Mobile Design
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ui-ux-design/design-systems"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Design Systems
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href="/services/lms-integration"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    LMS Integration
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/lms-integration/custom-lms"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Custom LMS
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/lms-integration/payment-integration"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Payment Integration
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/lms-integration/crm-api-integration"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      CRM & API Integration
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href="/services/qa-automation"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    QA & Automation
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/qa-automation/manual-testing"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Manual Testing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/qa-automation/automated-ci-tests"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Automated CI Tests
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/qa-automation/performance-audits"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Performance Audits
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <div className="mb-2">
                  <Link
                    href="/services/ai-ml"
                    className="text-lg font-medium text-purple-500 hover:text-purple-600 transition-colors flex items-center"
                  >
                    <ChevronRight className="h-5 w-5 mr-2" />
                    AI & Machine Learning
                  </Link>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 pl-7">
                  <li>
                    <Link
                      href="/services/ai-ml/hugging-face-models"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Hugging Face Models
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/llm-development"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      LLM Development
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/custom-model-training"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Custom Model Training
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/predictive-analytics"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Predictive Analytics
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/ai-integration"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      AI Integration
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/computer-vision"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Computer Vision
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/conversational-ai"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      Conversational AI
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services/ai-ml/mlops-model-monitoring"
                      className="text-sm text-gray-600 hover:text-purple-500 transition-colors"
                    >
                      MLOps & Model Monitoring
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blog Pages</CardTitle>
            <CardDescription>All inner blog article pages</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {blogPosts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex items-start justify-between gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:border-purple-400 hover:text-purple-600 transition-colors"
                  >
                    <span className="inline-flex items-start gap-2">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0" />
                      {post.title}
                    </span>
                    <span className="shrink-0 text-xs text-gray-500 group-hover:text-purple-500">{post.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Link
          href="/contact"
          className="inline-flex items-center text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3 rounded-md font-medium transition-all"
        >
          Contact Us
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>
    </main>
  )
}
