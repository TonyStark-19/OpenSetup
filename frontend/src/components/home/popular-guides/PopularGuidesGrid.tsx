// import icons
import { IoEyeSharp, IoShieldCheckmarkSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";

// import type
import type { IconType } from "react-icons";

// Popular Guides Grid Props
interface PopularGuidesGridProps {
    id: number;
    category: string;
    title: string;
    description: string;
    icon: IconType;
    iconColor: string;
    iconBg: string;
    views: string;
    likes: string;
}

// popular guides grid
export default function PopularGuidesGrid({ GUIDES_DATA }: { GUIDES_DATA: PopularGuidesGridProps[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {GUIDES_DATA.map((guide) => {
                const Icon = guide.icon;
                return (
                    <div
                        key={guide.id}
                        className="flex flex-col overflow-hidden border border-zinc-200 dark:border-zinc-900 bg-zinc-50/50 dark:bg-[#0e0e10] 
                        hover:border-zinc-300 dark:hover:border-zinc-800 shadow-sm dark:shadow-none transition-all duration-300 group"
                    >
                        {/* Card Header */}
                        <div
                            className="flex flex-row justify-between items-center bg-zinc-100/60 dark:bg-[#141416] px-4 py-3.5 
                            border-b border-zinc-200 dark:border-zinc-900 transition-colors duration-300"
                        >
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <div className={`flex justify-center items-center p-1.5 rounded-lg transition-colors ${guide.iconBg}`}>
                                    <Icon size={14} className={guide.iconColor} />
                                </div>

                                <h4 className="text-zinc-500 dark:text-[#888a8e] text-xs font-mono tracking-wide uppercase transition-colors">{guide.category}</h4>
                            </div>

                            <div className="w-2 h-2 bg-emerald-400 dark:bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-col p-5 grow min-h-35">
                            <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-lg font-semibold tracking-tight mb-2 transition-colors">
                                {guide.title}
                            </h3>

                            <p className="text-zinc-500 dark:text-[#888a8e] text-sm leading-relaxed transition-colors">
                                {guide.description}
                            </p>
                        </div>

                        {/* Card Footer */}
                        <div
                            className="flex flex-row justify-between items-center px-5 py-3 bg-zinc-100/30 dark:bg-[#0c0c0e] border-t border-zinc-200/60 
                            dark:border-zinc-900/50 text-xs font-medium text-zinc-400 dark:text-[#525256] transition-colors duration-300"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-400 cursor-default transition-colors">
                                    <IoEyeSharp size={14} className="text-zinc-400" />
                                    {guide.views}
                                </span>

                                <span className="flex items-center gap-1 hover:text-zinc-700 dark:hover:text-zinc-400 cursor-default transition-colors">
                                    <BiSolidLike size={13} className="text-zinc-400" />
                                    {guide.likes}
                                </span>
                            </div>

                            <div
                                className="flex items-center gap-1 text-emerald-600 dark:text-emerald-500/90 bg-emerald-50 dark:bg-emerald-950/20 
                                px-2.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/30 text-[11px] font-semibold tracking-wide 
                                shadow-sm dark:shadow-none transition-colors"
                            >
                                <IoShieldCheckmarkSharp size={12} />
                                Verified
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}