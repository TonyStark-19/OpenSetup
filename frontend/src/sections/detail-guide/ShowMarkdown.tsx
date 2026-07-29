// import rendering engine
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// import icons
import { Check, Copy, FileText } from "lucide-react";

// import type
import type { GuideMetadataProps } from "../../pages/GuideDetailPage";

// show markdown props
interface ShowMarkdown {
    viewMode: "preview" | "raw",
    handleCopy: (text: string, inlineId: string) => void,
    copiedText: string | null,
    markdownContent: string,
    guideData: GuideMetadataProps
}

// show markdown component
export default function ShowMarkdown({ viewMode, handleCopy, copiedText, markdownContent, guideData }: ShowMarkdown) {
    return (
        <div className="w-full animate-fade-in">
            {viewMode === "preview" ? (
                <div className="prose dark:prose-invert max-w-none text-left select-text">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            h1: ({ children }) => (
                                <h1
                                    className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 
                                    border-b border-zinc-200 dark:border-[#212124] pb-2 transition-colors"
                                >
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2
                                    className="text-xl font-bold tracking-tight text-zinc-800 dark:text-[#EDEEF0] mt-8 
                                    mb-3 flex items-center gap-2 transition-colors"
                                >
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-[#EDEEF0] mt-6 mb-2">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="text-zinc-600 dark:text-[#888a8e] text-[15px] leading-relaxed mb-4 transition-colors">
                                    {children}
                                </p>
                            ),

                            /* Bullet Points & Lists */
                            ul: ({ children }) => (
                                <ul
                                    className="list-disc list-inside text-zinc-600 dark:text-[#888a8e] text-[14px] 
                                    space-y-2 mb-6 pl-1 transition-colors"
                                >
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol
                                    className="list-decimal list-inside text-zinc-600 dark:text-[#888a8e] text-[14px] 
                                    space-y-2 mb-6 pl-1 transition-colors"
                                >
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="text-zinc-600 dark:text-[#888a8e] marker:text-zinc-400 dark:marker:text-[#525256]">
                                    <span className="text-zinc-700 dark:text-[#b5b7ba] transition-colors">
                                        {children}
                                    </span>
                                </li>
                            ),

                            /* Markdown Tables */
                            table: ({ children }) => (
                                <div className="my-6 w-full overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800/80">
                                    <table className="w-full text-left border-collapse text-xs font-mono">
                                        {children}
                                    </table>
                                </div>
                            ),
                            thead: ({ children }) => (
                                <thead
                                    className="bg-zinc-100 dark:bg-[#0c0c0e] border-b border-zinc-200 dark:border-zinc-800 
                                    text-zinc-700 dark:text-[#EDEEF0]"
                                >
                                    {children}
                                </thead>
                            ),
                            tbody: ({ children }) => (
                                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 bg-white/50 dark:bg-[#070708]/50">
                                    {children}
                                </tbody>
                            ),
                            tr: ({ children }) => (
                                <tr className="hover:bg-zinc-100/50 dark:hover:bg-[#121215] transition-colors">
                                    {children}
                                </tr>
                            ),
                            th: ({ children }) => (
                                <th className="px-4 py-3 font-semibold text-zinc-800 dark:text-[#EDEEF0]">
                                    {children}
                                </th>
                            ),
                            td: ({ children }) => (
                                <td className="px-4 py-3 text-zinc-600 dark:text-[#b5b7ba]">
                                    {children}
                                </td>
                            ),

                            hr: () => <hr className="border-zinc-200 dark:border-[#212124] my-6 transition-colors" />,

                            /* Code Blocks */
                            code({ className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                const inlineCode = String(children).replace(/\n$/, '');
                                const uniqueId = `code-${inlineCode.slice(0, 15).replace(/\s+/g, '-')}`;

                                return className ? (
                                    <div className="my-5 space-y-2 w-full font-mono">
                                        <div
                                            className="bg-zinc-100/80 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800/80 
                                            rounded-xl overflow-hidden text-[13px] leading-relaxed transition-colors duration-300"
                                        >
                                            <div
                                                className="bg-zinc-200/50 dark:bg-[#0c0c0e] border-b border-zinc-200 
                                                dark:border-zinc-800 px-4 py-2 flex items-center justify-between text-zinc-400 
                                                dark:text-[#525256] text-xs font-sans transition-colors duration-300"
                                            >
                                                <span className="font-medium text-zinc-500 dark:text-zinc-400">{match ? match[1] : "code"}</span>

                                                <button
                                                    onClick={() => handleCopy(inlineCode, uniqueId)}
                                                    className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 
                                                    hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer font-medium"
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

                                            <pre className="p-4 overflow-x-auto text-zinc-700 dark:text-[#b5b7ba] m-0 bg-transparent transition-colors">
                                                <code>{inlineCode}</code>
                                            </pre>
                                        </div>
                                    </div>
                                ) : (
                                    <code
                                        className="bg-zinc-100 dark:bg-[#16161a] border border-zinc-200 dark:border-[#262629] 
                                        text-zinc-800 dark:text-[#EDEEF0] text-xs px-1.5 py-0.5 rounded font-mono transition-colors"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {markdownContent}
                    </ReactMarkdown>
                </div>
            ) : (
                <div className="space-y-4 text-left select-text">
                    <div className="flex items-center gap-2 text-xs text-zinc-400 dark:text-[#888a8e] mb-1 font-mono select-none">
                        <FileText size={14} />
                        <span>{guideData.mdFileName} (Raw Content Vector)</span>
                    </div>

                    <pre
                        className="bg-zinc-100/80 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800/80 
                        rounded-xl p-5 font-mono text-[13px] text-zinc-700 dark:text-[#b5b7ba] whitespace-pre-wrap 
                        break-all leading-relaxed m-0 overflow-x-auto transition-colors duration-300"
                    >
                        <code>{markdownContent}</code>
                    </pre>
                </div>
            )}
        </div>
    )
}