// import type
import type { RequestItem } from "../../../sections/requests/RequestsHero";

// scrolling requests props
interface ScrollingRequests {
    TICKER_ROW_1: RequestItem[],
    TICKER_ROW_2: RequestItem[],
    getStatusStyles: (status: RequestItem["status"]) => string;
}

// scrolling requests tickers
export default function ScrollingRequests({ TICKER_ROW_1, TICKER_ROW_2, getStatusStyles }: ScrollingRequests) {
    return (
        <div
            className="w-full relative flex flex-col gap-4 pb-8 pt-5 border-t border-b border-zinc-100 dark:border-zinc-950 
            bg-zinc-50/20 dark:bg-black/10 pointer-events-none select-none overflow-hidden mb-6"
        >
            {/* Visual Edge Blur Masking Vignettes */}
            <div
                className="absolute inset-y-0 left-0 w-1/12 md:w-1/6 bg-linear-to-r from-white via-white/20 to-transparent 
                dark:from-[#0a0a0a] dark:via-[#0a0a0a]/20 dark:to-transparent z-20"
            />

            <div
                className="absolute inset-y-0 right-0 w-1/12 md:w-1/6 bg-linear-to-l from-white via-white/20 to-transparent 
                dark:from-[#0a0a0a] dark:via-[#0a0a0a]/20 dark:to-transparent z-20"
            />

            {/* ROW 1: Auto Scrolling Left */}
            <div className="flex w-max overflow-hidden">
                <div className="flex gap-4 px-2 animate-scroll-left whitespace-nowrap">
                    {[...TICKER_ROW_1, ...TICKER_ROW_1, ...TICKER_ROW_1].map((req, idx) => (
                        <div
                            key={`r1-${idx}`}
                            className="flex flex-col justify-between bg-white dark:bg-[#0e0e10] border border-zinc-200 dark:border-zinc-900
                            rounded-xl p-4 min-w-65 shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-200">{req.title}</h3>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-1">
                                    {req.tags.map(t => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 
                                            dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${getStatusStyles(req.status)}`}>{req.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 2: Auto Scrolling Right (Opposite Direction) */}
            <div className="flex w-max overflow-hidden">
                <div className="flex gap-4 px-2 animate-scroll-right whitespace-nowrap">
                    {[...TICKER_ROW_2, ...TICKER_ROW_2, ...TICKER_ROW_2].map((req, idx) => (
                        <div
                            key={`r2-${idx}`}
                            className="flex flex-col justify-between bg-white dark:bg-[#0e0e10] border border-zinc-200 dark:border-zinc-900 
                            rounded-xl p-4 min-w-65 shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-200">{req.title}</h3>

                            <div className="flex items-center justify-between mt-4">
                                <div className="flex gap-1">
                                    {req.tags.map(t => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 
                                            dark:text-zinc-400 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${getStatusStyles(req.status)}`}>{req.status}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}