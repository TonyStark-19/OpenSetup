// header component
export default function Header() {
    return (
        <div className="flex flex-col justify-start items-start max-w-2xl select-none">
            {/* Theme-Adaptive Status Ticker */}
            <div
                className="flex flex-row items-center gap-2 border border-zinc-200 dark:border-[#252628] bg-zinc-50 
                dark:bg-[#0c0c0e] px-3 py-1.5 rounded-full mb-6 transition-colors duration-300 shadow-sm dark:shadow-none"
            >
                <span className="w-1.5 h-1.5 bg-emerald-500 dark:bg-[#4ade80] rounded-full animate-pulse" />
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono font-bold tracking-wider">
                    System Status: Pulling Registry
                </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4 text-zinc-900 dark:text-neutral-100 transition-colors">
                How It Works
            </h2>

            <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg transition-colors">
                An open-source repository of verified, step-by-step developer environments. Zero fluff, just code.
            </p>
        </div>
    );
}