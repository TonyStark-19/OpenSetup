// import icons
import { IoMdWifi } from "react-icons/io";

// about header component
export default function AboutHeader() {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-8">
            <div className="flex flex-col justify-start items-start max-w-3xl">
                <h3 className="text-zinc-400 dark:text-[#525256] text-[11px] uppercase font-bold font-mono tracking-widest transition-colors">
                    About OpenSetup
                </h3>

                <h2 className="text-zinc-900 dark:text-[#EDEEF0] text-4xl md:text-5xl font-semibold tracking-tight text-left mt-3 mb-4 transition-colors">
                    Built for developers, by <br className="hidden md:block" /> developers.
                </h2>

                <p className="text-zinc-500 dark:text-[#888a8e] text-sm md:text-base leading-relaxed w-full md:w-[85%] transition-colors">
                    OpenSetup is a community-driven repository of modern, production-ready infrastructure blueprints. We eliminate the "fragmented
                    documentation" tax that stalls technical progress.
                </p>
            </div>

            {/* Premium Dynamic Status Card */}
            <div
                className="flex flex-col justify-between items-start p-6 h-48 w-full md:w-80 border border-zinc-200 
                dark:border-[#212124] relative bg-linear-to-br from-zinc-50 via-white to-zinc-100 dark:from-[#241816] 
                dark:via-[#121214] dark:to-[#0b0b0d] shadow-sm dark:shadow-none transition-all duration-300"
            >
                <div className="flex flex-row justify-between items-center w-full">
                    <p className="text-zinc-400 dark:text-[#888a8e] text-xs font-mono">v-1.0.0-stable</p>
                    <IoMdWifi size={16} className="text-zinc-500 dark:text-[#EDEEF0] absolute right-6 top-6" />
                </div>

                <div className="flex flex-col text-zinc-900 dark:text-[#EDEEF0] transition-colors">
                    <h3 className="uppercase text-[10px] font-mono tracking-wider text-zinc-400 dark:text-[#525256] font-bold">Current Status</h3>
                    <h4 className="text-2xl font-semibold tracking-tight mt-1">100% Verified</h4>
                </div>
            </div>
        </div>
    );
}