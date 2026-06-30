// contribute hero section content
export default function ContributeHeroContent() {
    return (
        <>
            <div
                className="flex items-center gap-2 border border-zinc-200 dark:border-[#252628] bg-zinc-50 
                dark:bg-[#0c0c0e] px-3 py-1 rounded-full mb-6 shadow-sm dark:shadow-none mt-12"
            >
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-zinc-500 dark:text-zinc-400 text-[10px] uppercase font-mono font-bold tracking-wider">
                    Registry Contribution Node
                </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight text-zinc-900 dark:text-white">
                Share what <span className="text-zinc-400 dark:text-zinc-600">you</span> know.
            </h1>

            <p className="text-zinc-500 dark:text-[#888a8e] text-base md:text-lg max-w-xl leading-relaxed mb-16">
                Wrote a setup configuration that saved you hours? Submit it as a markdown guide. The community will thank you.
            </p>
        </>
    )
}