import { Facebook, Twitter, Instagram, Linkedin, Github, Mail, Phone, MapPin, ExternalLink, QrCode } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_URI, GOOGLE_BUSINESS_URL } from "@/lib/seo"

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
                businesses of all sizes.
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
                  <span className="text-gray-300/90">Mohali, Punjab, India</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-cyan-300 mr-3" />
                  <a href={`tel:${CONTACT_PHONE_URI}`} className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    {CONTACT_PHONE}
                  </a>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan-300 mr-3" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="text-gray-300/90 hover:text-cyan-300 transition-colors">
                    {CONTACT_EMAIL}
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

          {/* Check us out on Google Card */}
          <div className="mt-14 pt-8 border-t border-white/10">
            <div className="rounded-2xl border border-white/15 bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-cyan-950/40 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
                <div className="relative h-28 w-28 shrink-0 rounded-2xl overflow-hidden bg-white p-1.5 shadow-xl">
                  <Image
                    src="/google-qr-code.png"
                    alt="Scan to check out Rayon Web Solutions on Google"
                    fill
                    sizes="112px"
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-0.5 text-xs text-blue-300 font-medium mb-1.5">
                    <span className="flex text-amber-400">★★★★★</span>
                    <span>Verified Google Business Profile</span>
                  </div>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mb-1">
                    Check us out on <span className="gradient-text">Google</span>
                  </h4>
                  <p className="text-sm text-gray-300 max-w-xl">
                    Scan with your phone camera or tap the button to view our verified Google Business Profile, read genuine client reviews, or get directions to our Mohali office.
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <a
                  href={GOOGLE_BUSINESS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>Open on Google Maps</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
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
