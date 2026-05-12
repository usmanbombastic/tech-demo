"use client"

import { useState } from "react"
import { ArrowUpDown, Check } from "lucide-react"
import { BookmarkCard, type Bookmark } from "./bookmark-card"

type SortOption = "a-z" | "recently-added" | "most-viewed"

interface BookmarkGridProps {
  searchQuery: string
  bookmarks: Bookmark[]
  onDelete: (id: string) => void
  onArchive: (id: string) => void
  onEdit: (bookmark: Bookmark) => void
  selectedTags: string[]
  isArchiveView?: boolean
}

export function BookmarkGrid({ 
  searchQuery, 
  bookmarks, 
  onDelete, 
  onArchive, 
  onEdit,
  selectedTags,
  isArchiveView = false
}: BookmarkGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recently-added")
  const [isSortOpen, setIsSortOpen] = useState(false)

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "a-z", label: "A-Z" },
    { value: "recently-added", label: "Recently Added" },
    { value: "most-viewed", label: "Most Viewed" },
  ]

  // Filter bookmarks
  const filteredBookmarks = bookmarks.filter((bookmark) => {
    // Search filter
    const matchesSearch = 
      bookmark.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Tag filter
    const matchesTags = 
      selectedTags.length === 0 || 
      bookmark.tags.some((tag) => selectedTags.includes(tag))

    return matchesSearch && matchesTags
  })

  // Sort bookmarks
  const sortedBookmarks = [...filteredBookmarks].sort((a, b) => {
    switch (sortBy) {
      case "a-z":
        return a.title.localeCompare(b.title)
      case "most-viewed":
        return b.views - a.views
      case "recently-added":
      default:
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    }
  })

  return (
    <div className="px-6 lg:px-8 pt-6 pb-8">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl lg:text-[28px] font-bold text-foreground">
          {isArchiveView ? "Archived bookmarks" : "All bookmarks"}
          <span className="ml-2 text-lg font-normal text-muted-foreground">
            ({sortedBookmarks.length})
          </span>
        </h1>
        
        {/* Sort Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="flex items-center gap-2 px-3.5 py-2 bg-card border border-border rounded-xl text-sm hover:bg-accent active:scale-[0.98] transition-all"
          >
            <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
            <span className="text-[#000000]">Sort by</span>
          </button>

          {isSortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute right-0 top-12 z-20 w-44 bg-card border border-border rounded-xl shadow-lg py-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value)
                      setIsSortOpen(false)
                    }}
                    className="w-full px-3 py-2 text-sm text-left hover:bg-accent transition-colors flex items-center justify-between"
                  >
                    {option.label}
                    {sortBy === option.value && (
                      <Check className="w-4 h-4 text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active Tag Filters */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm text-muted-foreground">Filtering by:</span>
          {selectedTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Bookmarks Grid */}
      {sortedBookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {sortedBookmarks.map((bookmark) => (
            <BookmarkCard 
              key={bookmark.id} 
              bookmark={bookmark}
              onDelete={onDelete}
              onArchive={onArchive}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <span className="text-2xl">{isArchiveView ? "📦" : "🔍"}</span>
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">
            {isArchiveView ? "No archived bookmarks" : "No bookmarks found"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {isArchiveView 
              ? "Archived bookmarks will appear here"
              : selectedTags.length > 0 
                ? "Try selecting different tags or clear filters"
                : "Try searching with different keywords"
            }
          </p>
        </div>
      )}
    </div>
  )
}
