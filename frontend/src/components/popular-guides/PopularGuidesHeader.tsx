// popular guides header
export default function PopularGuidesHeader() {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between items-start gap-4 pb-6 border-b border-zinc-900">
            <div className="flex flex-col justify-start items-start">
                <h3 className="text-[#525256] text-[11px] uppercase font-bold font-mono tracking-widest">
                    Popular Guides
                </h3>

                <h2 className="text-[#EDEEF0] text-4xl md:text-5xl font-semibold tracking-tight text-left mt-2">
                    Production blueprints.
                </h2>
            </div>

            <p className="text-[#888a8e] text-sm max-w-md leading-relaxed">
                Skip the trial and error. Explore community-vetted architecture configs optimized for execution.
            </p>
        </div>
    )
}