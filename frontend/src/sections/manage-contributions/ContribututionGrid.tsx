// import icons
import { Edit3, CheckCircle2, Clock, XCircle, ExternalLink } from "lucide-react";

// import type
import type { ContributedGuide } from "../../pages/ManageContributionsPage";

// contribution grid props
interface ContributionGridProps {
    guides: ContributedGuide[]
    setEditingGuide: React.Dispatch<React.SetStateAction<ContributedGuide | null>>;
}

// contribution grid component
export default function ContributionGrid({ guides, setEditingGuide }: ContributionGridProps) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
                <div
                    key={guide._id}
                    className="flex flex-col bg-zinc-50/50 dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-900 
                    rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-800 transition-all shadow-sm dark:shadow-none"
                >
                    {/* Card Header Toolbar */}
                    <div
                        className="flex items-center justify-between bg-zinc-100/60 dark:bg-[#141416] px-4 py-3 border-b 
                        border-zinc-200 dark:border-zinc-900"
                    >
                        <div className="flex items-center gap-2">
                            <span
                                className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 
                                dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded 
                                border border-purple-100 dark:border-purple-900/40"
                            >
                                {guide.categoryOfGuide}
                            </span>

                            <span
                                className="text-[10px] font-mono font-bold uppercase text-zinc-500 dark:text-zinc-400 
                                bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-300/40 
                                dark:border-zinc-700/40"
                            >
                                {guide.typeOfGuide}
                            </span>
                        </div>

                        <span
                            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 
                                ${guide.status === "VERIFIED"
                                    ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                                    : guide.status === "REJECTED"
                                        ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                                        : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
                                }`}
                        >
                            {guide.status === "VERIFIED"
                                ? <CheckCircle2 size={10} />
                                : guide.status === "REJECTED"
                                    ? <XCircle size={10} />
                                    : <Clock size={10} />}
                            {guide.status}
                        </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col p-5 grow">
                        <h3 className="text-zinc-900 dark:text-[#EDEEF0] font-semibold text-base mb-1.5 line-clamp-1">
                            {guide.title}
                        </h3>

                        <p className="text-zinc-500 dark:text-[#888a8e] text-xs leading-relaxed mb-4 line-clamp-2">
                            {guide.description}
                        </p>

                        {/* Document Context Details */}
                        <div
                            className="mt-auto space-y-2 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 
                            font-mono text-[11px] text-zinc-400"
                        >
                            <div className="flex items-center justify-between">
                                <span>File Name:</span>
                                <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{guide.mdFileName}</span>
                            </div>

                            <div className="flex items-center justify-between truncate">
                                <span>Contributor:</span>
                                <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-45">{guide.contributedBy}</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div
                        className="flex items-center justify-between bg-zinc-100/40 dark:bg-[#0a0a0c] px-4 py-3 border-t 
                        border-zinc-200 dark:border-zinc-900 text-xs font-mono"
                    >
                        {/* Open Live Asset Link */}
                        {guide.mdFileUrl ? (
                            <a
                                href={guide.mdFileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 
                                dark:hover:text-white transition-colors cursor-pointer"
                                title="Open raw S3 file in new tab"
                            >
                                <ExternalLink size={13} />
                                <span>View Live File</span>
                            </a>
                        ) : (
                            <span className="text-zinc-400 text-[11px]">No URL</span>
                        )}

                        <button
                            onClick={() => setEditingGuide(guide)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white 
                            dark:text-[#0a0a0a] rounded-lg text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 
                            transition-all cursor-pointer"
                        >
                            <Edit3 size={12} /> Edit / Review
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}