"use client"

import { Search, Plus } from "lucide-react"
import { MobileMenuButton } from "./sidebar"

interface TopNavbarProps {
  onMenuClick: () => void
  searchQuery: string
  onSearchChange: (value: string) => void
  onAddClick: () => void
}

export function TopNavbar({ onMenuClick, searchQuery, onSearchChange, onAddClick }: TopNavbarProps) {
  return (
    <header className="flex items-center justify-between gap-4 px-6 lg:px-8 py-4 bg-white border-b border-[#DDE5E2]">
      <div className="flex items-center gap-3">
        <MobileMenuButton onClick={onMenuClick} />
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-[220px] sm:w-[340px] lg:w-[380px] h-11 pl-10 pr-4 bg-card border border-border rounded-xl text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary/30 shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Add Bookmark Button */}
        <button 
          onClick={onAddClick}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Bookmark
        </button>
        
        {/* Mobile Add Button */}
        <button 
          onClick={onAddClick}
          className="sm:hidden p-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 active:scale-[0.98] transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/40 border border-border shadow-sm flex items-center justify-center cursor-pointer hover:shadow-md transition-shadow">
          <span className="text-sm font-medium text-primary">JD</span>
        </div>
      </div>
    </header>
  )
}
