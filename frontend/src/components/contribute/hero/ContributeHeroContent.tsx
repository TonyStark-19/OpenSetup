// contribute hero section content
export default function ContributeHeroContent() {
    return (
        <>
            <div
                className="flex items-center gap-2 border border-zinc-200 dark:border-[#252628] bg-zinc-50 
                dark:bg-[#0c0c0e] px-3 py-1 rounded-full mb-5 sm:mb-6 shadow-sm dark:shadow-none mt-12 shrink-0"
            >
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shrink-0" />
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono font-bold tracking-wider truncate">
                    Registry Contribution Node
                </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight text-zinc-900 dark:text-white text-center px-2">
                Share what <span className="text-zinc-400 dark:text-zinc-600">you</span> know.
            </h1>

            <p className="text-zinc-500 dark:text-[#888a8e] text-xs sm:text-base md:text-lg max-w-sm sm:max-w-xl leading-relaxed mb-10 sm:mb-16 text-center px-4">
                Wrote a setup configuration that saved you hours? Submit it as a markdown guide. The community will thank you.
            </p>
        </>
    )
}