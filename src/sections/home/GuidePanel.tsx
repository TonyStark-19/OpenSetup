import { useState } from "react";
import {
    Terminal,
    Check,
    Copy,
    Share2,
    ThumbsUp,
    Eye,
    Folder,
    ChevronRight,
    FileText
} from "lucide-react";

// Mock Data structure simulating DB & guide markdown content
const MOCK_GUIDE_DATA = {
    title: "Vite + React + TypeScript",
    slug: "vite-react-ts",
    description: "Minimal, fast setup for React apps with TypeScript using Vite as the build tool. Includes HMR, path aliases, and ESLint config out of the box.",
    category: "Frontend",
    tags: ["Vite", "React", "TypeScript", "Frontend"],
    status: "Active",
    views: "2.1k",
    upvotes: 184,
    contributor: "youname",
    verifiedDate: "Jun 2025",
    // Simulating markdown file segments or whole file raw string
    rawMarkdown: `# Vite + React + TypeScript\n\nMinimal, fast setup...\n\n## Prerequisites\n\`\`\`bash\nnode --version # v18 or higher\nnpm --version  # v9 or higher\n\`\`\``,
    steps: [
        {
            id: "prerequisites",
            title: "PREREQUISITES",
            lang: "bash",
            code: "node --version   # v18 or higher\nnpm --version    # v9 or higher"
        },
        {
            id: "scaffold",
            title: "SCAFFOLD THE PROJECT",
            lang: "bash",
            code: "npm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\nnpm run dev\n# -> Local:   http://localhost:5173/"
        },
        {
            id: "tailwind",
            title: "ADD TAILWIND CSS",
            lang: "bash",
            code: "npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p"
        },
        {
            id: "tailwind-config",
            title: "tailwind.config.js",
            lang: "javascript",
            code: `export default {\n  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`
        }
    ]
};

