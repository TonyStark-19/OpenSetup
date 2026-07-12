// import icons
import { IoMdArrowForward } from "react-icons/io";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";
import { MdOutlineLayers } from "react-icons/md";

// code highlighting import
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// import dark theme
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// right card props
interface RightCard {
    codeString: string;
    handleCopy: () => void;
    copied: boolean;
    stacks: string[];
}

// right card component
export default function RightCard({ codeString, handleCopy, copied, stacks }: RightCard) {
    return (
        <div className="flex flex-col w-full gap-6 justify-between">
            {/* Top Code Execution Card */}
            <div
                className="flex flex-col bg-zinc-50 dark:bg-[#0e0e10] border border-zinc-200 dark:border-[#212124] 
                overflow-hidden transition-all duration-300 grow"
            >
                <div className="bg-zinc-100 dark:bg-[#201f22] border-b border-zinc-200 dark:border-zinc-800 px-5 py-3 w-full transition-colors">
                    <span className="text-zinc-500 dark:text-neutral-400 font-mono text-[10px] tracking-wider font-bold">
                        SOLUTION_V1_VERIFICATION.SH
                    </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-stretch gap-6 p-6 w-full">
                    <div className="flex flex-col justify-center max-w-sm flex-1">
                        <div className="flex flex-row justify-start items-center gap-3 mb-3">
                            <h3 className="text-xl md:text-2xl text-zinc-900 dark:text-neutral-100 font-semibold transition-colors">Community Curated</h3>
                            <div className="w-2 h-2 bg-[#4ade80] rounded-full shadow-[0_0_8px_#4ade80]" />
                        </div>

                        <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] leading-relaxed transition-colors">
                            Every setup guide in our library is vetted by thousands of senior developers. No more guessing if a tutorial still works in 2026.
                        </p>
                    </div>

                    {/* Integrated Syntax Box */}
                    <div className="w-full md:w-[48%] group rounded-lg relative overflow-hidden border border-zinc-200 dark:border-zinc-900/60 shadow-sm">
                        <SyntaxHighlighter
                            language="javascript"
                            style={coldarkDark}
                            customStyle={{
                                backgroundColor: '#070708',
                                padding: '1.25rem',
                                fontSize: '12px',
                                margin: 0,
                                minHeight: '120px'
                            }}
                            wrapLongLines={true}
                        >
                            {codeString}
                        </SyntaxHighlighter>

                        <button
                            onClick={handleCopy}
                            className="absolute top-4 right-4 p-1.5 rounded-md bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 
                            text-zinc-400 hover:text-white transition-all cursor-pointer shadow-md"
                            aria-label="Copy code"
                        >
                            {copied ? <IoCheckmark size={14} className="text-emerald-400" /> : <IoCopyOutline size={14} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Twin Split Grid Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-6">
                {/* Modern Stacks Box */}
                <div
                    className="flex flex-col justify-between p-6 bg-zinc-50 dark:bg-[#0e0e10] border 
                    border-zinc-200 dark:border-[#212124] min-h-48 transition-all duration-300"
                >
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-start items-center gap-2.5">
                            <MdOutlineLayers size={18} className="text-zinc-700 dark:text-[#EDEEF0]" />
                            <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-lg font-semibold transition-colors">Modern Stacks</h3>
                        </div>

                        <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] leading-relaxed mt-2.5 transition-colors">
                            First-class support for the tech you actually use like Vite, Tailwind, Next.js, and much more.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {stacks.map((stack, idx) => (
                            <div
                                key={idx}
                                className="border border-zinc-200 dark:border-[#252628] bg-white dark:bg-[#1d1d1f] 
                                px-2.5 py-0.5 rounded-sm shadow-sm transition-colors"
                            >
                                <h4 className="uppercase text-zinc-600 dark:text-[#EDEEF0] font-mono text-[10px] font-medium tracking-wide mt-0.5">{stack}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Copy Paste Ready Box */}
                <div
                    className="flex flex-col justify-between p-6 bg-zinc-50 dark:bg-[#0e0e10] border border-zinc-200 
                    dark:border-[#212124] min-h-48 transition-all duration-300 group"
                >
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-between items-center gap-2">
                            <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-lg font-semibold transition-colors">Copy-Paste Ready</h3>
                            <IoMdArrowForward size={18} className="text-zinc-300 dark:text-[#1d2329] group-hover:text-zinc-900 
                            dark:group-hover:text-[#EDEEF0] group-hover:translate-x-0.5 transition-all duration-200" />
                        </div>

                        <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] leading-relaxed mt-2.5 transition-colors">
                            Production-ready snippets that just work. No more boilerplate hell.
                        </p>
                    </div>

                    <p
                        className="text-[11px] font-mono font-medium text-zinc-600 dark:text-[#4e4c4f] bg-zinc-100 
                        dark:bg-zinc-950 px-2.5 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-900/40 w-max transition-colors"
                    >
                        npx opensetup init --full-stack
                    </p>
                </div>
            </div>
        </div>
    );
}