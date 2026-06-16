export interface LocationConfig {
  slug: string
  locationName: string
  region: string
  title: string
  description: string
  keywords: string[]
}

export const locationsList: LocationConfig[] = [
  // International Countries
  {
    slug: "web-development-usa",
    locationName: "USA",
    region: "United States",
    title: "Web Development Company in USA | Rayon Web Solutions",
    description: "Rayon Web Solutions is a leading web development company in USA building high-performance web applications, custom ecommerce stores, and AI solutions.",
    keywords: ["web development company USA", "custom software development USA", "ecommerce solutions USA", "React Next.js development USA"],
  },
  {
    slug: "web-development-uae",
    locationName: "UAE",
    region: "United Arab Emirates",
    title: "Web Development Company in UAE | Rayon Web Solutions",
    description: "Rayon Web Solutions delivers top-tier web development, custom applications, and software engineering services for businesses and startups in the UAE.",
    keywords: ["web development company UAE", "software development Dubai", "ecommerce website development UAE", "AI integration UAE"],
  },
  {
    slug: "web-development-australia",
    locationName: "Australia",
    region: "Australia",
    title: "Web Development Company in Australia | Rayon Web Solutions",
    description: "Rayon Web Solutions provides custom web development, UI/UX design, and AI engineering services across Australia, including Sydney, Melbourne, and Brisbane.",
    keywords: ["web development company Australia", "app development Australia", "custom software development Australia", "ecommerce websites Australia"],
  },
  {
    slug: "web-development-uk",
    locationName: "UK",
    region: "United Kingdom",
    title: "Web Development Company in UK | Rayon Web Solutions",
    description: "Rayon Web Solutions delivers professional web development, Next.js engineering, custom CMS, and AI integrations for businesses in the UK.",
    keywords: ["web development company UK", "custom software UK", "ecommerce development London", "web application development UK"],
  },
  {
    slug: "web-development-canada",
    locationName: "Canada",
    region: "Canada",
    title: "Web Development Company in Canada | Rayon Web Solutions",
    description: "Looking for top web developers in Canada? Rayon Web Solutions offers custom website design, ecommerce platforms, and digital engineering services.",
    keywords: ["web development Canada", "software development Toronto", "website design Canada", "custom software development Canada"],
  },
  {
    slug: "web-development-singapore",
    locationName: "Singapore",
    region: "Singapore",
    title: "Web Development Company in Singapore | Rayon Web Solutions",
    description: "Rayon Web Solutions provides premium web development, SaaS product design, and AI automation for businesses in Singapore and Southeast Asia.",
    keywords: ["web development Singapore", "SaaS development Singapore", "ecommerce website Singapore", "software developers Singapore"],
  },
  {
    slug: "web-development-germany",
    locationName: "Germany",
    region: "Germany",
    title: "Web Development Services in Germany | Rayon Web Solutions",
    description: "Get robust, secure, and scalable web application development services in Germany from our experienced digital engineering team.",
    keywords: ["web development Germany", "custom software Germany", "ecommerce Berlin", "React Next.js development Germany"],
  },

  // Indian Cities / Regions
  {
    slug: "web-development-mohali",
    locationName: "Mohali",
    region: "Punjab, India",
    title: "Web Development Company in Mohali | Rayon Web Solutions",
    description: "Rayon Web Solutions is a premier web and software development company in Mohali offering web application, mobile app, and AI/ML development services.",
    keywords: ["web development company Mohali", "software development company Mohali", "IT services Mohali", "app development Mohali"],
  },
  {
    slug: "web-development-chandigarh",
    locationName: "Chandigarh",
    region: "Chandigarh, India",
    title: "Web & Software Development Company in Chandigarh | Rayon Web Solutions",
    description: "Looking for a web development company in Chandigarh? Rayon Web Solutions builds custom websites, CMS solutions, and AI platforms for startups and enterprise clients.",
    keywords: ["web development company Chandigarh", "software services Chandigarh", "web design Chandigarh", "custom website Chandigarh"],
  },
  {
    slug: "web-development-hanumangarh",
    locationName: "Hanumangarh",
    region: "Rajasthan, India",
    title: "Web Development Services in Hanumangarh | Rayon Web Solutions",
    description: "Rayon Web Solutions offers custom website design, e-commerce, and software development services in Hanumangarh to help local businesses grow online.",
    keywords: ["web development Hanumangarh", "website design Hanumangarh", "ecommerce services Hanumangarh", "custom software Hanumangarh"],
  },
  {
    slug: "web-development-sri-ganganagar",
    locationName: "Sri Ganganagar",
    region: "Rajasthan, India",
    title: "Web Development Services in Sri Ganganagar | Rayon Web Solutions",
    description: "Get custom website design, ecommerce storefronts, and digital transformation services in Sri Ganganagar from Rayon Web Solutions.",
    keywords: ["web development Sri Ganganagar", "website designer Sri Ganganagar", "ecommerce development Sri Ganganagar", "software company Sri Ganganagar"],
  },
  {
    slug: "web-development-panchkula",
    locationName: "Panchkula",
    region: "Haryana, India",
    title: "Web Development Company in Panchkula | Rayon Web Solutions",
    description: "Rayon Web Solutions provides premium web application, portal design, and software engineering services for businesses in Panchkula.",
    keywords: ["web development Panchkula", "software company Panchkula", "website builder Panchkula", "digital services Panchkula"],
  },
  {
    slug: "web-development-delhi",
    locationName: "Delhi NCR",
    region: "Delhi NCR, India",
    title: "Web Development Company in Delhi NCR | Rayon Web Solutions",
    description: "Get custom CMS development, ecommerce solutions, and high-performance React/Next.js development in Delhi NCR from Rayon Web Solutions.",
    keywords: ["web development Delhi", "Next.js developers Delhi NCR", "ecommerce Delhi", "software company Delhi NCR"],
  },
  {
    slug: "web-development-mumbai",
    locationName: "Mumbai",
    region: "Maharashtra, India",
    title: "Web Development Company in Mumbai | Rayon Web Solutions",
    description: "Rayon Web Solutions is a leading digital agency in Mumbai building custom web portals, corporate sites, and mobile applications.",
    keywords: ["web development Mumbai", "software services Mumbai", "app developers Mumbai", "custom website Mumbai"],
  },
  {
    slug: "web-development-bangalore",
    locationName: "Bangalore",
    region: "Karnataka, India",
    title: "Web Development Company in Bangalore | Rayon Web Solutions",
    description: "Rayon Web Solutions delivers cutting-edge web design, product engineering, and AI integration for startups and enterprises in Bangalore.",
    keywords: ["web development Bangalore", "product engineering Bangalore", "React Next.js developers Bangalore", "IT services Bangalore"],
  },

  // General / Worldwide
  {
    slug: "web-development-worldwide",
    locationName: "Worldwide",
    region: "Worldwide",
    title: "Global Web Development Company | Rayon Web Solutions",
    description: "Rayon Web Solutions provides worldwide web development, app development, and AI integration services for global brands, startups, and enterprises.",
    keywords: ["global web development company", "offshore web development", "worldwide software development", "remote engineering team"],
  },
]

export function getLocationBySlug(slug: string): LocationConfig | undefined {
  return locationsList.find((loc) => loc.slug === slug)
}
