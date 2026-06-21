// header component
export default function Header() {
    return (
        <div className="flex flex-col justify-start items-start max-w-2xl">
            <div className="flex flex-row items-center gap-2 border-2 border-[#252628] bg-[#0c0c0e] px-2.5 py-1 rounded-sm mb-4">
                <span className="w-1.5 h-1.5 bg-[#4ade80] rounded-full animate-pulse" />
                <span className="text-neutral-400  text-[10px] uppercase font-bold tracking-wider">
                    System Status: Pulling Registry
                </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold tracking-tight uppercase mb-5 text-neutral-100">
                How It Works
            </h2>

            <p className="text-neutral-400 text-sm md:text-base leading-relaxed max-w-lg">
                An open-source repository of verified, step-by-step developer environments. Zero fluff, just code.
            </p>
        </div>
    )
}