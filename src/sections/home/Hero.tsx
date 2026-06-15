// import icons
import { ArrowRight, GitPullRequestArrow } from "lucide-react";

// import components
import GuidePanel from "./GuidePanel";

// her section
export default function Hero() {
    return (
        <div className="relative bg-[#0a0a0a] flex flex-col justify-center items-center min-h-screen overflow-hidden px-4">
            {/* Dot Grid */}
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.22]"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
                    backgroundSize: "20px 20px",
                    WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 50%, transparent 90%)",
                    maskImage: "radial-gradient(circle at 50% 50%, black 50%, transparent 90%)"
                }}
            />

            {/* Ambient Glows */}
            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none mix-blend-screen">
                {/* Micro Left Blue Glow */}
                <div
                    className="absolute left-[-10%] top-[5%] w-200 h-200 rounded-full opacity-[0.05]"
                    style={{
                        background: "radial-gradient(circle, #2563eb 0%, transparent 70%)",
                        filter: "blur(120px)",
                    }}
                />

                {/* Micro Right Cyan Glow */}
                <div
                    className="absolute right-[-10%] bottom-[5%] w-200 h-200 rounded-full opacity-[0.03]"
                    style={{
                        background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)",
                        filter: "blur(120px)",
                    }}
                />

                {/* Faded Angled Top-Left Sheen */}
                <div
                    className="absolute left-[-15%] top-[-10%] w-250 h-62.5 rotate-35 opacity-[0.02]"
                    style={{
                        background: "linear-gradient(to right, transparent, #ffffff, transparent)",
                        filter: "blur(100px)",
                    }}
                />

                {/* Faded Angled Bottom-Right Sheen */}
                <div
                    className="absolute right-[-15%] bottom-[-10%] w-250 h-62.5 rotate-35 opacity-[0.015]"
                    style={{
                        background: "linear-gradient(to right, transparent, #ffffff, transparent)",
                        filter: "blur(100px)",
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col justify-center items-center w-full max-w-3xl mx-auto text-center pt-24">
                {/* New guides update tab */}
                <div
                    className="bg-[#121214]/90 flex flex-row justify-center items-center rounded-full py-1.5 pl-3 pr-4 border border-[#262629] group 
                    cursor-pointer hover:border-[#38383c] transition-colors duration-200 backdrop-blur-sm mb-8"
                >
                    {/* pulse animation dot */}
                    <div className="w-2 h-2 bg-[#4ade80] rounded-full mr-2.5 animate-pulse"></div>

                    {/* new guide text */}
                    <p className="text-[#888a8e] text-[13px] font-medium">Tailwind v4 + Vite setup just added</p>

                    {/* link button */}
                    <p className="text-[#EDEEF0] flex flex-row justify-center items-center text-[13px] font-medium ml-3 gap-0.5">
                        Read it
                        <ArrowRight
                            size={14}
                            className="text-[#888a8e] group-hover:text-white group-hover:translate-x-0.5 transition-transform duration-200 ease-out"
                        />
                    </p>
                </div>

                {/* Hero Headings */}
                <h1 className="text-5xl md:text-7xl text-[#EDEEF0] font-bold tracking-tight max-w-3xl leading-[1.1]">
                    Every dev setup, <br /> one place.
                </h1>

                <p className="text-[#888a8e] text-base md:text-lg max-w-150 mt-6">
                    Community-curated setup guides for every stack.
                    Find yours, copy the steps, and start building instantly.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row justify-center items-center mt-10 gap-3 w-full sm:w-auto">
                    <button
                        className="w-full sm:w-auto bg-[#EDEEF0] hover:bg-white rounded-full text-black text-sm font-semibold py-3 px-8 cursor-pointer 
                        transition-all active:scale-[0.98]"
                    >
                        Browse setups
                    </button>

                    <button
                        className="w-full sm:w-auto bg-[#121214] hover:bg-[#1a1a1e] border border-[#262629] hover:border-[#38383c] rounded-full 
                        text-[#EDEEF0] text-sm font-semibold py-3 px-6 cursor-pointer flex flex-row justify-center items-center gap-2 
                        transition-all active:scale-[0.98]"
                    >
                        <GitPullRequestArrow size={15} className="text-[#888a8e]" />
                        Contribute a guide
                    </button>
                </div>

                {/* Bottom Stats Meta */}
                <p className="text-[#525256] text-xs md:text-sm mt-8 tracking-wide font-medium">
                    OPEN SOURCE · <span className="text-[#EDEEF0] hover:underline underline-offset-4 cursor-pointer font-semibold">50+ GUIDES</span>{" "}
                    · COMMUNITY MAINTAINED
                </p>
            </div>

            <GuidePanel />
        </div>
    )
}