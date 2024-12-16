import { create } from 'zustand'

export type AnalysisTab = 'subreddit' | 'post' | 'author'
export type ViewMode = 'all' | 'saved'

interface RedditAnalysisState {
  // Tab Control
  activeTab: AnalysisTab
  viewMode: ViewMode
  
  // Filter States
  searchQuery: string
  sortBy: string
  timeRange: string
  minScore: number
  categories: string[]
  
  // Selection States
  selectedSubreddit: string | null
  selectedPost: string | null
  selectedAuthor: string | null
  
  // Interaction States
  followedAuthors: string[]
  savedPosts: string[]
  bookmarkedSubreddits: string[]
  
  // Actions
  setActiveTab: (tab: AnalysisTab) => void
  setViewMode: (mode: ViewMode) => void
  setSearchQuery: (query: string) => void
  setSortBy: (sort: string) => void
  setTimeRange: (range: string) => void
  setMinScore: (score: number) => void
  setCategories: (categories: string[]) => void
  setSelectedSubreddit: (subreddit: string | null) => void
  setSelectedPost: (postId: string | null) => void
  setSelectedAuthor: (author: string | null) => void
  toggleFollowAuthor: (authorId: string) => void
  toggleSavePost: (postId: string) => void
  toggleBookmarkSubreddit: (subreddit: string) => void
  
  // Quick Actions
  showSavedItems: () => void
}

export const useRedditAnalysis = create<RedditAnalysisState>((set) => ({
  // Initial States
  activeTab: 'subreddit',
  viewMode: 'all',
  searchQuery: '',
  sortBy: 'hot',
  timeRange: 'week',
  minScore: 0,
  categories: [],
  selectedSubreddit: null,
  selectedPost: null,
  selectedAuthor: null,
  followedAuthors: [],
  savedPosts: [],
  bookmarkedSubreddits: [],

  // Actions
  setActiveTab: (tab) => set({ activeTab: tab }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setTimeRange: (range) => set({ timeRange: range }),
  setMinScore: (score) => set({ minScore: score }),
  setCategories: (categories) => set({ categories }),
  setSelectedSubreddit: (subreddit) => set({ selectedSubreddit: subreddit }),
  setSelectedPost: (postId) => set({ selectedPost: postId }),
  setSelectedAuthor: (author) => set({ selectedAuthor: author }),
  
  toggleFollowAuthor: (authorId) => 
    set((state) => ({
      followedAuthors: state.followedAuthors.includes(authorId)
        ? state.followedAuthors.filter(id => id !== authorId)
        : [...state.followedAuthors, authorId]
    })),
    
  toggleSavePost: (postId) =>
    set((state) => ({
      savedPosts: state.savedPosts.includes(postId)
        ? state.savedPosts.filter(id => id !== postId)
        : [...state.savedPosts, postId]
    })),
    
  toggleBookmarkSubreddit: (subreddit) =>
    set((state) => ({
      bookmarkedSubreddits: state.bookmarkedSubreddits.includes(subreddit)
        ? state.bookmarkedSubreddits.filter(s => s !== subreddit)
        : [...state.bookmarkedSubreddits, subreddit]
    })),
    
  // Quick Actions
  showSavedItems: () => 
    set((state) => ({
      viewMode: 'saved',
      // Automatically switch to the appropriate tab if we're showing saved items
      activeTab: state.activeTab
    })),
})) 