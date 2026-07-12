// import icons
import { Share2, ThumbsUp } from "lucide-react";

// import tpye
import type { GuideMetadata } from "../../../sections/home/GuidePanel";

// action panel props
interface ActionBarProps {
    MOCK_METADATA: GuideMetadata,
    handleUpvote: () => void,
    upvoted: boolean,
    upvoteCount: number
}

// action bar component
export default function ActionBar({ MOCK_METADATA, handleUpvote, upvoted, upvoteCount }: ActionBarProps) {
    return (
        <div
            className="bg-zinc-50/50 dark:bg-[#121215]/50 border-t border-zinc-200 dark:border-[#212124] px-6 py-4 flex 
            flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none transition-colors duration-300"
        >
            <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-[#888a8e]">
                <div
                    className="w-5 h-5 rounded-full bg-zinc-100 dark:bg-[#1c1c21] border border-zinc-200 dark:border-[#313135] 
                    overflow-hidden flex items-center justify-center shrink-0 transition-colors"
                >
                    {MOCK_METADATA.avatarUrl ? (
                        <img
                            src={MOCK_METADATA.avatarUrl}
                            alt={MOCK_METADATA.contributor}
                            className="w-full h-full object-cover antialiased"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    ) : (
                        <span className="text-[9px] uppercase font-bold text-zinc-700 dark:text-[#EDEEF0]">
                            {MOCK_METADATA.contributor.slice(0, 2)}
                        </span>
                    )}
                </div>

                <span>
                    Contributed by <span className="text-zinc-900 dark:text-white font-medium hover:underline cursor-pointer">@{MOCK_METADATA.contributor}</span>
                </span>

                <span className="text-zinc-300 dark:text-[#3a3a3e]">·</span>
                <span>Verified {MOCK_METADATA.verifiedDate}</span>
            </div>

            <div className="flex items-center gap-2.5 self-end sm:self-auto">
                <button
                    className="flex items-center gap-1.5 bg-white dark:bg-[#121214] hover:bg-zinc-50 dark:hover:bg-[#1c1c21] 
                    border border-zinc-200 dark:border-[#212124] hover:border-zinc-300 dark:hover:border-[#313135] 
                    rounded-lg px-3 py-1.5 text-xs font-semibold text-zinc-600 dark:text-[#b5b7ba] hover:text-zinc-900 
                    dark:hover:text-white transition-all cursor-pointer shadow-sm dark:shadow-none"
                >
                    <Share2 size={13} />
                    Share
                </button>

                <button
                    onClick={handleUpvote}
                    className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer 
                    shadow-sm dark:shadow-none 
                    ${upvoted
                            ? "bg-emerald-50 dark:bg-[#14261d] text-emerald-600 dark:text-[#4ade80] border-emerald-200 dark:border-[#1f3d2f]"
                            : "bg-white dark:bg-[#1c1c21] hover:bg-zinc-50 dark:hover:bg-[#25252b] text-zinc-800 dark:text-white border-zinc-200 dark:border-[#313135] hover:border-zinc-300 dark:hover:border-zinc-600"
                        }`}
                >
                    <ThumbsUp size={13} className={upvoted ? "fill-emerald-600 dark:fill-[#4ade80] text-emerald-600 dark:text-[#4ade80]" : ""} />

                    <span>Upvote · {upvoteCount}</span>
                </button>
            </div>
        </div>
    )
}