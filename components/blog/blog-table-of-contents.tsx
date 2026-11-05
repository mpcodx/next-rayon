"use client"

import { useEffect, useState } from "react"
import { ListCollapse } from "lucide-react"

interface TocItem {
  id: string
  title: string
}

interface BlogTableOfContentsProps {
  items: TocItem[]
}

export default function BlogTableOfContents({ items }: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    if (items.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0.1,
      },
    )

    items.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [items])

  if (!items || items.length === 0) return null

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const target = document.getElementById(id)
    if (target) {
      const topOffset = 90
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
      setActiveId(id)
    }
  }

  return (
    <nav
      aria-label="Table of Contents"
      className="glass-card rounded-2xl border border-white/15 p-5 shadow-sm"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-white mb-3 pb-2 border-b border-white/10">
        <ListCollapse className="h-4 w-4 text-cyan-400" />
        <span>Table of Contents</span>
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((item) => {
          const isActive = activeId === item.id
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => handleClick(e, item.id)}
                className={`block py-1 px-2 rounded-md transition-colors leading-snug ${
                  isActive
                    ? "bg-cyan-500/15 text-cyan-300 font-medium border-l-2 border-cyan-400 pl-2.5"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/[0.04]"
                }`}
              >
                {item.title}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
