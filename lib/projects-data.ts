export type Project = {
  slug: string
  title: string
  category: string
  summary: string
  image: string
  liveUrl?: string
  overview: string[]
  challenges: string[]
  approach: string[]
  solution: string[]
  outcomes: string[]
  techStack: string[]
  services: { name: string; href: string }[]
}

export const projects: Project[] = [
  {
    slug: "allen-and-unwin",
    title: "Allen & Unwin",
    category: "Web Development",
    summary:
      "Publisher website for Allen & Unwin, supporting books, authors, educators, media, events, and submission resources.",
    image: "/projects/p1.png?height=600&width=800",
    overview: [
      "Allen & Unwin is a renowned British publishing company founded in 1911 when Sir Stanley Unwin acquired a controlling stake in George Allen & Co.",
      "Its legacy includes significant literary works, including early editions by J.R.R. Tolkien, and the name continues through Allen & Unwin New Zealand.",
    ],
    challenges: [
      "The web experience needed to serve readers, booksellers, educators, media teams, authors, and submission audiences.",
      "A large catalog and resource structure needed clear pathways without overwhelming visitors.",
      "The publisher needed a maintainable content model for books, events, author resources, and media information.",
    ],
    approach: [
      "Organized navigation around the main publishing audiences and their most common tasks.",
      "Structured book and author content so titles can be discovered, promoted, and maintained efficiently.",
      "Prioritized responsive layouts, readable content sections, and reliable publishing workflows.",
    ],
    solution: [
      "Built web pages for title discovery, publisher information, resources, events, and submission guidance.",
      "Created reusable components for catalog highlights, author content, promotional blocks, and resource links.",
      "Supported content updates through a structured, editor-friendly web foundation.",
    ],
    outcomes: [
      "A clearer digital presence for a publisher with deep literary heritage.",
      "Improved pathways for readers, trade partners, educators, media, and authors.",
      "A more maintainable platform for catalog updates and publishing programs.",
    ],
    techStack: ["Next.js", "TypeScript", "CMS Structure", "Book Catalog", "SEO"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "allen-and-unwin-aotearoa-nz",
    title: "Allen & Unwin Aotearoa NZ",
    category: "Web Development",
    summary:
      "Publisher website for Allen & Unwin Aotearoa NZ, highlighting fiction, non-fiction, children's books, prizes, and local voices.",
    image: "/projects/p2.png?height=600&width=800",
    overview: [
      "Allen & Unwin Aotearoa NZ is a leading New Zealand publisher known for diverse, high-quality fiction, non-fiction, and children's titles.",
      "Recognized as NZ Publisher of the Year, it supports local voices, innovative storytelling, and programs such as the Allen & Unwin Aotearoa NZ Fiction Prize.",
    ],
    challenges: [
      "The site needed to spotlight local titles while making author, prize, and catalog content easy to find.",
      "Book discovery needed to work across audiences including readers, booksellers, media, and writers.",
      "The publishing team needed flexible content sections for announcements, prize information, and new releases.",
    ],
    approach: [
      "Mapped the site around title discovery, publisher identity, submissions, and prize engagement.",
      "Designed modular content blocks for books, campaigns, author updates, and featured programs.",
      "Kept layouts accessible, responsive, and easy for editorial teams to maintain.",
    ],
    solution: [
      "Delivered a responsive publisher website with catalog sections, feature areas, and resource pathways.",
      "Created reusable templates for book listings, campaign pages, and editorial announcements.",
      "Supported ongoing publishing updates through structured content and consistent page patterns.",
    ],
    outcomes: [
      "A clearer platform for promoting New Zealand books and writers.",
      "Improved access to publishing resources, events, and prize information.",
      "A flexible web foundation for ongoing campaigns and catalog growth.",
    ],
    techStack: ["Next.js", "TypeScript", "CMS Structure", "Book Catalog", "SEO"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "murdoch-books",
    title: "Murdoch Books",
    category: "Web Development",
    summary:
      "Publisher website for Murdoch Books, an Australian publisher specializing in visually rich gardening, cookery, and lifestyle titles.",
    image: "/projects/p3.png?height=600&width=800",
    overview: [
      "Murdoch Books is an Australian publisher specializing in gardening and cookery titles, established in the early 1990s.",
      "Known for high-quality, visually appealing books, it supports new releases, bookseller and media resources, and author submissions.",
    ],
    challenges: [
      "The site needed to present lifestyle publishing content with strong visual impact and simple browsing.",
      "New releases, media resources, bookseller information, and submissions needed clear access points.",
      "Editorial and marketing teams needed reusable sections for seasonal titles and campaigns.",
    ],
    approach: [
      "Focused the information architecture around discoverability, visual browsing, and publishing resources.",
      "Designed flexible modules for books, categories, author highlights, and resource links.",
      "Prioritized responsive image handling and clean editorial layouts.",
    ],
    solution: [
      "Built web pages for catalog discovery, new releases, lifestyle categories, and publishing information.",
      "Created reusable components for book showcases, category sections, and submission resources.",
      "Structured content so editorial teams can keep title pages and promotional areas current.",
    ],
    outcomes: [
      "A stronger digital showcase for cookery, gardening, and lifestyle publishing.",
      "Clearer routes for booksellers, media, authors, and readers.",
      "A maintainable website structure for new releases and ongoing campaigns.",
    ],
    techStack: ["Next.js", "TypeScript", "Image Optimization", "CMS Structure", "SEO"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "australian-copyright-council",
    title: "Australian Copyright Council",
    category: "Web Development",
    summary:
      "Website for an independent, not-for-profit Community Legal Service dedicated to copyright law education and access.",
    image: "/projects/p4.png?height=600&width=800",
    overview: [
      "The Australian Copyright Council (ACC) is an independent, not-for-profit Community Legal Service dedicated to promoting understanding of copyright law and its application.",
      "It was established in 1968, the same year as the enactment of the Australian Copyright Act 1968 (Cth).",
    ],
    challenges: [
      "The website needed to present legal information clearly for creators, educators, organisations, and the broader public.",
      "Users needed simple pathways to resources, publications, training, and service information.",
      "The content structure needed to support trust, accessibility, and long-term maintainability.",
    ],
    approach: [
      "Organized content around user intent so visitors can quickly find relevant copyright guidance.",
      "Prioritized readable layouts, clear navigation, and accessible page structures.",
      "Created a flexible web foundation for publishing educational and legal information.",
    ],
    solution: [
      "Delivered responsive pages for legal resources, organisational information, and public education content.",
      "Structured navigation and content blocks to make complex copyright topics easier to browse.",
      "Built reusable sections for ongoing content updates and future resource expansion.",
    ],
    outcomes: [
      "A clearer public-facing web presence for copyright education and legal service information.",
      "Improved pathways to resources for creators, educators, businesses, and community users.",
      "A maintainable content structure for future updates and program growth.",
    ],
    techStack: ["Next.js", "TypeScript", "CMS Structure", "Accessible UI", "SEO"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "affirm-press",
    title: "Affirm Press",
    category: "Web Development",
    summary:
      "Publisher website for Affirm Press, a Melbourne-based publisher dedicated to great Australian stories, big ideas, and engaging authors.",
    image: "/projects/p5.png?height=600&width=800",
    overview: [
      "Affirm Press is a Melbourne-based publisher dedicated to publishing great Australian stories, big ideas, and engaging local and international authors.",
      "It publishes a broad range of non-fiction books and a select list of fiction, with a strong focus on nurturing Australian writers.",
    ],
    challenges: [
      "The website needed to showcase a broad publishing list while keeping author, book, and submission content easy to browse.",
      "Readers and industry partners needed clear pathways to new releases, catalog content, and publisher information.",
      "The team needed reusable content structures for campaigns, books, authors, and editorial updates.",
    ],
    approach: [
      "Structured the information architecture around books, authors, publishing identity, and reader discovery.",
      "Designed flexible sections for featured titles, announcements, submission content, and publisher resources.",
      "Balanced editorial personality with a maintainable web content model.",
    ],
    solution: [
      "Built responsive publisher pages for books, authors, campaigns, and organisational content.",
      "Created reusable components for title showcases, featured content, and resource navigation.",
      "Supported ongoing updates with structured content patterns and consistent templates.",
    ],
    outcomes: [
      "A clearer digital home for Affirm Press titles, authors, and publishing programs.",
      "Improved discovery for readers, writers, media, and trade audiences.",
      "A maintainable foundation for new releases, campaigns, and editorial updates.",
    ],
    techStack: ["Next.js", "TypeScript", "CMS Structure", "Book Catalog", "SEO"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "banking-quest",
    title: "Banking Quest",
    category: "Web Development",
    summary:
      "IIBF-accredited online banking education platform empowering more than 500,000 banking professionals across India.",
    image: "/projects/p6.png?height=600&width=800",
    overview: [
      "Banking Quest is an IIBF-accredited online banking education platform empowering over 500,000 banking professionals across India.",
      "The platform supports banking certifications, training programs, events, mock tests, tutorials, blogs, and enterprise learning needs.",
    ],
    challenges: [
      "Learners needed fast access to courses, batches, mock tests, tutorials, and certification information.",
      "The site needed to communicate credibility through IIBF-accredited training, partnerships, and job-support messaging.",
      "Program information needed to stay organized across public pages, learning resources, and enterprise offerings.",
    ],
    approach: [
      "Designed navigation around the main learner actions: explore courses, view batches, take mock tests, and read resources.",
      "Structured course and batch content for clarity across desktop and mobile screens.",
      "Prioritized conversion-focused calls to action while keeping educational content easy to scan.",
    ],
    solution: [
      "Built responsive web pages for courses, events, mock tests, tutorials, blogs, and enterprise information.",
      "Created clear hero, trust, batch listing, and program sections for banking professionals.",
      "Supported ongoing content updates through reusable page sections and organized resource flows.",
    ],
    outcomes: [
      "A stronger online learning presence for banking education and certification programs.",
      "Clearer learner journeys from course exploration to batch and resource discovery.",
      "A scalable structure for new courses, events, tutorials, and enterprise training content.",
    ],
    techStack: ["Next.js", "TypeScript", "Learning Platform", "Responsive UI", "SEO"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "dimo-book-publishing-software",
    title: "DiMO Book Publishing Software",
    category: "Web Development",
    summary:
      "Web-based book publishing software for managing publishing workflows, catalogs, production tasks, and operational reporting.",
    image: "/projects/p7.png?height=600&width=800",
    overview: [
      "DiMO Book Publishing Software needed a polished web platform to support publishing workflows, catalog management, and operational visibility.",
      "We focused on clear interfaces, reliable web architecture, and scalable foundations for publishing teams.",
    ],
    challenges: [
      "Publishing workflows needed to stay simple while supporting multiple production and catalog stages.",
      "Teams needed structured dashboards for titles, tasks, records, and status updates.",
      "The platform needed a maintainable frontend foundation that could evolve with publishing operations.",
    ],
    approach: [
      "Mapped publishing workflows and grouped functionality into focused interface modules.",
      "Defined reusable UI patterns for catalogs, dashboards, task lists, actions, and status states.",
      "Aligned the web architecture around maintainability, performance, and future publishing integrations.",
    ],
    solution: [
      "Built responsive publishing screens with role-aware navigation and clear production task flows.",
      "Created dashboard components for tracking books, activity, records, and operational updates.",
      "Structured the codebase so new publishing modules can be added without heavy rework.",
    ],
    outcomes: [
      "A cleaner publishing workflow experience for users and internal teams.",
      "Reusable web modules that support faster feature expansion.",
      "A stronger foundation for catalog management, reporting, workflow management, and future integrations.",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "Publishing Dashboard"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "playquiznow",
    title: "PlayQuizNow",
    category: "Web Development",
    summary:
      "Interactive quiz website with engaging quiz flows, content discovery, and shareable entertainment experiences.",
    image: "/projects/p8.png?height=600&width=800",
    overview: [
      "PlayQuizNow is a web-based quiz experience designed for engaging content, repeat participation, and easy discovery.",
      "The project focuses on fast quiz browsing, clear question flows, and shareable results for users.",
    ],
    challenges: [
      "Quiz content needed to feel quick, simple, and engaging across devices.",
      "Users needed clear paths from quiz discovery to completion and result sharing.",
      "The platform needed reusable structures for adding new quiz content without redesigning pages.",
    ],
    approach: [
      "Designed the experience around lightweight browsing, simple question progression, and clear result states.",
      "Created reusable quiz templates for categories, questions, answers, and result screens.",
      "Prioritized responsive layouts and fast page interactions.",
    ],
    solution: [
      "Built a responsive quiz website with discoverable quiz cards and guided quiz flows.",
      "Created reusable content structures for publishing and updating quiz experiences.",
      "Added result-focused page patterns that support engagement and sharing.",
    ],
    outcomes: [
      "A more engaging web experience for casual quiz users.",
      "Reusable quiz modules for faster content expansion.",
      "Clearer paths from discovery to completion and results.",
    ],
    techStack: ["Next.js", "TypeScript", "Quiz UI", "Content Workflow", "Responsive UI"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
      { name: "QA & Automation", href: "/services/qa-automation" },
    ],
  },
  {
    slug: "toolsy",
    title: "Toolsy",
    category: "Product Owner",
    summary:
      "Toolsy: free tools for SEO, AI workflows, creators, and everyday files.",
    image: "/projects/toolsy.png?height=600&width=800",
    liveUrl: "https://toolsy.rayonweb.com/",
    overview: [
      "Toolsy is a Rayon Web product offering free tools for SEO, AI workflows, creators, developers, social media, PDFs, media, and everyday file tasks.",
      "The platform is designed as a fast, searchable utility catalog where each tool solves one focused problem with clear UX and strong SEO intent.",
    ],
    challenges: [
      "The product needed to organize a broad tool catalog without making discovery feel noisy.",
      "Each tool page needed to communicate value quickly while supporting organic search entry points.",
      "The experience needed to stay lightweight across AI, SEO, developer, social, PDF, video, image, archive, utility, and text tools.",
    ],
    approach: [
      "Designed the product around quick search, category browsing, and focused tool landing pages.",
      "Grouped utilities by user intent so creators, marketers, developers, and everyday users can find the right tool quickly.",
      "Built reusable page patterns for scaling the catalog while keeping the interface consistent.",
    ],
    solution: [
      "Created a responsive tools platform with search, category navigation, and high-signal landing content.",
      "Built reusable components for tool pages, popular searches, category cards, and conversion-focused calls to action.",
      "Structured the product so new tools can be added without redesigning the catalog experience.",
    ],
    outcomes: [
      "A scalable owned product for SEO, AI, creator, developer, PDF, and media workflows.",
      "Clear discovery paths across more than 40 free utilities and 10+ tool categories.",
      "A product foundation that can grow the tool catalog while preserving a fast, focused user experience.",
    ],
    techStack: ["Next.js", "TypeScript", "AI Tools", "SEO Utilities", "PDF Tools"],
    services: [
      { name: "Web Development", href: "/services/web-development" },
      { name: "AI & Machine Learning", href: "/services/ai-ml" },
      { name: "UI/UX Design", href: "/services/ui-ux-design" },
    ],
  },
]

const featuredProjectSlugs = ["allen-and-unwin", "banking-quest", "playquiznow"]

export const featuredProjects = featuredProjectSlugs
  .map((slug) => projects.find((project) => project.slug === slug))
  .filter((project): project is Project => Boolean(project))

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug)
}
