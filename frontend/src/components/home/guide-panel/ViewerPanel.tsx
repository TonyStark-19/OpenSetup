// import react markdown
import ReactMarkdown from "react-markdown";

// import icons
import { Check, Copy, FileText } from "lucide-react";

// import tpye
import type { GuideMetadata } from "../../../sections/home/GuidePanel";

// viewer panel props
interface ViewerPanelProps {
    viewMode: string,
    handleCopy: (text: string, inlineId: string) => void,
    copiedText: string | null,
    markdownText: string,
    MOCK_METADATA: GuideMetadata
}

// viewer panel component
export default function ViewerPanel({ viewMode, handleCopy, copiedText, markdownText, MOCK_METADATA }: ViewerPanelProps) {
    return (
        <div className="p-4 sm:p-6 md:p-8 overflow-x-hidden">
            {viewMode === "preview" ? (
                <div className="prose dark:prose-invert max-w-none text-left select-text wrap-break-word">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) =>
                                <h1
                                    className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 border-b 
                                    border-zinc-200 dark:border-[#212124] pb-2 transition-colors"
                                >
                                    {children}
                                </h1>,
                            h2: ({ children }) =>
                                <h2
                                    className="text-lg sm:text-xl font-bold tracking-tight text-zinc-800 dark:text-[#EDEEF0] mt-8 mb-3 flex items-center 
                                    gap-2 transition-colors"
                                >
                                    {children}
                                </h2>,
                            p: ({ children }) =>
                                <p className="text-zinc-600 dark:text-[#888a8e] text-sm sm:text-[15px] leading-relaxed mb-4 transition-colors">
                                    {children}
                                </p>,
                            ol: ({ children }) =>
                                <ol className="list-decimal list-inside text-zinc-600 dark:text-[#888a8e] text-xs sm:text-[14px] space-y-2 mb-4 pl-1">
                                    {children}
                                </ol>,
                            li: ({ children }) =>
                                <li className="text-zinc-600 dark:text-[#888a8e] marker:text-zinc-400 dark:marker:text-[#525256]">
                                    <span className="text-zinc-700 dark:text-[#b5b7ba] transition-colors">
                                        {children}
                                    </span>
                                </li>,
                            hr: () => <hr className="border-zinc-200 dark:border-[#212124] my-6 transition-colors" />,

                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const inlineCode = String(children).replace(/\n$/, '');
                                const uniqueId = `code-${inlineCode.slice(0, 15).replace(/\s+/g, '-')}`;

                                return className ? (
                                    <div className="my-5 space-y-2 w-full font-mono overflow-hidden">
                                        <div
                                            className="bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-[#1c1c1f] 
                                            rounded-xl overflow-hidden text-xs sm:text-[13px] leading-relaxed transition-colors duration-300"
                                        >
                                            <div
                                                className="bg-zinc-100 dark:bg-[#0c0c0e] border-b border-zinc-200 dark:border-[#1c1c1f] 
                                                px-3 sm:px-4 py-2 flex items-center justify-between text-zinc-400 dark:text-[#525256] text-xs 
                                                font-sans transition-colors duration-300"
                                            >
                                                <span className="font-medium text-zinc-500 dark:text-zinc-400">{match ? match[1] : "code"}</span>

                                                <button
                                                    onClick={() => handleCopy(inlineCode, uniqueId)}
                                                    className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 
                                                    dark:hover:text-white transition-colors cursor-pointer font-medium"
                                                >
                                                    {copiedText === uniqueId ? (
                                                        <>
                                                            <Check size={13} className="text-emerald-600 dark:text-[#4ade80]" />
                                                            <span className="text-emerald-600 dark:text-[#4ade80]">Copied!</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Copy size={13} />
                                                            <span>Copy</span>
                                                        </>
                                                    )}
                                                </button>
                                            </div>

                                            <pre
                                                className="p-3 sm:p-4 overflow-x-auto text-zinc-700 dark:text-[#b5b7ba] m-0 bg-transparent 
                                                transition-colors scrollbar-thin"
                                            >
                                                <code>{inlineCode}</code>
                                            </pre>
                                        </div>
                                    </div>
                                ) : (
                                    <code
                                        className="bg-zinc-100 dark:bg-[#16161a] border border-zinc-200 dark:border-[#262629] text-zinc-800 
                                        dark:text-[#EDEEF0] text-xs px-1.5 py-0.5 rounded font-mono transition-colors break-all" {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {markdownText}
                    </ReactMarkdown>
                </div>
            ) : (
                <div className="space-y-4 text-left select-text overflow-hidden">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-[#888a8e] mb-1 font-mono select-none truncate">
                        <FileText size={14} className="shrink-0" />
                        <span className="truncate">{MOCK_METADATA.slug} (Raw Content Vector)</span>
                    </div>

                    <pre
                        className="bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-[#1c1c1f] rounded-xl p-4 sm:p-5 font-mono 
                        text-xs sm:text-[13px] text-zinc-700 dark:text-[#b5b7ba] whitespace-pre-wrap break-all leading-relaxed m-0 overflow-x-auto 
                        transition-colors duration-300"
                    >
                        <code>{markdownText}</code>
                    </pre>
                </div>
            )}
        </div>
    )
}