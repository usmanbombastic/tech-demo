"use client"

import { Home, Archive, Bookmark, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const tags = [
  { name: "AI", count: 3 },
  { name: "Community", count: 2 },
  { name: "Compatibility", count: 1 },
  { name: "CSS", count: 5 },
  { name: "Design", count: 4 },
  { name: "Framework", count: 6 },
  { name: "Git", count: 2 },
  { name: "HTML", count: 3 },
  { name: "JavaScript", count: 8 },
  { name: "Layout", count: 2 },
  { name: "Learning", count: 4 },
  { name: "Performance", count: 1 },
  { name: "Practice", count: 3 },
  { name: "Tools", count: 2 },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeView: "home" | "archived"
  onViewChange: (view: "home" | "archived") => void
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

export function Sidebar({ 
  isOpen, 
  onClose, 
  activeView, 
  onViewChange,
  selectedTags,
  onTagToggle 
}: SidebarProps) {
  const navItems = [
    { name: "Home", icon: Home, view: "home" as const },
    { name: "Archived", icon: Archive, view: "archived" as const },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-60 bg-sidebar border-r border-sidebar-border flex flex-col h-screen transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden absolute top-4 right-4 p-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* App Branding */}
        <div className="flex items-center gap-3 px-5 py-6">
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
            <Bookmark className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground text-[15px]">
            Bookmark Manager
          </span>
        </div>

        {/* Navigation */}
        <nav className="px-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => {
                onViewChange(item.view)
                onClose()
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                activeView === item.view
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="w-[18px] h-[18px]" />
              {item.name}
            </button>
          ))}
        </nav>

        {/* Tags Section */}
        <div className="mt-8 px-5 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Tags
            </h3>
            {selectedTags.length > 0 && (
              <button
                onClick={() => selectedTags.forEach(tag => onTagToggle(tag))}
                className="text-[10px] text-primary hover:underline"
              >
                Clear all
              </button>
            )}
          </div>
          <div className="space-y-0.5">
            {tags.map((tag) => (
              <button
                key={tag.name}
                onClick={() => onTagToggle(tag.name)}
                className={cn(
                  "w-full flex items-center gap-3 px-2 py-2 rounded-lg transition-all duration-200 group",
                  selectedTags.includes(tag.name)
                    ? "bg-primary/10"
                    : "hover:bg-accent"
                )}
              >
                {/* Checkbox circle */}
                <div
                  className={cn(
                    "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200",
                    selectedTags.includes(tag.name)
                      ? "bg-primary border-primary scale-110"
                      : "border-border group-hover:border-muted-foreground"
                  )}
                >
                  {selectedTags.includes(tag.name) && (
                    <svg
                      className="w-2.5 h-2.5 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span className={cn(
                  "flex-1 text-left text-sm transition-colors",
                  selectedTags.includes(tag.name)
                    ? "text-primary font-medium"
                    : "text-foreground"
                )}>
                  {tag.name}
                </span>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full transition-colors",
                  selectedTags.includes(tag.name)
                    ? "bg-primary/20 text-primary"
                    : "bg-muted text-muted-foreground"
                )}>
                  {tag.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </aside>
    </>
  )
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
    >
      <Menu className="w-5 h-5 text-muted-foreground" />
    </button>
  )
}
