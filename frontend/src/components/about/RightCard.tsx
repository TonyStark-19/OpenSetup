// import icons
import { IoMdArrowForward } from "react-icons/io";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { MdOutlineLayers } from "react-icons/md";

// code highlighting import
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// import dark theme
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// import type
import type { CSSProperties } from "react";

// right card props
interface RightCard {
    customCodeBlockStyle: CSSProperties;
    codeString: string;
    handleCopy: () => void;
    copied: boolean;
    stacks: string[];
}

// right card component
export default function RightCard({ customCodeBlockStyle, codeString, handleCopy, copied, stacks }: RightCard) {
    return (
        <div className="flex flex-col w-full gap-5 h-full">
            <div className="flex flex-col bg-[#0e0e10] flex-1">
                <div className="flex flex-row justify-between items-center bg-[#201f22] p-4 w-full">
                    <span className="text-neutral-400 font-mono text-[10px] tracking-wider font-bold">
                        SOLUTION_V1_VERIFICATION.SH
                    </span>
                </div>

                <div className="flex flex-row justify-between items-center p-6 border-l border-r border-b border-[#212124] w-full">
                    <div className="flex flex-col max-w-85">
                        <div className="flex flex-row justify-start items-center gap-3 mb-3">
                            <h3 className="text-lg md:text-2xl text-neutral-100 font-medium">Community Curated</h3>
                            <div className="w-2 h-2 bg-[#4ade80] rounded-full animate-pulse" />
                        </div>

                        <p className="text-[#888a8e] text-[13px] leading-relaxed">Every setup guide in our library is vetted by thousands of senior
                            developers. No more guessing if a tutorial still works in 2026.
                        </p>
                    </div>

                    <div className="w-[50%] group rounded-sm relative overflow-hidden py-2">
                        <SyntaxHighlighter
                            language="javascript"
                            style={coldarkDark}
                            customStyle={customCodeBlockStyle}
                            wrapLongLines={true}
                        >
                            {codeString}
                        </SyntaxHighlighter>

                        <button
                            onClick={handleCopy}
                            className="absolute top-5 right-3 text-neutral-600 hover:text-neutral-300 transition-colors cursor-pointer"
                            aria-label="Copy code"
                        >
                            {copied ? (
                                <IoCheckmark size={16} />
                            ) : (
                                <IoCopyOutline size={16} />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 w-full gap-5">
                <div className="flex flex-col justify-between p-5 bg-[#0e0e10] border border-[#212124] min-h-50">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center gap-2">
                            <MdOutlineLayers size={20} className="text-[#EDEEF0]" />
                            <h3 className="text-[#EDEEF0] text-xl font-medium">Modern Stacks</h3>
                        </div>

                        <p className="text-[#888a8e] text-[13px] leading-relaxed mt-3">First-class support for the tech you actually use like Vite,
                            Tailwind, Next.js, and much more.
                        </p>
                    </div>

                    <div className="flex flex-row gap-3 mt-3">
                        {stacks.map((stack, idx) => (
                            <div
                                key={idx}
                                className="border-2 border-[#252628] bg-[#1d1d1f] px-2"
                            >
                                <h4 className="uppercase text-[#EDEEF0] text-[11px] mt-0.5">{stack}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col justify-between p-5 bg-[#0e0e10] border border-[#212124] group">
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center gap-2">
                            <h3 className="text-[#EDEEF0] text-xl font-medium">Copy-Paste Ready</h3>
                            <IoMdArrowForward size={20} className="text-[#1d2329] group-hover:text-[#EDEEF0] transition" />
                        </div>

                        <p className="text-[#888a8e] text-[13px] leading-relaxed mt-3 max-w-70">Production-ready snippets that just work. No more
                            boilerplate hell.
                        </p>
                    </div>

                    <p className="text-xs text-[#3e3d3f]">npx opensetup init --full-stack</p>
                </div>
            </div>
        </div>
    )
}