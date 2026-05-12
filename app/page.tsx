"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopNavbar } from "@/components/top-navbar"
import { BookmarkGrid } from "@/components/bookmark-grid"
import { AddBookmarkModal } from "@/components/add-bookmark-modal"
import { EditBookmarkModal } from "@/components/edit-bookmark-modal"
import type { Bookmark } from "@/components/bookmark-card"

const initialBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Frontend Mentor",
    url: "https://frontendmentor.io",
    domain: "frontendmentor.io",
    description: "Improve your front-end coding skills by building real projects. Solve real-world HTML, CSS and JavaScript challenges whilst working to professional designs.",
    tags: ["Practice", "CSS", "JavaScript"],
    views: 142,
    dateAdded: "Mar 15, 2024",
    favicon: "🎯",
  },
  {
    id: "2",
    title: "MDN Web Docs",
    url: "https://developer.mozilla.org",
    domain: "developer.mozilla.org",
    description: "The MDN Web Docs site provides information about Open Web technologies including HTML, CSS, and APIs for both Web sites and progressive web apps.",
    tags: ["Learning", "HTML", "CSS", "JavaScript"],
    views: 283,
    dateAdded: "Feb 28, 2024",
    favicon: "📚",
  },
  {
    id: "3",
    title: "React Docs",
    url: "https://react.dev",
    domain: "react.dev",
    description: "The library for web and native user interfaces. React lets you build user interfaces out of individual pieces called components.",
    tags: ["Framework", "JavaScript", "Learning"],
    views: 456,
    dateAdded: "Jan 12, 2024",
    favicon: "⚛️",
  },
  {
    id: "4",
    title: "Claude",
    url: "https://claude.ai",
    domain: "claude.ai",
    description: "Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest. It excels at analysis, coding, math, and creative tasks.",
    tags: ["AI", "Tools"],
    views: 512,
    dateAdded: "Apr 2, 2024",
    favicon: "🤖",
  },
  {
    id: "5",
    title: "Web.dev",
    url: "https://web.dev",
    domain: "web.dev",
    description: "Guidance to build modern web experiences that work on any browser. Learn about web performance, accessibility, and modern best practices.",
    tags: ["Performance", "Learning", "CSS"],
    views: 198,
    dateAdded: "Mar 8, 2024",
    favicon: "🌐",
  },
  {
    id: "6",
    title: "Tailwind CSS",
    url: "https://tailwindcss.com",
    domain: "tailwindcss.com",
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup without writing custom CSS.",
    tags: ["CSS", "Framework", "Design"],
    views: 367,
    dateAdded: "Feb 14, 2024",
    favicon: "💨",
  },
  {
    id: "7",
    title: "GitHub",
    url: "https://github.com",
    domain: "github.com",
    description: "GitHub is where over 100 million developers shape the future of software, together. Contribute to the open source community and manage Git repositories.",
    tags: ["Git", "Community", "Tools"],
    views: 892,
    dateAdded: "Jan 5, 2024",
    favicon: "🐙",
  },
  {
    id: "8",
    title: "CSS-Tricks",
    url: "https://css-tricks.com",
    domain: "css-tricks.com",
    description: "Daily articles about CSS, HTML, JavaScript, and all things related to web design and development. Tips, tricks, and techniques on using CSS.",
    tags: ["CSS", "Learning", "Community"],
    views: 245,
    dateAdded: "Mar 22, 2024",
    favicon: "✨",
  },
  {
    id: "9",
    title: "Stack Overflow",
    url: "https://stackoverflow.com",
    domain: "stackoverflow.com",
    description: "Stack Overflow is the largest, most trusted online community for developers to learn, share their programming knowledge, and build their careers.",
    tags: ["Community", "Learning"],
    views: 734,
    dateAdded: "Dec 18, 2023",
    favicon: "📋",
  },
]

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeView, setActiveView] = useState<"home" | "archived">("home")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingBookmark, setEditingBookmark] = useState<Bookmark | null>(null)
  
  // Bookmark state
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [archivedBookmarks, setArchivedBookmarks] = useState<Bookmark[]>([])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    )
  }

  const handleAddBookmark = (newBookmark: Bookmark) => {
    setBookmarks((prev) => [newBookmark, ...prev])
  }

  const handleDeleteBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id))
    setArchivedBookmarks((prev) => prev.filter((b) => b.id !== id))
  }

  const handleArchiveBookmark = (id: string) => {
    if (activeView === "home") {
      const bookmarkToArchive = bookmarks.find((b) => b.id === id)
      if (bookmarkToArchive) {
        setBookmarks((prev) => prev.filter((b) => b.id !== id))
        setArchivedBookmarks((prev) => [bookmarkToArchive, ...prev])
      }
    } else {
      // Unarchive
      const bookmarkToUnarchive = archivedBookmarks.find((b) => b.id === id)
      if (bookmarkToUnarchive) {
        setArchivedBookmarks((prev) => prev.filter((b) => b.id !== id))
        setBookmarks((prev) => [bookmarkToUnarchive, ...prev])
      }
    }
  }

  const handleEditBookmark = (bookmark: Bookmark) => {
    setEditingBookmark(bookmark)
    setIsEditModalOpen(true)
  }

  const handleSaveEditedBookmark = (updatedBookmark: Bookmark) => {
    setBookmarks((prev) =>
      prev.map((b) => (b.id === updatedBookmark.id ? updatedBookmark : b))
    )
    setArchivedBookmarks((prev) =>
      prev.map((b) => (b.id === updatedBookmark.id ? updatedBookmark : b))
    )
  }

  const currentBookmarks = activeView === "home" ? bookmarks : archivedBookmarks

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeView={activeView}
        onViewChange={setActiveView}
        selectedTags={selectedTags}
        onTagToggle={handleTagToggle}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onAddClick={() => setIsAddModalOpen(true)}
        />
        
        <div className="flex-1 overflow-y-auto">
          <BookmarkGrid 
            searchQuery={searchQuery}
            bookmarks={currentBookmarks}
            onDelete={handleDeleteBookmark}
            onArchive={handleArchiveBookmark}
            onEdit={handleEditBookmark}
            selectedTags={selectedTags}
            isArchiveView={activeView === "archived"}
          />
        </div>
      </main>

      {/* Modals */}
      <AddBookmarkModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddBookmark}
      />
      
      <EditBookmarkModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingBookmark(null)
        }}
        onSave={handleSaveEditedBookmark}
        bookmark={editingBookmark}
      />
    </div>
  )
}
