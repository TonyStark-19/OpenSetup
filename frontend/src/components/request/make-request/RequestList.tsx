// import hooks
import { useEffect, useState } from "react";

// import icons
import { Layers, GitPullRequest, Inbox } from "lucide-react";

// import components
import { getStatusStyles } from "../../../sections/requests/RequestsHero";

// import type
import type { RequestItem } from "../../../sections/requests/RequestsHero";

// Define the component properties interface
interface RequestListProps {
    myRequests: RequestItem[];
    setMyRequests: React.Dispatch<React.SetStateAction<RequestItem[]>>;
}

// base url
const BASE_URL = import.meta.env.VITE_BASE_URL;

// request list component
export default function RequestList({ myRequests, setMyRequests }: RequestListProps) {
    const [loading, setLoading] = useState(true);

    // Fetch active request data from database endpoint on mount
    useEffect(() => {
        const fetchMyRequests = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch(`${BASE_URL}/api/requests/my-requests`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    const mappedRequests = data.data.map((item: any) => ({
                        id: item.requestId,
                        title: item.title,
                        tags: item.tags,
                        status: item.status
                    }));
                    setMyRequests(mappedRequests);
                }
            } catch (err) {
                console.error("Failed parsing user request log history context:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchMyRequests();
    }, [setMyRequests]);

    return (
        <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {/* Component Subheader Frame */}
            <div className="flex flex-row justify-between items-center w-full border-b border-zinc-200 dark:border-zinc-900 pb-3">
                <div className="flex items-center gap-2.5">
                    <GitPullRequest size={16} className="text-zinc-400 dark:text-zinc-600" />
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">Your active request logs</h2>
                </div>
            </div>

            {/* Content Feed Layout Segment */}
            <div className="flex flex-col gap-3 w-full">
                {loading ? (
                    // Loading placeholder skeleton state
                    <div
                        className="flex flex-col items-center justify-center p-12 border border-dashed border-zinc-200 
                        dark:border-zinc-900 rounded-xl text-zinc-400 font-mono text-xs"
                    >
                        Reading system context logs...
                    </div>
                ) : myRequests.length === 0 ? (
                    // Clean visual placeholder when list is completely empty
                    <div
                        className="flex flex-col items-center justify-center text-center p-12 border border-dashed border-zinc-200 
                        dark:border-zinc-900 rounded-xl bg-zinc-50/20 dark:bg-[#08080a]/30 transition-all select-none"
                    >
                        <Inbox size={28} className="text-zinc-300 dark:text-zinc-800 mb-3" />
                        <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#EDEEF0] tracking-tight">No requests found</h3>

                        <p className="text-xs text-zinc-400 dark:text-[#888a8e] mt-1 max-w-xs leading-normal">
                            Your active tracking directory is clear. Submit the setup parameters structure form to build your first tracker item.
                        </p>
                    </div>
                ) : (
                    // Render current active user tracking list items
                    myRequests.map((req) => (
                        <div
                            key={req.id}
                            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between p-5 bg-zinc-50/50 
                            dark:bg-[#0c0c0e] border border-zinc-200 dark:border-zinc-900 rounded-xl shadow-sm dark:shadow-none gap-4 
                            group hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-200"
                        >
                            <div className="flex flex-col gap-2">
                                <h3 className="text-sm font-semibold text-zinc-900 dark:text-[#EDEEF0] tracking-tight">
                                    {req.title}
                                </h3>

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
                                    <span>#{req.id.split("_")[2] || req.id.slice(-5)}</span>
                                </div>

                                <span
                                    className={`text-xs font-mono font-bold px-3 py-1 rounded-lg border shadow-sm dark:shadow-none ${getStatusStyles(req.status)}`}
                                >
                                    {req.status}
                                </span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}