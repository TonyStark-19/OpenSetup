// import icons
import { FaPlus } from "react-icons/fa6";

// info component
export default function Info() {
    return (
        <div className="lg:col-span-5 grid grid-cols-2 gap-4 w-full">
            {/* Main Mock Terminal Card */}
            <div
                className="col-span-2 flex flex-col justify-between bg-zinc-50/50 dark:bg-black/40 backdrop-blur-md border 
                border-zinc-200 dark:border-zinc-900 p-6 min-h-44 relative overflow-hidden group hover:border-zinc-300 
                dark:hover:border-zinc-800 transition-all duration-300 shadow-sm dark:shadow-2xl dark:shadow-black rounded-xl"
            >
                {/* Interactive dynamic glow behind card on hover */}
                <div
                    className="absolute inset-0 bg-linear-to-b from-zinc-200/0 to-zinc-200/10 dark:from-zinc-900/0 dark:to-zinc-900/30 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                />

                <div className="flex items-center justify-between relative z-10">
                    <div
                        className="p-1.5 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/30 
                        aspect-square rounded-md text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 
                        group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors duration-300 flex justify-center items-center"
                    >
                        <FaPlus size={12} />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 font-semibold tracking-wider uppercase">#REQ-284</span>
                </div>

                <div className="flex flex-col gap-1 mt-6 relative z-10">
                    <div className="flex items-center border-b border-emerald-500/20 dark:border-emerald-500/30 w-max pb-1 mb-2">
                        <span
                            className="text-[10px] font-mono font-black tracking-wider text-emerald-600 dark:text-[#3bff61] 
                            bg-emerald-500/5 dark:bg-[#3bff61]/5 px-1.5 py-0.5 rounded-sm"
                        >
                            PENDING_REVIEW
                        </span>
                    </div>

                    <div
                        className="text-zinc-800 dark:text-[#EDEEF0] font-mono text-xs md:text-[13px] tracking-tight antialiased 
                        bg-white dark:bg-zinc-950/60 px-3 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-900/50 
                        group-hover:border-zinc-300 dark:group-hover:border-zinc-900 transition-colors duration-300 shadow-sm dark:shadow-none"
                    >
                        <span className="text-zinc-400 dark:text-zinc-600 mr-1 select-none">~/</span>setup-arch-linux-hyprland.sh
                    </div>
                </div>
            </div>

            {/* Metric Box 1 */}
            <div
                className="flex flex-col justify-between bg-zinc-50/50 dark:bg-[#0b0b0d]/60 backdrop-blur-md border 
                border-zinc-200 dark:border-zinc-900 p-5 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all 
                duration-300 group rounded-xl shadow-sm dark:shadow-none"
            >
                <span
                    className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 
                    group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors uppercase"
                >
                    Active Build
                </span>

                <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-[#EDEEF0] transition-colors">12</span>
                    <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981] mb-1 animate-pulse"></span>
                </div>
            </div>

            {/* Metric Box 2 */}
            <div
                className="flex flex-col justify-between bg-zinc-50/50 dark:bg-[#0b0b0d]/60 backdrop-blur-md border 
                border-zinc-200 dark:border-zinc-900 p-5 hover:border-zinc-300 dark:hover:border-zinc-800 transition-all 
                duration-300 group rounded-xl shadow-sm dark:shadow-none"
            >
                <span
                    className="text-[10px] font-mono font-bold tracking-wider text-zinc-400 dark:text-zinc-500 
                    group-hover:text-zinc-600 dark:group-hover:text-zinc-400 transition-colors uppercase"
                >
                    Contributors
                </span>

                <span className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-[#EDEEF0] mt-4 transition-colors">100+</span>
            </div>
        </div>
    );
}