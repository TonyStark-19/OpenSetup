// import routing
import { Link } from "react-router-dom";

// import icons
import { Eye, ThumbsUp, CheckCircle2, Clock } from "lucide-react";

// Updated type definition matching grid items
export interface GuideCardData {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    views: number;
    likes: number; // maps directly onto backend upvotes metric tracking keys
    status: string;
    icon: any;
    iconColor: string;
    iconBg: string;
    createdAt: string;
    mdFileName?: string;
    contributedBy?: string;
    profileImage?: string;
}

// guides grid prop
interface GuidesGridProps {
    filteredGuides: GuideCardData[];
    formatCount: (num: number) => string;
}

// guides grid
export default function GuidesGrid({ filteredGuides, formatCount }: GuidesGridProps) {
    return (
        <>
            {filteredGuides.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full relative z-10">
                    {filteredGuides.map((guide) => {
                        const IconComponent = guide.icon;
                        const isVerified = guide.status === "VERIFIED" || guide.status === "PENDING";

                        // Slug defaults to mdFileName
                        const guideSlug = guide.mdFileName;

                        // Normalize payload object structure expected by GuideDetailPage
                        const detailPayload = {
                            _id: guide.id,
                            id: guide.id,
                            title: guide.title,
                            description: guide.description,
                            categoryOfGuide: guide.category,
                            typeOfGuide: guide.type,
                            views: guide.views,
                            upvotes: guide.likes,
                            status: guide.status,
                            createdAt: guide.createdAt,
                            mdFileName: guide.mdFileName || `${guide.id}.md`,
                            contributedBy: guide.contributedBy || "adityachandel",
                            profileImage: guide.profileImage || "/other/Profile.png",
                        };

                        return (
                            <Link
                                key={guide.id}
                                to={`/guides/${guideSlug}`}
                                state={{ data: detailPayload }}
                                className="flex flex-col bg-zinc-50/50 dark:bg-[#0e0e10] border border-zinc-200 
                                dark:border-zinc-900 overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-800 
                                transition-all duration-300 group shadow-sm dark:shadow-none rounded-xl"
                            >
                                {/* Card Upper Toolbar Banner Block */}
                                <div
                                    className="flex flex-row justify-between items-center bg-zinc-100/60 dark:bg-[#141416] 
                                    px-4 py-3 border-b border-zinc-200 dark:border-zinc-900 transition-colors"
                                >
                                    <div className="flex flex-row justify-start items-center gap-2.5">
                                        <div className={`flex justify-center items-center p-1.5 rounded-lg border transition-colors ${guide.iconBg}`}>
                                            <IconComponent size={13} className={guide.iconColor} />
                                        </div>

                                        <span className="text-zinc-400 dark:text-zinc-600 font-mono text-[10px] font-bold tracking-wider uppercase">
                                            {guide.category}
                                        </span>
                                    </div>

                                    {/* Nested Matrix Tag Node */}
                                    <span
                                        className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] 
                                        px-2 py-0.5 rounded text-[9px] font-mono font-bold tracking-wide text-zinc-500 dark:text-zinc-400 
                                        shadow-sm dark:shadow-none"
                                    >
                                        {guide.type}
                                    </span>
                                </div>

                                {/* Card Body Core Copy */}
                                <div className="flex flex-col p-5 grow min-h-34">
                                    <h3
                                        className="text-zinc-900 dark:text-[#EDEEF0] text-base font-semibold tracking-tight mb-2 
                                        group-hover:text-black dark:group-hover:text-white transition-colors"
                                    >
                                        {guide.title}
                                    </h3>

                                    <p className="text-zinc-500 dark:text-[#888a8e] text-[12.5px] leading-relaxed">
                                        {guide.description}
                                    </p>
                                </div>

                                {/* Card Lower Metric Footer Action bar */}
                                <div
                                    className="flex flex-row justify-between items-center px-5 py-3.5 bg-zinc-100/20 
                                    dark:bg-[#0c0c0e] border-t border-zinc-200/60 dark:border-zinc-900/50 text-[11px] 
                                    font-mono font-bold text-zinc-400 dark:text-zinc-500 transition-colors"
                                >
                                    <div className="flex items-center gap-3.5 select-none">
                                        <span className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                                            <Eye size={13} className="opacity-80" />
                                            {formatCount(guide.views)}
                                        </span>

                                        <span className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                                            <ThumbsUp size={12} className="opacity-80" />
                                            {formatCount(guide.likes)}
                                        </span>
                                    </div>

                                    {/* Dynamic Status Badging */}
                                    {isVerified ? (
                                        <div
                                            className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 tracking-wide 
                                            bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-md border border-emerald-200 
                                            dark:border-emerald-900/30 text-[10px]"
                                        >
                                            <CheckCircle2 size={11} strokeWidth={2.5} />
                                            VERIFIED
                                        </div>
                                    ) : (
                                        <div
                                            className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-600 tracking-wide 
                                            bg-zinc-100 dark:bg-zinc-900/40 px-2.5 py-0.5 rounded-md border border-zinc-200 
                                            dark:border-zinc-800 text-[10px]"
                                        >
                                            <Clock size={11} strokeWidth={2.5} />
                                            PENDING
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                /* Empty State Workspace fallback */
                <div
                    className="w-full text-center py-20 bg-zinc-50/50 dark:bg-[#0c0c0e]/30 border border-dashed 
                    border-zinc-200 dark:border-zinc-900 rounded-2xl select-none"
                >
                    <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">No blueprints found matching those specific query configurations.</p>
                </div>
            )}
        </>
    );
}