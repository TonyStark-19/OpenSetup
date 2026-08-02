// import icons
import { RefreshCw, SlidersHorizontal } from "lucide-react";

// header control props
interface HeaderControlProps {
    fetchAllRequests: () => void
    isLoading: boolean;
}

// header control component
export default function HeaderControl({ fetchAllRequests, isLoading }: HeaderControlProps) {
    return (
        <div
            className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 
            dark:border-zinc-800/80 pb-6 mb-8"
        >
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <span
                        className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border 
                        border-blue-100 dark:border-blue-900/40"
                    >
                        <SlidersHorizontal size={15} />
                    </span>

                    <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#EDEEF0]">
                        Manage Setup Requests
                    </h1>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    Review user feature requests and update lifecycle status states
                </p>
            </div>

            <button
                onClick={fetchAllRequests}
                disabled={isLoading}
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100 dark:bg-[#121214] border border-zinc-200 
                dark:border-zinc-800 rounded-xl text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 
                dark:hover:border-zinc-700 transition-all cursor-pointer select-none active:scale-[0.98]"
            >
                <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                Sync Requests
            </button>
        </div>
    )
}