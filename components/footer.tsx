import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Footer() {
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
                  rel="noreferrer"
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
                  rel="noreferrer"
                  className="text-gray-400 hover:text-cyan-300 transition-colors"
                >
                  <Instagram size={20} />
                  <span className="sr-only">Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/rayonwebsolutions/?viewAsMember=true"
                  target="_blank"
                  rel="noreferrer"
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
                  <Link href="/about" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="/projects" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Training
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/sitemap" className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    Sitemap
                  </Link>
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
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex h-11 w-full rounded-xl border border-white/15 bg-white/[0.04] px-3.5 py-2.5 text-base text-white ring-offset-background placeholder:text-slate-400/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-1 focus-visible:ring-offset-slate-950 focus-visible:border-cyan-300/60 md:text-sm"
                />
                <button className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.98]">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Rayon Web Solutions. All rights reserved.</p>
            <div className="flex space-x-6">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-cyan-300 text-sm transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
