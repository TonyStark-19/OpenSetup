// import icons
import { LuTriangleAlert } from "react-icons/lu";

// left card component
export default function LeftCard() {
    return (
        <div
            className="flex flex-col w-full bg-zinc-50 dark:bg-[#0e0e10] border border-zinc-200 
            dark:border-[#212124] overflow-hidden transition-all duration-300"
        >
            {/* Header Toolbar bar */}
            <div
                className="flex flex-row justify-between items-center bg-zinc-100 dark:bg-[#201f22] border-b 
                border-zinc-200 dark:border-zinc-800 px-5 py-3.5 w-full transition-colors"
            >
                <div className="flex flex-row justify-between items-center gap-2">
                    <LuTriangleAlert size={14} className="text-amber-600 dark:text-[#d28b71]" />
                    <p className="uppercase text-zinc-800 dark:text-[#EDEEF0] text-xs font-mono font-bold tracking-wider">The Problem</p>
                </div>

                <div className="flex flex-row gap-1">
                    <div className="bg-zinc-300 dark:bg-[#444748] w-1.5 h-1.5 rounded-full" />
                    <div className="bg-zinc-300 dark:bg-[#444748] w-1.5 h-1.5 rounded-full" />
                </div>
            </div>

            {/* Inner frame */}
            <div className="flex flex-col p-6 w-full grow justify-between">
                <div>
                    <div
                        className="relative w-full aspect-video bg-zinc-200 dark:bg-neutral-900 border border-zinc-300 
                        dark:border-neutral-800 overflow-hidden rounded-lg mb-6 transition-colors"
                    >
                        <img
                            src="/other/about.avif"
                            alt="404 documentation graphic"
                            className="h-full w-full object-cover grayscale brightness-90 dark:brightness-[0.35]"
                        />

                        <div className="absolute inset-0 flex justify-center items-center">
                            <div
                                className="bg-white/90 dark:bg-[#141416]/90 border border-zinc-300 dark:border-neutral-800 
                                px-3 py-1.5 font-mono text-[11px] text-amber-700 dark:text-[#e06c53] font-bold shadow-md rounded-md backdrop-blur-sm"
                            >
                                404: Docs Not Found
                            </div>
                        </div>
                    </div>

                    <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-xl font-semibold mb-2 transition-colors">
                        Fragmented Reality
                    </h3>

                    <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] leading-relaxed transition-colors">
                        Engineers spend up to 40% of their time stitching together outdated StackOverflow answers, medium posts, and
                        conflicting official documentation. We fixed that.
                    </p>
                </div>
            </div>
        </div>
    );
}