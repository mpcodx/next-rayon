import LegalHero from "@/components/legal/legal-hero"
import LegalContent from "@/components/legal/legal-content"
import { getPageMetadata } from "@/lib/seo"

export const metadata = getPageMetadata("/terms")

export default function TermsPage() {
  const pageData = {
    title: "Terms of Use",
    lastUpdated: "May 1, 2023",
    content: [
      {
        heading: "Introduction",
        text: "These terms and conditions outline the rules and regulations for the use of Rayon Web Solutions' website. By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Rayon Web Solutions' website if you do not accept all of the terms and conditions stated on this page.",
      },
      {
        heading: "Intellectual Property Rights",
        text: "Unless otherwise stated, Rayon Web Solutions and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.",
      },
      {
        heading: "Restrictions",
        text: "You are specifically restricted from: publishing any website material in any media; selling, sublicensing and/or otherwise commercializing any website material; publicly performing and/or showing any website material; using this website in any way that is, or may be, damaging to this website; using this website in any way that impacts user access to this website.",
      },
      {
        heading: "Your Content",
        text: "In these terms and conditions, 'your content' means any audio, video, text, images or other material you choose to display on this website. By displaying your content, you grant Rayon Web Solutions a non-exclusive, worldwide, irrevocable, royalty-free, sublicensable license to use, reproduce, adapt, publish, translate and distribute it in any and all media.",
      },
      {
        heading: "No Warranties",
        text: "This website is provided 'as is' with no warranties, expressed or implied. Rayon Web Solutions makes no representations or warranties of any kind concerning the website, expressed, implied, statutory or otherwise, including, without limitation, warranties of title, merchantability, fitness for a particular purpose, non-infringement, or the absence of latent or other defects, accuracy, or the presence or absence of errors, whether or not discoverable.",
      },
      {
        heading: "Limitation of Liability",
        text: "In no event shall Rayon Web Solutions, nor any of its officers, directors and employees, be liable to you for anything arising out of or in any way connected with your use of this website, whether such liability is under contract, tort or otherwise, and Rayon Web Solutions, including its officers, directors and employees shall not be liable for any indirect, consequential or special liability arising out of or in any way related to your use of this website.",
      },
      {
        heading: "Governing Law & Jurisdiction",
        text: "These terms will be governed by and construed in accordance with the laws of the United States, and you submit to the non-exclusive jurisdiction of the state and federal courts located in California for the resolution of any disputes.",
      },
    ],
  }

  return (
    <div className="flex flex-col gap-12 pb-20">
      <LegalHero title={pageData.title} lastUpdated={pageData.lastUpdated} />
      <LegalContent content={pageData.content} />
    </div>
  )
}
