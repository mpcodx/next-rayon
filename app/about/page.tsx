import AboutHero from "@/components/about/about-hero"
import Timeline from "@/components/about/timeline"
import TeamSection from "@/components/about/team-section"
import MissionValues from "@/components/about/mission-values"
import CerberSection from "@/components/about/cerber-section"
import AchievementsSection from "@/components/about/achievements-section"
import ExpertiseSection from "@/components/about/expertise-section"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <AboutHero />
      <AchievementsSection />
      <ExpertiseSection />
      <Timeline />
      <MissionValues />
      <TeamSection />
      <CerberSection />
    </div>
  )
}
