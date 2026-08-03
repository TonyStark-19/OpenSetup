// import hooks
import { useEffect, useState } from "react";

// import icons
import { ArrowRight, GitPullRequestArrow } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// base url
const BASE_URL = import.meta.env.VITE_BASE_URL;

// hero content component
export default function Content() {
    const [newestTitle, setNewestTitle] = useState("Tailwind v4 + Vite setup");
    const [totalCount, setTotalCount] = useState<number | null>(null);

    // Fetch dynamic workspace telemetry metrics on component mount
    useEffect(() => {
        const fetchTelemetryData = async () => {
            try {
                // Fetch the absolute newest guide title context
                const titleRes = await fetch(`${BASE_URL}/api/guides/helper/newest-title`);
                const titleData = await titleRes.json();
                if (titleRes.ok && titleData.success) {
                    setNewestTitle(titleData.title);
                }

                // Fetch total counted database documents inventory metrics
                const countRes = await fetch(`${BASE_URL}/api/guides/helper/count`);
                const countData = await countRes.json();
                if (countRes.ok && countData.success) {
                    setTotalCount(countData.count);
                }
            } catch (err) {
                console.error("Failed synchronizing workspace helper telemetry data:", err);
            }
        };

        fetchTelemetryData();
    }, []);

    return (
        <div className="relative z-20 flex flex-col justify-center items-center w-full max-w-3xl mx-auto text-center pt-24 sm:pt-28 px-4 sm:px-6">
            {/* New guides update tab */}
            <Link
                to="/guides"
                className="block max-w-full"
            >
                <div
                    className="bg-zinc-100/80 dark:bg-[#121214]/90 flex flex-row flex-wrap justify-center items-center rounded-full py-1.5 px-4 
                    border border-zinc-200 dark:border-[#262629] group cursor-pointer hover:border-zinc-300 
                    dark:hover:border-[#38383c] transition-all duration-200 backdrop-blur-sm mb-6 sm:mb-8 animate-fade-in text-center shadow-sm"
                >
                    {/* pulse animation dot */}
                    <div className="w-2 h-2 bg-emerald-500 dark:bg-[#4ade80] rounded-full mr-2 animate-pulse shrink-0"></div>

                    {/* new guide text */}
                    <p className="text-zinc-500 dark:text-[#888a8e] text-xs sm:text-[13px] font-medium truncate max-w-50 sm:max-w-xs">
                        {newestTitle} just added
                    </p>

                    {/* link button */}
                    <p
                        className="text-zinc-900 dark:text-[#EDEEF0] flex flex-row justify-center items-center text-xs sm:text-[13px] 
                        font-medium ml-2 sm:ml-3 gap-0.5 shrink-0"
                    >
                        Read it
                        <ArrowRight
                            size={14}
                            className="text-zinc-400 dark:text-[#888a8e] group-hover:text-zinc-900 dark:group-hover:text-white 
                            group-hover:translate-x-0.5 transition-transform duration-200 ease-out"
                        />
                    </p>
                </div>
            </Link>

            {/* Hero Headings */}
            <h1
                className="text-4xl sm:text-5xl md:text-7xl text-zinc-900 dark:text-[#EDEEF0] font-bold tracking-tight max-w-3xl 
                leading-[1.15] sm:leading-[1.1] transition-colors duration-300"
            >
                Every dev setup, <br className="hidden sm:inline" /> one place.
            </h1>

            <p
                className="text-zinc-500 dark:text-[#888a8e] text-sm sm:text-base md:text-lg max-w-xl sm:max-w-152 mt-5 sm:mt-6 px-2 
                sm:px-0 transition-colors duration-300 leading-relaxed"
            >
                Community-curated setup guides for every stack.
                Find yours, copy the steps, and start building instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-8 sm:mt-10 gap-3.5 w-full sm:w-auto px-0">
                <Link
                    to="/guides"
                    className="w-full sm:w-auto"
                >
                    <button
                        className="w-full sm:w-auto bg-zinc-900 dark:bg-[#EDEEF0] hover:bg-zinc-800 dark:hover:bg-white rounded-full 
                        text-white dark:text-black text-sm font-semibold py-3.5 sm:py-3 px-8 cursor-pointer transition-all 
                        active:scale-[0.98] shadow-sm shadow-black/5"
                    >
                        Browse setups
                    </button>
                </Link>

                <Link
                    to="/contribute"
                    className="w-full sm:w-auto"
                >
                    <button
                        className="w-full sm:w-auto bg-zinc-50 dark:bg-[#121214] hover:bg-zinc-100 dark:hover:bg-[#1a1a1e] border 
                        border-zinc-200 dark:border-[#262629] hover:border-zinc-300 dark:hover:border-[#38383c] rounded-full 
                        text-zinc-800 dark:text-[#EDEEF0] text-sm font-semibold py-3.5 sm:py-3 px-6 cursor-pointer flex flex-row justify-center items-center 
                        gap-2 transition-all active:scale-[0.98]"
                    >
                        <GitPullRequestArrow size={15} className="text-zinc-400 dark:text-[#888a8e]" />
                        Contribute a guide
                    </button>
                </Link>
            </div>

            {/* Bottom Stats Meta */}
            <p
                className="text-zinc-400 dark:text-[#525256] text-[11px] sm:text-xs md:text-sm mt-8 sm:mt-10 tracking-wide font-medium 
                transition-colors duration-300 select-none"
            >
                OPEN SOURCE ·{" "}
                <span className="text-zinc-900 dark:text-[#EDEEF0] hover:underline underline-offset-4 cursor-default font-semibold uppercase">
                    {totalCount !== null ? `${totalCount}+ GUIDES` : "READING LOGS..."}
                </span>{" "}
                · COMMUNITY MAINTAINED
            </p>
        </div>
    );
}