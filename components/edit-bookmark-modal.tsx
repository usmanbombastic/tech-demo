"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import type { Bookmark } from "./bookmark-card"

interface EditBookmarkModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (bookmark: Bookmark) => void
  bookmark: Bookmark | null
}

const tagOptions = [
  "AI", "Community", "Compatibility", "CSS", "Design", 
  "Framework", "Git", "HTML", "JavaScript", "Layout", 
  "Learning", "Performance", "Practice", "Tools"
]

const faviconOptions = ["🔗", "📚", "⚛️", "🤖", "🌐", "💨", "🐙", "✨", "📋", "🎯", "💡", "🚀"]

export function EditBookmarkModal({ isOpen, onClose, onSave, bookmark }: EditBookmarkModalProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedFavicon, setSelectedFavicon] = useState("🔗")

  useEffect(() => {
    if (bookmark) {
      setTitle(bookmark.title)
      setUrl(bookmark.url)
      setDescription(bookmark.description)
      setSelectedTags(bookmark.tags)
      setSelectedFavicon(bookmark.favicon)
    }
  }, [bookmark])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !url.trim() || !bookmark) return

    const domain = url.replace(/^https?:\/\//, "").split("/")[0]
    
    const updatedBookmark: Bookmark = {
      ...bookmark,
      title: title.trim(),
      url: url.trim(),
      domain,
      description: description.trim() || "No description provided.",
      tags: selectedTags.length > 0 ? selectedTags : ["Uncategorized"],
      favicon: selectedFavicon,
    }

    onSave(updatedBookmark)
    onClose()
  }

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  if (!isOpen || !bookmark) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div 
          className="bg-card rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Edit Bookmark</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Favicon Selection */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Icon
              </label>
              <div className="flex flex-wrap gap-2">
                {faviconOptions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedFavicon(emoji)}
                    className={`w-10 h-10 rounded-lg text-lg flex items-center justify-center transition-all ${
                      selectedFavicon === emoji
                        ? "bg-primary/10 ring-2 ring-primary"
                        : "bg-muted hover:bg-accent"
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Title <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter bookmark title"
                className="w-full h-11 px-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/30 transition-all"
                required
              />
            </div>

            {/* URL */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                URL <span className="text-destructive">*</span>
              </label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
                className="w-full h-11 px-4 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/30 transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a brief description..."
                rows={3}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/30 transition-all resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tags
              </label>
              <div className="flex flex-wrap gap-2">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-secondary-foreground hover:bg-accent"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 h-11 px-4 bg-secondary text-secondary-foreground rounded-xl text-sm font-medium hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-11 px-4 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
