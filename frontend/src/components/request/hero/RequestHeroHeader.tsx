// request hero header component
export default function RequestHeroHeader() {
    return (
        <div className="w-full max-w-3xl flex flex-col items-center text-center select-none mb-10 px-4">
            <div
                className="flex items-center gap-2 border border-zinc-200 dark:border-[#252628] bg-zinc-50 dark:bg-[#0c0c0e] 
                px-3 py-1 rounded-full mb-6 shadow-sm dark:shadow-none"
            >
                <span className="w-1.5 h-1.5 bg-red-500 dark:bg-[#ef4444] rounded-full animate-pulse" />

                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono font-bold tracking-wider">
                    42 open requests · community driven
                </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-5 leading-tight">
                Missing a guide? <br />
                <span className="text-zinc-400 dark:text-zinc-600">You're not</span> the only one.
            </h1>

            <p className="text-zinc-500 dark:text-[#888a8e] text-sm md:text-base max-w-lg leading-relaxed">
                Request a setup guide and let the community know what's missing. The most requested configurations get built first.
            </p>
        </div>
    )
}