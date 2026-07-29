// import icons
import { Eye, ThumbsUp, Calendar, FileCode } from "lucide-react";

// import type
import type { GuideMetadataProps } from "../../pages/GuideDetailPage";

// guide header props
interface GuideHeaderProps {
    guideData: GuideMetadataProps;
    views: number;
    handleUpvote: () => void;
    hasUpvoted: boolean;
    upvotes: number;
}

// Utility formatter for large numbers
const formatCount = (num: number) => {
    return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
};

// guide header component
export default function GuideHeader({ guideData, views, handleUpvote, hasUpvoted, upvotes }: GuideHeaderProps) {
    return (
        <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-8 mb-8">
            {/* Category & Type Badges */}
            <div className="flex flex-wrap items-center gap-2.5 mb-4 select-none">
                <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase bg-purple-50 
                    dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 
                    dark:border-purple-900/40 px-2.5 py-1 rounded-md"
                >
                    {guideData.categoryOfGuide || "General"}
                </span>

                <span
                    className="text-[10px] font-mono font-bold tracking-widest uppercase bg-zinc-100 dark:bg-zinc-900 
                    text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1
                    rounded-md flex items-center gap-1"
                >
                    <FileCode size={10} /> {guideData.typeOfGuide || "GUIDE"}
                </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-[#EDEEF0]">
                {guideData.title}
            </h1>

            {/* Description */}
            <p className="text-base text-zinc-500 dark:text-[#888a8e] mb-6 leading-relaxed max-w-3xl">
                {guideData.description}
            </p>

            {/* Author & Metrics Toolbar Panel */}
            <div
                className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dashed 
                border-zinc-200 dark:border-zinc-800/60 text-xs font-mono text-zinc-500 dark:text-zinc-400"
            >
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <img
                            src={guideData.profileImage || "/other/Profile.png"}
                            alt="Contributor avatar"
                            className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                        />

                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                            {guideData.contributedBy || "Anonymous"}
                        </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Calendar size={13} />
                        <span>{guideData.createdAt || "Recently"}</span>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5">
                        <Eye size={13} /> <span>{formatCount(views)} views</span>
                    </div>

                    <button
                        onClick={handleUpvote}
                        disabled={hasUpvoted}
                        className={`flex items-center gap-1.5 transition-all cursor-pointer px-3 py-1.5 rounded-lg border active:scale-[0.98] 
                            ${hasUpvoted
                                ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40 cursor-not-allowed opacity-90'
                                : 'bg-white dark:bg-[#121214] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                            }`}
                    >
                        <ThumbsUp size={13} className={hasUpvoted ? 'fill-current' : ''} />
                        <span className="font-medium">{formatCount(upvotes)} upvotes</span>
                    </button>
                </div>
            </div>
        </div>
    );
}