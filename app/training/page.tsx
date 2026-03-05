"use client"

import TrainingHero from "@/components/training/training-hero"
import TrainingCourses from "@/components/training/training-courses"
import TrainingBenefits from "@/components/training/training-benefits"
import TrainingInstructors from "@/components/training/training-instructors"
import TrainingTestimonials from "@/components/training/training-testimonials"
import TrainingFaq from "@/components/training/training-faq"
import TrainingCta from "@/components/training/training-cta"
import TrainingForm from "@/components/training/training-form"

export default function TrainingPage() {
  return (
    <main className="min-h-screen text-white">
      <TrainingHero />
      <TrainingCourses />
      <TrainingBenefits />
      <TrainingInstructors />
      <TrainingTestimonials />
      <TrainingForm />
      <TrainingFaq />
      <TrainingCta />
    </main>
  )
}
