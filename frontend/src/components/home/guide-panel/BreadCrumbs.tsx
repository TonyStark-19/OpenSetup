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
        <div className="px-6 md:px-8 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs select-none">
            <div className="flex items-center gap-2 text-zinc-500 dark:text-[#888a8e] font-medium">
                <Folder size={14} className="text-zinc-400 dark:text-[#525256]" />
                <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">Setups</span>
                <ChevronRight size={12} className="text-zinc-300 dark:text-[#3a3a3e]" />
                <span className="hover:text-zinc-900 dark:hover:text-white cursor-pointer transition-colors">{MOCK_METADATA.category}</span>
                <ChevronRight size={12} className="text-zinc-300 dark:text-[#3a3a3e]" />
                <span className="text-zinc-800 dark:text-white font-semibold">{MOCK_METADATA.title}</span>
            </div>

            <div className="flex items-center gap-4 text-zinc-500 dark:text-[#888a8e] font-medium tracking-wide">
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