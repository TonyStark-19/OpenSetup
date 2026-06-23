// import hooks
import { useState, useEffect } from "react";

// import react markdown
import ReactMarkdown from "react-markdown";

// import icons
import { Check, Copy, Share2, ThumbsUp, Eye, Folder, ChevronRight, FileText } from "lucide-react";

// Read the markdown file natively as a raw text string
import rawMarkdownContent from "../../guides/quick-start-vite.md?raw";

// metadata interface
interface GuideMetadata {
    title: string;
    slug: string;
    category: string;
    tags: string[];
    status: string;
    views: string;
    upvotes: number;
    contributor: string;
    avatarUrl?: string;
    verifiedDate: string;
}

// mock data
const MOCK_METADATA: GuideMetadata = {
    title: "Vite + React + TypeScript",
    slug: "quick-start-vite.md",
    category: "Frontend",
    tags: ["Vite", "React", "TypeScript", "Frontend"],
    status: "Active",
    views: "2.1k",
    upvotes: 184,
    contributor: "Aditya chandel",
    avatarUrl: "/other/Profile.png",
    verifiedDate: "Jun 2025",
};

// guide panel
export default function GuidePanel() {
    const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [upvoted, setUpvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(MOCK_METADATA.upvotes);
    const [markdownText, setMarkdownText] = useState<string>("");

    useEffect(() => {
        setMarkdownText(rawMarkdownContent);
    }, []);

    // handle copy
    const handleCopy = (text: string, inlineId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(inlineId);
        setTimeout(() => setCopiedText(null), 2000);
    };

    // handle upvote
    const handleUpvote = () => {
        setUpvoteCount(prev => upvoted ? prev - 1 : prev + 1);
        setUpvoted(!upvoted);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0c0c0e] border border-[#212124] overflow-hidden shadow-2xl text-[#EDEEF0] font-sans my-12">
            {/* Browser Window Header */}
            <div className="bg-[#121215] border-b border-[#212124] px-4 py-3 flex items-center justify-between select-none">
                {/* Window Controls */}
                <div className="flex items-center gap-1.5 w-1/4">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 block" />
                    <span className="w-3 h-3 rounded-full bg-[#eab308]/80 block" />
                    <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 block" />
                </div>

                {/* Fake URL Path Display */}
                <div
                    className="bg-[#0a0a0c] border border-[#212124] rounded-lg px-3 py-1 text-xs text-[#888a8e] flex items-center 
                    gap-1.5 font-mono0 drop-shadow-sm"
                >
                    <span className="text-[#525256]">opensetup.dev</span>
                    <span className="text-[#3a3a3e]">/</span>
                    <span>setups</span>
                    <span className="text-[#3a3a3e]">/</span>
                    <span className="text-[#EDEEF0]">{MOCK_METADATA.slug}</span>
                </div>

                {/* Preview / Raw Toggle Group */}
                <div className="w-1/4 flex justify-end">
                    <div className="bg-[#0a0a0c] p-1 border border-[#212124] rounded-lg flex items-center relative w-35 h-7.5">
                        <div
                            className={`absolute top-1 bottom-1 left-1 w-16 bg-[#1c1c21] border border-[#313135] rounded-md 
                                transition-transform duration-200 ease-out transform 
                                ${viewMode === "raw"
                                    ? "translate-x-16" : "translate-x-0"
                                }`}
                        />

                        <button
                            onClick={() => setViewMode("preview")}
                            className={`relative z-10 w-1/2 text-center text-xs font-medium transition-colors duration-150 cursor-pointer 
                                ${viewMode === "preview"
                                    ? "text-white" : "text-[#888a8e] hover:text-[#EDEEF0]"
                                }`}
                        >
                            Preview
                        </button>

                        <button
                            onClick={() => setViewMode("raw")}
                            className={`relative z-10 w-1/2 text-center text-xs font-medium transition-colors duration-150 cursor-pointer 
                                ${viewMode === "raw"
                                    ? "text-white" : "text-[#888a8e] hover:text-[#EDEEF0]"
                                }`}
                        >
                            Raw
                        </button>
                    </div>
                </div>
            </div>

            {/* Breadcrumbs & Real-time Live Stats */}
            <div className="px-6 md:px-8 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs select-none">
                <div className="flex items-center gap-2 text-[#888a8e] font-medium">
                    <Folder size={14} className="text-[#525256]" />
                    <span className="hover:text-white cursor-pointer">Setups</span>
                    <ChevronRight size={12} className="text-[#3a3a3e]" />
                    <span className="hover:text-white cursor-pointer">{MOCK_METADATA.category}</span>
                    <ChevronRight size={12} className="text-[#3a3a3e]" />
                    <span className="text-white font-semibold">{MOCK_METADATA.title}</span>
                </div>

                <div className="flex items-center gap-4 text-[#888a8e] font-medium tracking-wide">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                        <span className="text-[#4ade80] font-semibold">{MOCK_METADATA.status}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <Eye size={13} className="text-[#525256]" />
                        <span>{MOCK_METADATA.views}</span>
                    </div>

                    <div className="flex items-center gap-1">
                        <ThumbsUp size={12} className="text-[#525256]" />
                        <span>{upvoteCount}</span>
                    </div>
                </div>
            </div>

            {/* Main Dynamic Viewer Panels */}
            <div className="p-6 md:p-8">
                {viewMode === "preview" ? (
                    <div className="prose prose-invert max-w-none text-left select-text">
                        <ReactMarkdown
                            components={{
                                h1: ({ children }) => <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4 border-b border-[#212124] pb-2">{children}</h1>,
                                h2: ({ children }) => <h2 className="text-xl font-bold tracking-tight text-[#EDEEF0] mt-8 mb-3 flex items-center gap-2">{children}</h2>,
                                p: ({ children }) => <p className="text-[#888a8e] text-[15px] leading-relaxed mb-4">{children}</p>,
                                ol: ({ children }) => <ol className="list-decimal list-inside text-[#888a8e] text-[14px] space-y-2 mb-4 pl-1">{children}</ol>,
                                li: ({ children }) => <li className="text-[#888a8e] marker:text-[#525256]"><span className="text-[#b5b7ba]">{children}</span></li>,
                                hr: () => <hr className="border-[#212124] my-6" />,

                                code({ className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    const inlineCode = String(children).replace(/\n$/, '');
                                    const uniqueId = `code-${inlineCode.slice(0, 15).replace(/\s+/g, '-')}`;

                                    return className ? (
                                        <div className="my-5 space-y-2 w-full">
                                            <div className="bg-[#070708] border border-[#1c1c1f] rounded-xl overflow-hidden font-mono text-[13px] leading-relaxed">
                                                <div
                                                    className="bg-[#0c0c0e] border-b border-[#1c1c1f] px-4 py-2 flex items-center justify-between 
                                                    text-[#525256] text-xs font-sans"
                                                >
                                                    <span>{match ? match[1] : "code"}</span>
                                                    <button
                                                        onClick={() => handleCopy(inlineCode, uniqueId)}
                                                        className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer font-medium"
                                                    >
                                                        {copiedText === uniqueId ? (
                                                            <>
                                                                <Check size={13} className="text-[#4ade80]" />
                                                                <span className="text-[#4ade80]">Copied!</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Copy size={13} />
                                                                <span>Copy</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </div>

                                                <pre className="p-4 overflow-x-auto text-[#b5b7ba] font-mono m-0 bg-transparent">
                                                    <code>{inlineCode}</code>
                                                </pre>
                                            </div>
                                        </div>
                                    ) : (
                                        <code className="bg-[#16161a] border border-[#262629] text-[#EDEEF0] text-xs px-1.5 py-0.5 rounded font-mono" {...props}>
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
                    <div className="space-y-4 text-left select-text">
                        <div className="flex items-center gap-2 text-xs text-[#888a8e] mb-1 font-mono select-none">
                            <FileText size={14} />
                            <span>{MOCK_METADATA.slug}.md (Raw Markdown View)</span>
                        </div>

                        <pre
                            className="bg-[#070708] border border-[#1c1c1f] rounded-xl p-5 font-mono text-[13px] text-[#b5b7ba] 
                            whitespace-pre-wrap break-all leading-relaxed m-0 overflow-x-auto"
                        >
                            <code>{markdownText}</code>
                        </pre>
                    </div>
                )}
            </div>

            {/* Action Bar Footer */}
            <div className="bg-[#121215]/50 border-t border-[#212124] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 select-none">
                <div className="flex items-center gap-2.5 text-xs text-[#888a8e]">
                    <div className="w-5 h-5 rounded-full bg-[#1c1c21] border border-[#313135] overflow-hidden flex items-center justify-center shrink-0">
                        {MOCK_METADATA.avatarUrl ? (
                            <img
                                src={MOCK_METADATA.avatarUrl}
                                alt={MOCK_METADATA.contributor}
                                className="w-full h-full object-cover antialiased"
                                onError={(e) => {
                                    // Fallback text if user image breaks
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        ) : (
                            <span className="text-[9px] uppercase font-bold text-[#EDEEF0]">
                                {MOCK_METADATA.contributor.slice(0, 2)}
                            </span>
                        )}
                    </div>

                    <span>
                        Contributed by <span className="text-white font-medium hover:underline cursor-pointer">@{MOCK_METADATA.contributor}</span>
                    </span>

                    <span className="text-[#3a3a3e]">·</span>
                    <span>Verified {MOCK_METADATA.verifiedDate}</span>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    <button
                        className="flex items-center gap-1.5 bg-[#121214] hover:bg-[#1c1c21] border border-[#212124] 
                            hover:border-[#313135] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#b5b7ba] hover:text-white transition cursor-pointer"
                    >
                        <Share2 size={13} />
                        Share
                    </button>

                    <button
                        onClick={handleUpvote}
                        className={`flex items-center gap-1.5 border rounded-lg px-3 py-1.5 text-xs font-semibold transition cursor-pointer ${upvoted
                            ? "bg-[#14261d] text-[#4ade80] border-[#1f3d2f]"
                            : "bg-[#1c1c21] hover:bg-[#25252b] text-white border-[#313135]"
                            }`}
                    >
                        <ThumbsUp size={13} className={upvoted ? "fill-[#4ade80]" : ""} />
                        <span>Upvote · {upvoteCount}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}