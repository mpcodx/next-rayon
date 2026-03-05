"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"


export default function Footer() {
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    // Add a small timeout to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 100)
  }

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-slate-950/75 pt-24 pb-12">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 -top-16 h-72 w-72 rounded-full bg-cyan-500/12 blur-3xl" />
        <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-indigo-500/14 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="glass-card rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/15">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <Link href="/" className="flex items-center">
                <Image src={"/logo3.png"} alt={"logo"} height="200" width="300" className="object-cover" />
              </Link>
              <p className="text-gray-300/85 mb-6">
                Your Vision, Our Code - Turning Ideas into Reality. We build high-performance digital solutions for
                businesses worldwide.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61573818253676"
                  target="_blank"
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  <Facebook size={20} />
                  <span className="sr-only">Facebook</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  <Twitter size={20} />
                  <span className="sr-only">Twitter</span>
                </a>
                <a
                  href="https://www.instagram.com/rayonwebsolutions/"
                  target="_blank"
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/rayonwebsolutions/?viewAsMember=true"
                  target="_blank"
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  <Linkedin size={20} />
                  <span className="sr-only">LinkedIn</span>
                </a>
                <a href="#" className="text-gray-400 hover:text-cyan-300 transition-colors">
                  <Github size={20} />
                  <span className="sr-only">GitHub</span>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="/about"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/about")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/services")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/security"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/security")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="/projects"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/projects")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/blog")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/careers"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/careers")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="/training"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/training")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Training
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/contact")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/sitemap"
                    onClick={(e) => {
                      e.preventDefault()
                      handleNavigation("/sitemap")
                    }}
                    className="text-gray-300/90 hover:text-cyan-300 transition-colors"
                  >
                    Sitemap
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-cyan-300 mr-3 mt-0.5" />
                  <span className="text-gray-300/90">Mohali</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-cyan-300 mr-3" />
                  <a href="tel:+11234567890" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    +1 (123) 456-7890
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan-300 mr-3" />
                  <a href="mailto:info@rayonweb.com" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    info@rayonweb.com
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">Subscribe</h3>
              <p className="text-gray-300/85 mb-4">Subscribe to our newsletter to receive updates and tech insights.</p>
              <div className="space-y-3">
                <Input type="email" placeholder="Your email address" className="text-white" />
                <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Rayon Web Solutions. All rights reserved.</p>
            <div className="flex space-x-6">
              <a
                href="/privacy-policy"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/privacy-policy")
                }}
                className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                onClick={(e) => {
                  e.preventDefault()
                  handleNavigation("/terms")
                }}
                className="text-gray-400 hover:text-cyan-300 text-sm transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
