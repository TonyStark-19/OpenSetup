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
            className="w-full relative flex flex-col gap-3 sm:gap-4 pb-2 sm:pb-4 pt-3 sm:pt-5 
            bg-zinc-50/20 dark:bg-black/10 pointer-events-none select-none overflow-hidden mb-4 sm:mb-6 max-w-full"
        >
            {/* Visual Edge Blur Masking Vignettes */}
            <div
                className="absolute inset-y-0 left-0 w-1/6 sm:w-1/6 bg-linear-to-r from-white via-white/20 to-transparent 
                dark:from-[#0a0a0a] dark:via-[#0a0a0a]/20 dark:to-transparent z-20 pointer-events-none"
            />

            <div
                className="absolute inset-y-0 right-0 w-1/6 sm:w-1/6 bg-linear-to-l from-white via-white/20 to-transparent 
                dark:from-[#0a0a0a] dark:via-[#0a0a0a]/20 dark:to-transparent z-20 pointer-events-none"
            />

            {/* ROW 1: Auto Scrolling Left */}
            <div className="flex w-max overflow-hidden">
                <div className="flex gap-3 sm:gap-4 px-2 animate-scroll-left whitespace-nowrap">
                    {[...TICKER_ROW_1, ...TICKER_ROW_1, ...TICKER_ROW_1].map((req, idx) => (
                        <div
                            key={`r1-${idx}`}
                            className="flex flex-col justify-between bg-white dark:bg-[#0e0e10] border border-zinc-200 dark:border-zinc-900
                            rounded-xl p-3.5 sm:p-4 w-60 sm:min-w-65 shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-200 truncate">{req.title}</h3>

                            <div className="flex items-center justify-between mt-3 sm:mt-4 gap-2">
                                <div className="flex gap-1 overflow-hidden">
                                    {req.tags.map(t => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 
                                            dark:text-zinc-400 px-1.5 sm:px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 truncate"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <span
                                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${getStatusStyles(req.status)}`}
                                >
                                    {req.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 2: Auto Scrolling Right (Opposite Direction) */}
            <div className="flex w-max overflow-hidden">
                <div className="flex gap-3 sm:gap-4 px-2 animate-scroll-right whitespace-nowrap">
                    {[...TICKER_ROW_2, ...TICKER_ROW_2, ...TICKER_ROW_2].map((req, idx) => (
                        <div
                            key={`r2-${idx}`}
                            className="flex flex-col justify-between bg-white dark:bg-[#0e0e10] border border-zinc-200 dark:border-zinc-900 
                            rounded-xl p-3.5 sm:p-4 w-60 sm:min-w-65 shadow-sm dark:shadow-none"
                        >
                            <h3 className="text-xs sm:text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-200 truncate">{req.title}</h3>

                            <div className="flex items-center justify-between mt-3 sm:mt-4 gap-2">
                                <div className="flex gap-1 overflow-hidden">
                                    {req.tags.map(t => (
                                        <span
                                            key={t}
                                            className="text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-500 
                                            dark:text-zinc-400 px-1.5 sm:px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-800 truncate"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>

                                <span
                                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border shrink-0 ${getStatusStyles(req.status)}`}
                                >
                                    {req.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}