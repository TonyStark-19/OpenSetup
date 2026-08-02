// import icons
import { Clock, CheckCircle2, XCircle, Tag as TagIcon, User, Calendar } from "lucide-react";

// import type
import type { SetupRequest } from "../../pages/ManageRequestsPage";

// request grid props
interface RequestGridProps {
    requests: SetupRequest[];
    openStatusModal: (req: SetupRequest) => void;
}

// request grid component
export default function RequestGrid({ requests, openStatusModal }: RequestGridProps) {
    return (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((req) => (
                <div
                    key={req._id}
                    className="flex flex-col bg-zinc-50/50 dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-900 
                    rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-800 transition-all shadow-sm dark:shadow-none"
                >
                    {/* Card Header Toolbar */}
                    <div
                        className="flex items-center justify-between bg-zinc-100/60 dark:bg-[#141416] px-4 py-3 border-b 
                        border-zinc-200 dark:border-zinc-900"
                    >
                        <span className="text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                            {req.requestId}
                        </span>

                        <span
                            className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 
                                ${req.status === "Completed"
                                    ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                                    : req.status === "In progress"
                                        ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40"
                                        : req.status === "Rejected"
                                            ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                                            : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
                                }`}
                        >
                            {req.status === "Completed" ? <CheckCircle2 size={10} /> : req.status === "In progress" ? <CheckCircle2 size={10} /> : req.status === "Rejected" ? <XCircle size={10} /> : <Clock size={10} />}
                            {req.status}
                        </span>
                    </div>

                    {/* Card Body */}
                    <div className="flex flex-col p-5 grow">
                        <h3 className="text-zinc-900 dark:text-[#EDEEF0] font-semibold text-base mb-2">
                            {req.title}
                        </h3>

                        <p className="text-zinc-500 dark:text-[#888a8e] text-xs leading-relaxed mb-4">
                            {req.description || "No description provided."}
                        </p>

                        {/* Tags */}
                        {req.tags && req.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4 select-none">
                                {req.tags.map((tag, idx) => (
                                    <span
                                        key={idx}
                                        className="inline-flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 
                                        text-zinc-600 dark:text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded border 
                                        border-zinc-300/40 dark:border-zinc-700/40"
                                    >
                                        <TagIcon size={9} /> {tag}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Status Reason Note if exists */}
                        {req.statusReason && (
                            <div
                                className="mb-4 p-2.5 rounded-xl bg-zinc-100/70 dark:bg-[#121215] border border-zinc-200/80 
                                dark:border-zinc-800/80 text-[11px] text-zinc-600 dark:text-zinc-400 font-mono"
                            >
                                <span className="font-bold block text-[10px] text-zinc-400 uppercase mb-0.5">Note:</span>
                                {req.statusReason}
                            </div>
                        )}

                        {/* Requester Info */}
                        <div
                            className="mt-auto space-y-2 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 
                            font-mono text-[11px] text-zinc-400"
                        >
                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1"><User size={11} /> Created By:</span>
                                <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-45">{req.email}</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="flex items-center gap-1"><Calendar size={11} /> Date:</span>
                                <span className="text-zinc-700 dark:text-zinc-300">
                                    {new Date(req.createdAt).toISOString().split("T")[0]}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div
                        className="flex items-center justify-end bg-zinc-100/40 dark:bg-[#0a0a0c] px-4 py-3 border-t 
                        border-zinc-200 dark:border-zinc-900"
                    >
                        <button
                            onClick={() => openStatusModal(req)}
                            className="px-3.5 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] 
                            rounded-lg text-xs font-mono font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 
                            transition-all cursor-pointer active:scale-[0.98]"
                        >
                            Toggle Status
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}