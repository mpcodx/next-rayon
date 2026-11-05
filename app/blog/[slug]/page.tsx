import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock3, RefreshCw, Sparkles, User } from "lucide-react"
import { blogPosts, getBlogAuthor, getBlogPostBySlug } from "@/lib/blog-data"
import { DEFAULT_OG_IMAGE_URL, SITE_NAME, SITE_URL, absoluteUrl, buildPageMetadata, serializeJsonLd } from "@/lib/seo"

import BlogReadingProgress from "@/components/blog/blog-reading-progress"
import BlogKeyTakeaways from "@/components/blog/blog-key-takeaways"
import BlogTableOfContents from "@/components/blog/blog-table-of-contents"
import BlogCallout from "@/components/blog/blog-callout"
import BlogCodeSnippet from "@/components/blog/blog-code-snippet"
import BlogTable from "@/components/blog/blog-table"
import BlogFaqSection from "@/components/blog/blog-faq-section"
import BlogShareButtons from "@/components/blog/blog-share-buttons"
import BlogAuthorCard from "@/components/blog/blog-author-card"

interface BlogDetailPageProps {
  params: Promise<{
    slug: string
  }>
}

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) {
    return {
      title: "Blog Not Found",
    }
  }

  const postUrl = absoluteUrl(`/blog/${post.slug}`)

  return {
    ...buildPageMetadata({
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      path: `/blog/${post.slug}`,
      image: post.image,
      imageAlt: post.title,
    }),
    keywords: post.tags,
    authors: [{ name: post.author }],
    category: post.category,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
      url: postUrl,
      siteName: SITE_NAME,
      images: [
        {
          url: absoluteUrl(post.image),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [absoluteUrl(post.image)],
      creator: "@rayonweb",
    },
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()
  const author = getBlogAuthor(post.author)

  const relatedPosts = blogPosts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
    .slice(0, 3)

  const wordCount = [
    post.excerpt,
    ...(post.keyTakeaways ?? []),
    ...post.sections.flatMap((section) => [
      ...section.paragraphs,
      ...(section.bullets ?? []),
      section.callout?.text ?? "",
      ...(section.table?.rows.flat() ?? []),
    ]),
    ...(post.faqs?.flatMap((f) => [f.question, f.answer]) ?? []),
  ]
    .join(" ")
    .trim()
    .split(/\s+/).length

  const articleUrl = absoluteUrl(`/blog/${post.slug}`)

  // Table of contents items
  const tocItems = [
    ...post.sections.map((section, idx) => ({
      id: section.id || `section-${idx}`,
      title: section.heading,
    })),
    ...(post.faqs && post.faqs.length > 0
      ? [{ id: "faq-section", title: "Frequently Asked Questions" }]
      : []),
  ]

  // Schema.org BlogPosting
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${articleUrl}#article`,
    headline: post.title,
    description: post.excerpt,
    image: [absoluteUrl(post.image)],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
      jobTitle: author?.role,
      description: author?.bio,
      sameAs: author?.sameAs,
      knowsAbout: author?.knowsAbout,
      worksFor: {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: DEFAULT_OG_IMAGE_URL,
      },
    },
    mainEntityOfPage: articleUrl,
    articleSection: post.category,
    keywords: post.tags.join(", "),
    wordCount,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".article-headline", ".article-excerpt", ".key-takeaways"],
    },
    about: post.tags.map((tag) => ({
      "@type": "Thing",
      name: tag,
    })),
  }

  // Schema.org Breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: absoluteUrl("/blog"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: articleUrl,
      },
    ],
  }

  // Schema.org FAQPage if FAQs exist
  const faqSchema =
    post.faqs && post.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${articleUrl}#faq`,
          mainEntity: post.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        }
      : null

  return (
    <main className="min-h-screen pb-20">
      <BlogReadingProgress />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(blogPostingSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(breadcrumbSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd(faqSchema),
          }}
        />
      )}

      {/* Hero Header Section */}
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Articles
          </Link>

          <header className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
                {post.category}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-300">
                <Sparkles className="h-3 w-3 text-cyan-400" />
                Verified Engineering Article
              </span>
            </div>

            <h1 className="article-headline text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-white">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-200 font-medium">{post.author}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4 text-gray-400" />
                <span>Published {post.date}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <RefreshCw className="h-3.5 w-3.5 text-cyan-400" />
                <span>Updated {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4 text-gray-400" />
                <span>{post.readTime}</span>
              </span>
            </div>
          </header>
        </div>
      </section>

      {/* Featured Cover Image */}
      <section className="pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[280px] sm:h-[440px] rounded-3xl overflow-hidden border border-white/15 glass-card shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            {/* Article Body */}
            <article className="xl:col-span-8 glass-card rounded-2xl border border-white/15 p-6 sm:p-9 shadow-xl">
              {/* Executive Excerpt */}
              <p className="article-excerpt text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed font-normal border-l-2 border-cyan-400 pl-4 py-1">
                {post.excerpt}
              </p>

              {/* Key Takeaways / TL;DR */}
              {post.keyTakeaways && post.keyTakeaways.length > 0 && (
                <BlogKeyTakeaways takeaways={post.keyTakeaways} />
              )}

              {/* Article Sections */}
              <div className="space-y-12">
                {post.sections.map((section, idx) => {
                  const sectionId = section.id || `section-${idx}`
                  return (
                    <section
                      key={section.heading}
                      id={sectionId}
                      aria-labelledby={`heading-${sectionId}`}
                      className="scroll-mt-24"
                    >
                      <h2
                        id={`heading-${sectionId}`}
                        className="text-2xl sm:text-3xl font-bold text-white mb-5 tracking-tight"
                      >
                        {section.heading}
                      </h2>

                      <div className="space-y-4">
                        {section.paragraphs.map((paragraph, pIdx) => (
                          <p key={pIdx} className="text-gray-300 leading-relaxed text-base sm:text-lg">
                            {paragraph}
                          </p>
                        ))}
                      </div>

                      {section.bullets && section.bullets.length > 0 && (
                        <ul className="mt-5 list-disc pl-6 marker:text-cyan-400 space-y-2.5">
                          {section.bullets.map((bullet, bIdx) => (
                            <li key={bIdx} className="text-gray-300 leading-relaxed text-base">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}

                      {section.table && (
                        <BlogTable headers={section.table.headers} rows={section.table.rows} />
                      )}

                      {section.codeSnippet && (
                        <BlogCodeSnippet
                          language={section.codeSnippet.language}
                          filename={section.codeSnippet.filename}
                          code={section.codeSnippet.code}
                        />
                      )}

                      {section.callout && (
                        <BlogCallout
                          type={section.callout.type}
                          title={section.callout.title}
                          text={section.callout.text}
                        />
                      )}
                    </section>
                  )
                })}
              </div>

              {/* Share Buttons */}
              <div className="mt-10">
                <BlogShareButtons url={articleUrl} title={post.title} />
              </div>

              {/* FAQ Section */}
              {post.faqs && post.faqs.length > 0 && (
                <BlogFaqSection faqs={post.faqs} />
              )}
            </article>

            {/* Sticky Sidebar */}
            <aside className="xl:col-span-4 space-y-6 xl:sticky xl:top-24">
              {/* Table of Contents */}
              {tocItems.length > 0 && (
                <BlogTableOfContents items={tocItems} />
              )}

              {/* Author Card with E-E-A-T badges */}
              {author && <BlogAuthorCard author={author} />}

              {/* Related Services */}
              {post.relatedServices && post.relatedServices.length > 0 && (
                <div className="glass-card rounded-2xl border border-white/15 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                    Related Capabilities
                  </h3>
                  <ul className="space-y-2">
                    {post.relatedServices.map((service, idx) => (
                      <li key={idx}>
                        <Link
                          href={service.href}
                          className="block text-sm text-cyan-300 hover:text-cyan-200 py-1 transition-colors hover:underline"
                        >
                          → {service.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
              <div className="glass-card rounded-2xl border border-white/15 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
                  Topics & Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related Articles */}
              <div className="glass-card rounded-2xl border border-white/15 p-5 shadow-sm">
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                  Related Engineering Articles
                </h3>
                {relatedPosts.length === 0 ? (
                  <p className="text-sm text-gray-400">Explore more in our blog directory.</p>
                ) : (
                  <ul className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <li key={relatedPost.slug} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                        <Link href={`/blog/${relatedPost.slug}`} className="group block">
                          <p className="text-sm font-medium text-gray-200 group-hover:text-cyan-300 transition-colors leading-snug">
                            {relatedPost.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {relatedPost.date} • {relatedPost.readTime}
                          </p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
