// stats component
export default function Stats() {
    return (
        <div className="flex flex-row justify-center items-center gap-6 md:gap-14 border-t border-[#262629]/60 py-6 mt-16 max-w-4xl w-[90%] px-4 z-10 select-none">
            <div className="flex flex-col justify-center items-center text-center">
                <h4 className="text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight">50+</h4>
                <p className="text-[#525256] text-xs font-mono font-medium tracking-wide mt-0.5 uppercase">Setup guides</p>
            </div>

            <span className="h-8 w-px bg-[#262629]/80" />

            <div className="flex flex-col justify-center items-center text-center">
                <h4 className="text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight">20+</h4>
                <p className="text-[#525256] text-xs font-mono font-medium tracking-wide mt-0.5 uppercase">Tech stacks</p>
            </div>

            <span className="h-8 w-px bg-[#262629]/80" />

            <div className="flex flex-col justify-center items-center text-center">
                <h4 className="text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight">100%</h4>
                <p className="text-[#525256] text-xs font-mono font-medium tracking-wide mt-0.5 uppercase">Open source</p>
            </div>
        </div>
    )
}