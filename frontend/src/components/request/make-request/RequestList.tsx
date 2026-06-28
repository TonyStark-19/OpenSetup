// import icons
import { Layers, GitPullRequest } from "lucide-react";

// import components
import { getStatusStyles } from "../../../sections/requests/RequestsHero";

// import type
import type { RequestItem } from "../../../sections/requests/RequestsHero";

// request list component
export default function RequestList({ myRequests }: { myRequests: RequestItem[] }) {
    return (
        <div className="lg:col-span-7 flex flex-col gap-4">
            <div className="flex flex-row justify-between items-center w-full border-b border-zinc-200 dark:border-zinc-900 pb-3">
                <div className="flex items-center gap-2.5">
                    <GitPullRequest size={16} className="text-zinc-400 dark:text-zinc-600" />
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Your active request logs</h2>
                </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
                {myRequests.map((req) => (
                    <div
                        key={req.id}
                        className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-5 bg-zinc-50/50 
                        dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-900 rounded-xl shadow-sm dark:shadow-none gap-4 
                        group hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-200"
                    >
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#EDEEF0] tracking-tight">{req.title}</h3>

                            <div className="flex flex-wrap gap-1.5">
                                {req.tags.map(t => (
                                    <span
                                        key={t}
                                        className="text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 
                                        dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 px-2.5 py-0.5 rounded-md shadow-sm dark:shadow-none"
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div
                            className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 border-zinc-200/60 
                            dark:border-zinc-900/60 pt-3 sm:pt-0"
                        >
                            <div className="flex items-center gap-1 text-zinc-400 font-mono text-xs select-none">
                                <Layers size={12} />
                                <span>#{req.id.slice(0, 5)}</span>
                            </div>

                            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border shadow-sm dark:shadow-none ${getStatusStyles(req.status)}`}>
                                {req.status}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}