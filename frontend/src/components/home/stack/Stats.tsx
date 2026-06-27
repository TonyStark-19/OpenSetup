// stats component
export default function Stats() {
    return (
        <div
            className="flex flex-row justify-center items-center gap-6 md:gap-14 border-t border-zinc-200 
            dark:border-[#262629]/60 py-6 mt-16 max-w-4xl w-[90%] px-4 z-10 select-none transition-colors duration-300"
        >
            <div className="flex flex-col justify-center items-center text-center">
                <h4 className="text-zinc-900 dark:text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight transition-colors">50+</h4>
                <p className="text-zinc-400 dark:text-[#525256] text-xs font-mono font-bold tracking-wide mt-0.5 uppercase transition-colors">Setup guides</p>
            </div>

            <span className="h-8 w-px bg-zinc-200 dark:bg-[#262629]/80 transition-colors" />

            <div className="flex flex-col justify-center items-center text-center">
                <h4 className="text-zinc-900 dark:text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight transition-colors">20+</h4>
                <p className="text-zinc-400 dark:text-[#525256] text-xs font-mono font-bold tracking-wide mt-0.5 uppercase transition-colors">Tech stacks</p>
            </div>

            <span className="h-8 w-px bg-zinc-200 dark:bg-[#262629]/80 transition-colors" />

            <div className="flex flex-col justify-center items-center text-center">
                <h4 className="text-zinc-900 dark:text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight transition-colors">100%</h4>
                <p className="text-zinc-400 dark:text-[#525256] text-xs font-mono font-bold tracking-wide mt-0.5 uppercase transition-colors">Open source</p>
            </div>
        </div>
    );
}