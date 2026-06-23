// import icons
import { FaArrowRight } from "react-icons/fa6";

// actions component
export default function Actions() {
    return (
        <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <div
                className="flex items-center gap-2 bg-linear-to-r from-zinc-900 to-black border border-zinc-800/80 px-3 
                py-1 rounded-full text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
            >
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981] animate-pulse"></span>
                Stack Not Found
            </div>

            <h2 className="text-[#EDEEF0] text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                Missing something?
            </h2>

            <p className="text-[#888a8e] text-sm md:text-base leading-relaxed max-w-xl">
                Request a custom setup guide and the community will build it for you.
                From esoteric Nix flakes to complex Kubernetes orchestration, we've got you covered.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto mt-4">
                <button
                    className="flex items-center justify-center gap-2 bg-[#EDEEF0] text-[#0a0a0a] px-7 py-3.5 rounded-lg 
                    text-sm font-semibold hover:bg-white active:scale-[0.98] transition-all duration-200 group cursor-pointer 
                    shadow-lg shadow-black/20"
                >
                    Request a Guide
                    <FaArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                    className="flex items-center justify-center bg-transparent text-[#EDEEF0] border border-zinc-800/80 px-7 py-3.5 
                    rounded-lg text-sm font-semibold hover:bg-zinc-900/40 hover:border-zinc-700 active:scale-[0.98] transition-all 
                    duration-200 cursor-pointer backdrop-blur-sm"
                >
                    Browse Guides
                </button>
            </div>
        </div>
    )
}