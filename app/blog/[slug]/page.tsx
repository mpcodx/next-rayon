import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, CalendarDays, Clock3, User } from "lucide-react"
import { blogPosts, getBlogPostBySlug } from "@/lib/blog-data"

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

  return {
    title: post.title,
    description: post.excerpt,
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = blogPosts
    .filter((candidate) => candidate.slug !== post.slug && candidate.category === post.category)
    .slice(0, 3)

  return (
    <main className="min-h-screen pb-20">
      <section className="pt-24 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-cyan-300 hover:text-cyan-200 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-cyan-400/35 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200 mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <span className="inline-flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {post.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {post.date}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-[280px] sm:h-[420px] rounded-3xl overflow-hidden border border-white/15 glass-card">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <article className="xl:col-span-8 glass-card rounded-2xl border border-white/15 p-6 sm:p-8">
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{post.excerpt}</p>

              <div className="space-y-10">
                {post.sections.map((section) => (
                  <section key={section.heading}>
                    <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph, index) => (
                        <p key={index} className="text-gray-300 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>

                    {section.bullets && (
                      <ul className="mt-4 list-disc pl-6 marker:text-cyan-300 space-y-2">
                        {section.bullets.map((bullet) => (
                          <li key={bullet} className="text-gray-300 leading-relaxed">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                ))}
              </div>
            </article>

            <aside className="xl:col-span-4 space-y-6">
              <div className="glass-card rounded-2xl border border-white/15 p-5">
                <h3 className="text-lg font-semibold mb-3">Tags</h3>
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

              <div className="glass-card rounded-2xl border border-white/15 p-5">
                <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
                {relatedPosts.length === 0 ? (
                  <p className="text-sm text-gray-400">No related articles yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <li key={relatedPost.slug}>
                        <Link href={`/blog/${relatedPost.slug}`} className="group block">
                          <p className="text-sm text-gray-200 group-hover:text-cyan-200 transition-colors">
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
