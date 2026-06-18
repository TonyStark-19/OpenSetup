// import icons
import { LuTriangleAlert } from "react-icons/lu";

// left card component
export default function LeftCard() {
    return (
        <div className="flex flex-col max-w-lg w-full self-stretch">
            <div className="flex flex-row justify-between items-center bg-[#201f22] p-4 w-full">
                <div className="flex flex-row justify-between items-center gap-2">
                    <LuTriangleAlert size={14} className="text-[#d28b71]" />
                    <p className="uppercase text-[#EDEEF0] text-sm font-medium">The Problem</p>
                </div>

                <div className="flex flex-row gap-0.5">
                    <div className="bg-[#444748] w-2 h-2 rounded-full" />
                    <div className="bg-[#444748] w-2 h-2 rounded-full" />
                </div>
            </div>

            <div className="flex flex-col p-6 border-l border-r border-b border-[#212124] w-full bg-[#0e0e10] flex-1">
                <div className="relative w-full aspect-16/10 bg-neutral-900 border border-neutral-800 overflow-hidden rounded-sm mb-6">
                    <img
                        src="/other/about.avif"
                        alt="404 documentation graphic"
                        className="h-full w-full object-cover grayscale brightness-[0.35]"
                    />

                    <div className="absolute inset-0 flex justify-center items-center">
                        <div
                            className="bg-[#141416]/90 border border-neutral-800 px-3 py-1.5 font-mono text-[11px] text-[#e06c53] 
                            shadow-2xl tracking-wide rounded-sm"
                        >
                            404: Docs Not Found
                        </div>
                    </div>
                </div>

                <h3 className="text-[#EDEEF0] text-xl font-medium mb-2">Fragmented Reality</h3>
                <p className="text-[#888a8e] text-[13px] leading-relaxed">Engineers spend up to 40% of their time stitching together outdated
                    StackOverflow answers, medium posts, and conflicting official documentation. We fixed that.
                </p>
            </div>
        </div>
    )
}