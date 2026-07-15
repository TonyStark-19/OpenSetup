// import icons
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";

// type
type SortOption = "newest" | "views" | "likes";

// browse guide header component
interface BrowseGuideHeaderProps {
    searchQuery: string,
    setSearchQuery: (searchQuery: string) => void,
    categories: string[],
    selectedCategory: string,
    setSelectedCategory: (selectedCategory: string) => void,
    typeFilters: string[],
    selectedTypes: string[],
    handleTypeToggle: (selectedTypes: string) => void,
    setIsSortOpen: (isSortOpen: boolean) => void,
    isSortOpen: boolean,
    sortBy: string,
    setSortBy: (sortBy: SortOption) => void
}

// BrowseGuideHeader Component
export default function BrowseGuideHeader({
    searchQuery, setSearchQuery, categories, selectedCategory, setSelectedCategory, typeFilters, selectedTypes, handleTypeToggle,
    setIsSortOpen, isSortOpen, sortBy, setSortBy
}: BrowseGuideHeaderProps) {
    return (
        <>
            {/* HEADER REGISTRY TITLE */}
            <div className="w-full text-left select-none mb-10 mt-5">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Browse Setups
                </h1>

                <p className="text-zinc-500 dark:text-[#888a8e] text-sm mt-1">
                    50+ community-curated guides for every stack
                </p>
            </div>

            {/* SEARCH INTERFACE COMPONENT FRAME */}
            <div className="w-full max-w-2xl relative mb-12">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-600" />

                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or tech..."
                    className="w-full bg-zinc-50 dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-900 
                    rounded-xl pl-11 pr-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 
                    dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-300 dark:focus:border-zinc-800 transition-colors shadow-inner"
                />
            </div>

            {/* FILTER SUB-SYSTEM ACTIONS BAR */}
            <div
                className="w-full border-b border-zinc-200 dark:border-zinc-900 pb-4 mb-8 flex flex-col 
                lg:flex-row lg:items-center justify-between gap-6 select-none relative z-30"
            >
                {/* Horizontal Categories Nav Rail */}
                <div className="flex items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-none py-1">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer 
                            ${selectedCategory === cat
                                    ? "bg-zinc-900 dark:bg-white text-white dark:text-black shadow-sm"
                                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-white bg-transparent"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Interactive Filter Sub-badges & Dropdown Container */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-xs">
                    {/* Type Matrix Filter Badges */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-zinc-400 dark:text-zinc-600 font-mono font-bold tracking-wide text-[10px] mr-1 uppercase">Type:</span>

                        {typeFilters.map((type) => {
                            const isActive = selectedTypes.includes(type);
                            return (
                                <button
                                    key={type}
                                    onClick={() => handleTypeToggle(type)}
                                    className={`px-2.5 py-1 rounded border font-mono text-[10px] font-bold tracking-wide transition-all cursor-pointer 
                                        ${isActive
                                            ? "bg-purple-50 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800 text-purple-600 dark:text-purple-400"
                                            : "bg-zinc-50 dark:bg-[#0c0c0e] border-zinc-200 dark:border-zinc-900 text-zinc-400 dark:text-zinc-500 hover:border-zinc-300 dark:hover:border-zinc-800"
                                        }`}
                                >
                                    {type}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sort Selector Popover System */}
                    <div className="relative">
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 font-medium hover:text-zinc-900 
                            dark:hover:text-white cursor-pointer py-1"
                        >
                            <SlidersHorizontal size={13} className="text-zinc-400 mr-0.5" />

                            Sort: <span className="font-semibold text-zinc-800 dark:text-zinc-200 capitalize">
                                {sortBy === "newest" ? "Newest" : `Most ${sortBy}`}
                            </span>

                            <ChevronDown size={12} className={`text-zinc-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isSortOpen && (
                            <div
                                className="absolute right-0 mt-2 w-36 bg-white dark:bg-[#121214] border border-zinc-200 
                                dark:border-zinc-900 rounded-xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200"
                            >
                                <div className="p-1 flex flex-col">
                                    {(["views", "likes", "newest"] as const).map((option) => (
                                        <button
                                            key={option}
                                            onClick={() => {
                                                setSortBy(option);
                                                setIsSortOpen(false);
                                            }}
                                            className={`px-3 py-2 text-left rounded-lg text-xs font-medium cursor-pointer transition-colors 
                                                ${sortBy === option
                                                    ? "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white"
                                                    : "text-zinc-500 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50 hover:text-zinc-800 dark:hover:text-zinc-200"
                                                }`}
                                        >
                                            {option === "newest" ? "Newest" : `Most ${option}`}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}