// import icons
import { IoEyeSharp, IoShieldCheckmarkSharp } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";

// import type
import type { IconType } from "react-icons";

// Popular Guides Grid Props
interface PopularGuidesGridProps {
    id: number,
    category: string,
    title: string,
    description: string,
    icon: IconType,
    iconColor: string,
    iconBg: string,
    views: string,
    likes: string,
}

// popular guides grid
export default function PopularGuidesGrid({ GUIDES_DATA }: { GUIDES_DATA: PopularGuidesGridProps[] }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            {GUIDES_DATA.map((guide) => {
                const Icon = guide.icon;
                return (
                    <div
                        key={guide.id}
                        className="flex flex-col overflow-hidden border border-zinc-900 bg-[#0e0e10] hover:border-zinc-800
                        transition-all duration-200"
                    >
                        {/* Card Header */}
                        <div className="flex flex-row justify-between items-center bg-[#141416] px-4 py-3.5 border-b border-zinc-900">
                            <div className="flex flex-row justify-start items-center gap-2.5">
                                <div className={`flex justify-center items-center p-1.5 rounded-md ${guide.iconBg}`}>
                                    <Icon size={14} className={guide.iconColor} />
                                </div>

                                <h4 className="text-[#888a8e] text-xs font-mono tracking-wide uppercase">{guide.category}</h4>
                            </div>

                            <div className="w-2 h-2 bg-[#4ade80] rounded-full shadow-[0_0_8px_rgba(74,222,128,0.5)]"></div>
                        </div>

                        {/* Card Content */}
                        <div className="flex flex-col p-5 grow min-h-35">
                            <h3 className="text-[#EDEEF0] text-lg font-medium tracking-tight mb-2">
                                {guide.title}
                            </h3>

                            <p className="text-[#888a8e] text-sm leading-relaxed">
                                {guide.description}
                            </p>
                        </div>

                        {/* Card Footer */}
                        <div
                            className="flex flex-row justify-between items-center px-5 py-3 bg-[#0c0c0e] border-t border-zinc-900/50 
                            text-xs font-medium text-[#525256]"
                        >
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1 hover:text-zinc-400 cursor-default transition-colors">
                                    <IoEyeSharp size={14} />
                                    {guide.views}
                                </span>

                                <span className="flex items-center gap-1 hover:text-zinc-400 cursor-default transition-colors">
                                    <BiSolidLike size={13} />
                                    {guide.likes}
                                </span>
                            </div>

                            <div
                                className="flex items-center gap-1 text-emerald-500/90 bg-emerald-950/20 px-2 py-0.5 rounded border 
                                border-emerald-900/30 text-[11px]"
                            >
                                <IoShieldCheckmarkSharp size={12} />
                                Verified
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}