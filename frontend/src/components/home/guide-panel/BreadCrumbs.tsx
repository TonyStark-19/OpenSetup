// import icons
import { ThumbsUp, Eye, Folder, ChevronRight } from "lucide-react";

// import tpye
import type { GuideMetadata } from "../../../sections/home/GuidePanel";

// bread crumbs props
interface BreadCrumbsProps {
    MOCK_METADATA: GuideMetadata,
    upvoteCount: number
}

// bread crumbs component
export default function BreadCrumbs({ MOCK_METADATA, upvoteCount }: BreadCrumbsProps) {
    return (
        <div className="px-4 sm:px-6 md:px-8 pt-5 sm:pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs select-none">
            {/* Breadcrumb Navigation Path */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-zinc-500 dark:text-[#888a8e] font-medium overflow-x-auto max-w-full scrollbar-none pb-1 sm:pb-0">
                <Folder size={14} className="text-zinc-400 dark:text-[#525256] shrink-0" />
                <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors shrink-0">Setups</span>

                <ChevronRight size={12} className="text-zinc-300 dark:text-[#3a3a3e] shrink-0" />
                <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors shrink-0">{MOCK_METADATA.category}</span>

                <ChevronRight size={12} className="text-zinc-300 dark:text-[#3a3a3e] shrink-0" />
                <span className="text-zinc-800 dark:text-white font-semibold truncate max-w-37.5 sm:max-w-xs">{MOCK_METADATA.title}</span>
            </div>

            {/* Telemetry Stats & Status Bar */}
            <div
                className="flex items-center gap-3 sm:gap-4 text-zinc-500 dark:text-[#888a8e] font-medium tracking-wide w-full 
                sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-200/60 dark:border-zinc-800/60"
            >
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-[#4ade80] animate-pulse" />
                    <span className="text-emerald-600 dark:text-[#4ade80] font-semibold">{MOCK_METADATA.status}</span>
                </div>

                <div className="flex items-center gap-1">
                    <Eye size={13} className="text-zinc-400 dark:text-[#525256]" />
                    <span>{MOCK_METADATA.views}</span>
                </div>

                <div className="flex items-center gap-1">
                    <ThumbsUp size={12} className="text-zinc-400 dark:text-[#525256]" />
                    <span>{upvoteCount}</span>
                </div>
            </div>
        </div>
    )
}