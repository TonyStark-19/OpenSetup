// import components
import Actions from "../components/cta/Actions";
import Info from "../components/cta/Info";

// request guide cta section
export default function RequestGuideCTA() {
    return (
        <div
            className="relative flex flex-col justify-center items-center py-28 bg-white dark:bg-[#0a0a0a] overflow-hidden px-6 md:px-16 
            lg:px-24 w-full border-t border-zinc-200 dark:border-zinc-900/80 transition-colors duration-300"
        >
            {/* Ambient Background Glow Effect (Dark Mode Optimized) */}
            <div className="absolute right-[-10%] top-[20%] w-lg h-lg bg-emerald-500/5 dark:bg-emerald-950/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute left-[-5%] bottom-[-10%] w-[24rem] h- 96bg-zinc-200/40 dark:bg-zinc-900/20 rounded-full blur-[100px] pointer-events-none" />

            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                {/* Left Side: Copy and Actions */}
                <Actions />

                {/* Right Side: Interactive Mock UI elements */}
                <Info />
            </div>
        </div>
    );
}