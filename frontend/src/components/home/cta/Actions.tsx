// import icons
import { FaArrowRight } from "react-icons/fa6";

// actions component
export default function Actions() {
    return (
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div
                className="flex items-center gap-2 bg-zinc-100 dark:bg-linear-to-r dark:from-zinc-900 dark:to-black border 
                border-zinc-200 dark:border-zinc-800/80 px-3 py-1 rounded-full text-[10px] font-mono tracking-widest 
                text-emerald-600 dark:text-emerald-400 font-bold uppercase shadow-sm dark:shadow-[0_2px_10px_rgba(0,0,0,0.5)] transition-colors"
            >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse"></span>
                Stack Not Found
            </div>

            <h2 className="text-zinc-900 dark:text-[#EDEEF0] text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] transition-colors">
                Missing something?
            </h2>

            <p className="text-zinc-500 dark:text-[#888a8e] text-sm md:text-base leading-relaxed max-w-xl transition-colors">
                Request a custom setup guide and the community will build it for you.
                From esoteric Nix flakes to complex Kubernetes orchestration, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mt-4">
                <button
                    className="flex items-center justify-center gap-2 bg-zinc-900 dark:bg-[#EDEEF0] text-white dark:text-[#0a0a0a] 
                    px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-zinc-800 dark:hover:bg-white active:scale-[0.98] 
                    transition-all duration-200 group cursor-pointer shadow-md dark:shadow-lg dark:shadow-black/20"
                >
                    Request a Guide
                    <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                    className="flex items-center justify-center bg-zinc-50 dark:bg-transparent text-zinc-800 dark:text-[#EDEEF0] 
                    border border-zinc-200 dark:border-zinc-800/80 px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-zinc-100 
                    dark:hover:bg-zinc-900/40 hover:border-zinc-300 dark:hover:border-zinc-700 active:scale-[0.98] transition-all 
                    duration-200 cursor-pointer backdrop-blur-sm shadow-sm dark:shadow-none"
                >
                    Browse Guides
                </button>
            </div>
        </div>
    );
}