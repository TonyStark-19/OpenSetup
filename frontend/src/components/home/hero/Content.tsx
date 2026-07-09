// import icons
import { ArrowRight, GitPullRequestArrow } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// hero content component
export default function Content() {
    return (
        <div className="relative z-20 flex flex-col justify-center items-center w-full max-w-3xl mx-auto text-center pt-28">
            {/* New guides update tab */}
            <div
                className="bg-zinc-100/80 dark:bg-[#121214]/90 flex flex-row justify-center items-center rounded-full py-1.5 pl-3 
                pr-4 border border-zinc-200 dark:border-[#262629] group cursor-pointer hover:border-zinc-300 
                dark:hover:border-[#38383c] transition-all duration-200 backdrop-blur-sm mb-8"
            >
                {/* pulse animation dot */}
                <div className="w-2 h-2 bg-emerald-500 dark:bg-[#4ade80] rounded-full mr-2.5 animate-pulse"></div>

                {/* new guide text */}
                <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] font-medium">Tailwind v4 + Vite setup just added</p>

                {/* link button */}
                <p className="text-zinc-900 dark:text-[#EDEEF0] flex flex-row justify-center items-center text-[13px] font-medium ml-3 gap-0.5">
                    Read it
                    <ArrowRight
                        size={14}
                        className="text-zinc-400 dark:text-[#888a8e] group-hover:text-zinc-900 dark:group-hover:text-white 
                        group-hover:translate-x-0.5 transition-transform duration-200 ease-out"
                    />
                </p>
            </div>

            {/* Hero Headings */}
            <h1 className="text-5xl md:text-7xl text-zinc-900 dark:text-[#EDEEF0] font-bold tracking-tight max-w-3xl leading-[1.1] transition-colors duration-300">
                Every dev setup, <br /> one place.
            </h1>

            <p className="text-zinc-500 dark:text-[#888a8e] text-base md:text-lg max-w-152 mt-6 transition-colors duration-300">
                Community-curated setup guides for every stack.
                Find yours, copy the steps, and start building instantly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-3 w-full sm:w-auto">
                <Link to="/guides">
                    <button
                        className="w-full sm:w-auto bg-zinc-900 dark:bg-[#EDEEF0] hover:bg-zinc-800 dark:hover:bg-white rounded-full 
                        text-white dark:text-black text-sm font-semibold py-3 px-8 cursor-pointer transition-all active:scale-[0.98] shadow-sm shadow-black/5"
                    >
                        Browse setups
                    </button>
                </Link>

                <Link to="/contribute">
                    <button
                        className="w-full sm:w-auto bg-zinc-50 dark:bg-[#121214] hover:bg-zinc-100 dark:hover:bg-[#1a1a1e] border 
                        border-zinc-200 dark:border-[#262629] hover:border-zinc-300 dark:hover:border-[#38383c] rounded-full 
                        text-zinc-800 dark:text-[#EDEEF0] text-sm font-semibold py-3 px-6 cursor-pointer flex flex-row justify-center items-center 
                        gap-2 transition-all active:scale-[0.98]"
                    >
                        <GitPullRequestArrow size={15} className="text-zinc-400 dark:text-[#888a8e]" />
                        Contribute a guide
                    </button>
                </Link>
            </div>

            {/* Bottom Stats Meta */}
            <p className="text-zinc-400 dark:text-[#525256] text-xs md:text-sm mt-8 tracking-wide font-medium transition-colors duration-300">
                OPEN SOURCE · <span className="text-zinc-900 dark:text-[#EDEEF0] hover:underline underline-offset-4 cursor-default font-semibold">
                    50+ GUIDES
                </span>{" "}
                · COMMUNITY MAINTAINED
            </p>
        </div>
    )
}