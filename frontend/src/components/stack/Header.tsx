// header component
export default function Header() {
    return (
        <div className="text-center max-w-2xl px-4 select-none z-10">
            <h3 className="text-[#525256] text-[11px] uppercase font-bold font-mono tracking-widest">
                Supported Technologies
            </h3>

            <h2 className="text-[#EDEEF0] text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-4">
                Every stack you work with
            </h2>

            <p className="text-[#888a8e] text-sm md:text-base leading-relaxed">
                From scaffolding to configuration blueprints — guides for the stacks developers actually build with.
            </p>
        </div>
    )
}