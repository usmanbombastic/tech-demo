"use client"

import { MoreVertical, Eye, Calendar } from "lucide-react"
import { useState } from "react"

export interface Bookmark {
  id: string
  title: string
  url: string
  domain: string
  description: string
  tags: string[]
  views: number
  dateAdded: string
  favicon: string
}

interface BookmarkCardProps {
  bookmark: Bookmark
  onDelete: (id: string) => void
  onArchive: (id: string) => void
  onEdit: (bookmark: Bookmark) => void
}

export function BookmarkCard({ bookmark, onDelete, onArchive, onEdit }: BookmarkCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleEdit = () => {
    setIsMenuOpen(false)
    onEdit(bookmark)
  }

  const handleArchive = () => {
    setIsMenuOpen(false)
    onArchive(bookmark.id)
  }

  const handleDelete = () => {
    setIsMenuOpen(false)
    onDelete(bookmark.id)
  }

  return (
    <article className="bg-card rounded-2xl border border-[#E7ECEA] shadow-[0_2px_6px_rgba(0,0,0,0.04)] p-5 hover:shadow-[0_6px_16px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#E7ECEA]">
        <a 
          href={bookmark.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 min-w-0 hover:opacity-80 transition-opacity"
        >
          {/* Favicon */}
          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 text-lg group-hover:scale-105 transition-transform duration-300">
            {bookmark.favicon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-card-foreground text-[15px] truncate group-hover:text-primary transition-colors">
              {bookmark.title}
            </h3>
            <p className="text-xs text-muted-foreground truncate">
              {bookmark.domain}
            </p>
          </div>
        </a>

        {/* Kebab Menu */}
        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-1.5 rounded-lg hover:bg-accent transition-all duration-200 opacity-0 group-hover:opacity-100"
          >
            <MoreVertical className="w-4 h-4 text-muted-foreground" />
          </button>
          
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute right-0 top-8 z-20 w-36 bg-card border border-border rounded-xl shadow-lg py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                <button 
                  onClick={handleEdit}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors rounded-lg mx-0.5 px-2.5"
                >
                  Edit
                </button>
                <button 
                  onClick={handleArchive}
                  className="w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors rounded-lg mx-0.5 px-2.5"
                >
                  Archive
                </button>
                <div className="h-px bg-border my-1" />
                <button 
                  onClick={handleDelete}
                  className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50 transition-colors rounded-lg mx-0.5 px-2.5"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-4 line-clamp-2">
        {bookmark.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {bookmark.tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 bg-secondary text-secondary-foreground text-xs rounded-full hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-[#E7ECEA]">
        <div className="flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5" />
          <span>{bookmark.views} views</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5" />
          <span>{bookmark.dateAdded}</span>
        </div>
      </div>
    </article>
  )
}
