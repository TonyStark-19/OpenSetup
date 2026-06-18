// import icons
import { IoMdWifi } from "react-icons/io";

// about header component
export default function AboutHeader() {
    return (
        <div className="flex flex-row justify-between items-center w-full">
            <div className="flex flex-col justify-start items-start max-w-4xl">
                <h3 className="text-[#525256] text-[11px] uppercase font-bold font-mono tracking-widest">
                    About OpenSetup
                </h3>

                <h2 className="text-[#EDEEF0] text-6xl font-semibold tracking-tight text-left mt-3 mb-4">
                    Built for developers, by <br /> developers.
                </h2>

                <p className="text-[#888a8e] text-sm md:text-base leading-relaxed w-[80%]">
                    OpenSetup is a community-driven repository of modern, production-ready infrastructure blueprints. We eliminate the "fragmented documentation"
                    tax that stalls technical progress.
                </p>
            </div>

            <div
                className="flex flex-col justify-between items-start p-3 h-60 w-80 border border-[#212124] relative bg-linear-to-br 
                from-[#241816] via-[#121214] to-[#0b0b0d]"
            >
                <div className="flex flex-row justify-between items-center">
                    <p className="text-[#888a8e] text-sm">v-1.0.0-stable</p>
                    <IoMdWifi size={16} className="text-sm text-[#EDEEF0] absolute right-3 top-3"></IoMdWifi>
                </div>

                <div className="flex flex-col text-[#EDEEF0] font-medium">
                    <h3 className="uppercase text-xs">Current Status</h3>
                    <h4 className="text-2xl text-left">100% Verified</h4>
                </div>
            </div>
        </div>
    )
}