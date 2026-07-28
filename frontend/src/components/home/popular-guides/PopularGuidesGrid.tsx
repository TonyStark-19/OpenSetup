// import routing
import { Link } from "react-router-dom";

// import icons
import { IoEyeSharp, IoShieldCheckmarkSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { Clock } from "lucide-react";

// import type
import type { PopularGuidesGridProps } from "../../../sections/home/PopularGuides";

// popular guides grid
export default function PopularGuidesGrid({ GUIDES_DATA }: { GUIDES_DATA: PopularGuidesGridProps[] }) {
    // Value formatter fallback logic helper matching string or numeric indices
    const formatMetric = (num: number | string) => {
        const parsed = typeof num === "string" ? parseInt(num, 10) : num;
        if (isNaN(parsed)) return num;
        return parsed >= 1000 ? `${(parsed / 1000).toFixed(1)}k` : parsed.toString();
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {GUIDES_DATA.map((guide) => {
                const Icon = guide.icon;
                const isVerified = guide.status === "VERIFIED";

                // Slug defaults to mdFileName or guide.id
                const guideSlug = guide.mdFileName || guide.id;

                // Normalize payload structure for GuideDetailPage
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
                        className="flex flex-col bg-zinc-50/50 dark:bg-[#0e0e10] border border-zinc-200 dark:border-zinc-900 
                        overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-300 group shadow-sm dark:shadow-none rounded-xl"
                    >
                        {/* Card Header*/}
                        <div
                            className="flex flex-row justify-between items-center bg-zinc-100/60 dark:bg-[#141416] px-4 py-3.5 
                            border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
                        >
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <div className={`flex justify-center items-center p-1.5 rounded-lg border transition-colors ${guide.iconBg}`}>
                                    <Icon size={13} className={guide.iconColor} />
                                </div>

                                <h4 className="text-zinc-500 dark:text-[#888a8e] text-[10px] font-mono font-bold tracking-wider uppercase transition-colors">
                                    {guide.category}
                                </h4>
                            </div>

                            {/* Nested Matrix Tag Node Switcher */}
                            <span
                                className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0c0e] px-2 py-0.5 
                                rounded text-[9px] font-mono font-bold tracking-wide text-zinc-500 dark:text-zinc-400 shadow-sm dark:shadow-none transition-colors"
                            >
                                {guide.type}
                            </span>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-col p-5 grow min-h-34">
                            <h3
                                className="text-zinc-900 dark:text-[#EDEEF0] text-base font-semibold tracking-tight mb-2 
                                group-hover:text-black dark:group-hover:text-white transition-colors"
                            >
                                {guide.title}
                            </h3>

                            <p className="text-zinc-500 dark:text-[#888a8e] text-[12.5px] leading-relaxed transition-colors">
                                {guide.description}
                            </p>
                        </div>

                        {/* Card Footer */}
                        <div
                            className="flex flex-row justify-between items-center px-5 py-3.5 bg-zinc-100/20 dark:bg-[#0c0c0e] 
                            border-t border-zinc-200/60 dark:border-zinc-900/50 text-[11px] font-mono font-bold text-zinc-400 
                            dark:text-zinc-500 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3.5 select-none">
                                <span className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                                    <IoEyeSharp size={13} className="opacity-80" />
                                    {formatMetric(guide.views)}
                                </span>

                                <span className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors">
                                    <BiSolidLike size={12} className="opacity-80" />
                                    {formatMetric(guide.likes)}
                                </span>
                            </div>

                            {/* Dynamic Status Engine Pipeline Check */}
                            {isVerified ? (
                                <div
                                    className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-500/90 tracking-wide 
                                    bg-emerald-50 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-md border border-emerald-200 
                                    dark:border-emerald-900/30 text-[10px] shadow-sm dark:shadow-none transition-colors"
                                >
                                    <IoShieldCheckmarkSharp size={12} />
                                    VERIFIED
                                </div>
                            ) : (
                                <div
                                    className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-600 tracking-wide 
                                    bg-zinc-100 dark:bg-zinc-900/40 px-2.5 py-0.5 rounded-md border border-zinc-200 
                                    dark:border-zinc-800 text-[10px] transition-colors"
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
    );
}