export default function GuidePanel() {
    const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [upvoted, setUpvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(MOCK_GUIDE_DATA.upvotes);

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleUpvote = () => {
        if (!upvoted) {
            setUpvoteCount(prev => prev + 1);
            setUpvoted(true);
        } else {
            setUpvoteCount(prev => prev - 1);
            setUpvoted(false);
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-[#0c0c0e] border border-[#212124] rounded-2xl overflow-hidden shadow-2xl text-[#EDEEF0] font-sans my-12">

            {/* 1. Browser-style Window Header Header */}
            <div className="bg-[#121215] border-b border-[#212124] px-4 py-3 flex items-center justify-between">
                {/* Window Dots */}
                <div className="flex items-center gap-1.5 w-1/4">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 block" />
                    <span className="w-3 h-3 rounded-full bg-[#eab308]/80 block" />
                    <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 block" />
                </div>

                {/* Fake URL Path Display */}
                <div className="bg-[#0a0a0c] border border-[#212124] rounded-lg px-3 py-1 text-xs text-[#888a8e] flex items-center gap-1.5 font-mono select-none">
                    <span className="text-[#525256]">opensetup.dev</span>
                    <span className="text-[#3a3a3e]">/</span>
                    <span>setups</span>
                    <span className="text-[#3a3a3e]">/</span>
                    <span className="text-[#EDEEF0]">{MOCK_GUIDE_DATA.slug}</span>
                </div>

                {/* Preview / Raw Toggle Group */}
                <div className="w-1/4 flex justify-end">
                    <div className="bg-[#0a0a0c] p-0.5 border border-[#212124] rounded-lg flex items-center">
                        <button
                            onClick={() => setViewMode("preview")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${viewMode === "preview" ? "bg-[#1c1c21] text-white border border-[#313135]" : "text-[#888a8e] hover:text-[#EDEEF0]"}`}
                        >
                            Preview
                        </button>
                        <button
                            onClick={() => setViewMode("raw")}
                            className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${viewMode === "raw" ? "bg-[#1c1c21] text-white border border-[#313135]" : "text-[#888a8e] hover:text-[#EDEEF0]"}`}
                        >
                            Raw
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Breadcrumbs & Real-time Live Stats */}
            <div className="px-6 md:px-8 pt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
                <div className="flex items-center gap-2 text-[#888a8e] font-medium">
                    <Folder size={14} className="text-[#525256]" />
                    <span className="hover:text-white cursor-pointer">Setups</span>
                    <ChevronRight size={12} className="text-[#3a3a3e]" />
                    <span className="hover:text-white cursor-pointer">{MOCK_GUIDE_DATA.category}</span>
                    <ChevronRight size={12} className="text-[#3a3a3e]" />
                    <span className="text-white font-semibold">{MOCK_GUIDE_DATA.title}</span>
                </div>

                <div className="flex items-center gap-4 text-[#888a8e] font-medium tracking-wide">
                    <div className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                        <span className="text-[#4ade80] font-semibold">{MOCK_GUIDE_DATA.status}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={13} className="text-[#525256]" />
                        <span>{MOCK_GUIDE_DATA.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ThumbsUp size={12} className="text-[#525256]" />
                        <span>{upvoteCount}</span>
                    </div>
                </div>
            </div>

            {/* 3. Main Dynamic Viewer Panels */}
            <div className="p-6 md:p-8">
                {viewMode === "preview" ? (
                    <>
                        {/* Title Segment */}
                        <div className="mb-6">
                            <h2 className="text-3xl font-bold tracking-tight text-white mb-3">{MOCK_GUIDE_DATA.title}</h2>
                            <p className="text-[#888a8e] text-[15px] leading-relaxed max-w-3xl">{MOCK_GUIDE_DATA.description}</p>
                        </div>

                        {/* Badges Stack */}
                        <div className="flex flex-wrap items-center gap-2 mb-10">
                            {MOCK_GUIDE_DATA.tags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className={`text-xs px-2.5 py-0.5 font-medium rounded-md border ${tag === "Frontend"
                                            ? "bg-[#14261d] text-[#4ade80] border-[#1f3d2f]"
                                            : "bg-[#121215] text-[#888a8e] border-[#212124]"
                                        }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Interactive Steps Section */}
                        <div className="space-y-8">
                            {MOCK_GUIDE_DATA.steps.map((step) => (
                                <div key={step.id} className="space-y-2.5">
                                    <h4 className="text-[11px] font-bold tracking-wider text-[#525256] uppercase font-mono">
                                        {step.title}
                                    </h4>

                                    {/* Terminal Snip Block */}
                                    <div className="bg-[#070708] border border-[#1c1c1f] rounded-xl overflow-hidden font-mono text-[13px] leading-relaxed">
                                        <div className="bg-[#0c0c0e] border-b border-[#1c1c1f] px-4 py-2 flex items-center justify-between text-[#525256] text-xs">
                                            <span>{step.lang}</span>
                                            <button
                                                onClick={() => handleCopy(step.code, step.id)}
                                                className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                                            >
                                                {copiedId === step.id ? (
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
                                        <pre className="p-4 overflow-x-auto text-[#b5b7ba] font-mono">
                                            <code>{step.code}</code>
                                        </pre>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    /* Raw Markdown String Output View */
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-[#888a8e] mb-1 font-mono">
                            <FileText size={14} />
                            <span>{MOCK_GUIDE_DATA.slug}.md (Raw Markdown View)</span>
                        </div>
                        <div className="bg-[#070708] border border-[#1c1c1f] rounded-xl p-5 font-mono text-[13px] text-[#b5b7ba] whitespace-pre-wrap leading-relaxed">
                            {MOCK_GUIDE_DATA.rawMarkdown}
                        </div>
                    </div>
                )}
            </div>

            {/* 4. Action Bar Panel Footer */}
            <div className="bg-[#121215]/50 border-t border-[#212124] px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-[#888a8e]">
                    <span className="w-5 h-5 rounded-full bg-[#1c1c21] border border-[#313135] flex items-center justify-center text-[10px] uppercase font-bold text-[#EDEEF0]">
                        {MOCK_GUIDE_DATA.contributor.slice(0, 2)}
                    </span>
                    <span>
                        Contributed by <span className="text-white font-medium hover:underline cursor-pointer">@{MOCK_GUIDE_DATA.contributor}</span>
                    </span>
                    <span className="text-[#3a3a3e]">·</span>
                    <span>Verified {MOCK_GUIDE_DATA.verifiedDate}</span>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    <button className="flex items-center gap-1.5 bg-[#121214] hover:bg-[#1c1c21] border border-[#212124] hover:border-[#313135] rounded-lg px-3 py-1.5 text-xs font-semibold text-[#b5b7ba] hover:text-white transition cursor-pointer">
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