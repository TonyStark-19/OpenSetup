// import hooks
import { useState, useEffect } from "react";

// import icons
import { ArrowLeft, Eye, ThumbsUp, Calendar, Check, Copy, FileText, FileCode } from "lucide-react";

// import routing
import { Link, useParams, useLocation } from "react-router-dom";

// import rendering engine
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// import toast utilities
import toast, { Toaster } from "react-hot-toast";

// import layout components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Guide metadata interface directly matching MongoDB document structure
export interface GuideMetadataProps {
    _id?: string;
    id?: string;
    mdFileName?: string;
    title?: string;
    description?: string;
    contributedBy?: string;
    profileImage?: string;
    typeOfGuide?: string;
    categoryOfGuide?: string;
    upvotes?: number;
    views?: number;
    status?: string;
    createdAt?: string;
}

// final props
interface GuideDetailPageProps {
    data?: GuideMetadataProps;
}

// toast config
const toastConfig = {
    style: {
        background: document.documentElement.classList.contains("dark") ? "#161619" : "#ffffff",
        color: document.documentElement.classList.contains("dark") ? "#EDEEF0" : "#18181b",
        border: document.documentElement.classList.contains("dark") ? "1px solid #262629" : "1px solid #e4e4e7",
        fontSize: "13px",
        borderRadius: "12px",
        padding: "12px 16px",
    },
    success: { iconTheme: { primary: "#10B981", secondary: "#ffffff" } },
    error: { iconTheme: { primary: "#EF4444", secondary: "#ffffff" } },
};

// guide detail page
export default function GuideDetailPage({ data: propData }: GuideDetailPageProps) {
    // Read dynamic slug parameter from URL (/guides/:slug)
    const { slug } = useParams<{ slug: string }>();
    const location = useLocation();

    // Prioritize passed location state > props > defaults
    const locationData = location.state?.data as GuideMetadataProps | undefined;
    const activeData = locationData || propData;

    // Normalize guide metadata mapping
    const guideData = {
        id: activeData?._id || activeData?.id || "g1",
        mdFileName: slug || activeData?.mdFileName || "tailwind-css-js.md",
        title: activeData?.title || "Tailwind CSS v4 + Vanilla JS",
        description: activeData?.description || "Lightweight frontend layout integration linking Tailwind CSS utility framework.",
        typeOfGuide: activeData?.typeOfGuide || "INTEGRATION",
        categoryOfGuide: activeData?.categoryOfGuide || "Frontend",
        contributedBy: activeData?.contributedBy || "adityachandel",
        profileImage: activeData?.profileImage || "/other/Profile.png",
        upvotes: activeData?.upvotes ?? 0,
        views: activeData?.views ?? 0,
        createdAt: activeData?.createdAt
            ? new Date(activeData.createdAt).toISOString().split("T")[0]
            : "2026-07-16"
    };

    const [markdownContent, setMarkdownContent] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // UI Interaction States
    const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [upvotes, setUpvotes] = useState<number>(guideData.upvotes);
    const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);

    // Sync upvotes if route navigation state updates
    useEffect(() => {
        setUpvotes(guideData.upvotes);
    }, [guideData.upvotes]);

    // Fetch local markdown document asset from public/guides/ directory
    useEffect(() => {
        const loadMarkdownAsset = async () => {
            setIsLoading(true);
            try {
                // Ensure filename extension is present
                const targetFileName = guideData.mdFileName.endsWith(".md")
                    ? guideData.mdFileName
                    : `${guideData.mdFileName}.md`;

                const response = await fetch(`/guides/${targetFileName}`);

                if (!response.ok) {
                    throw new Error("Target markdown file context could not be read.");
                }
                const text = await response.text();
                setMarkdownContent(text);
            } catch (err) {
                console.error("Error streaming local markdown file payload asset:", err);
                setMarkdownContent("# Document Not Found\nFailed to load requested guide content.");
            } finally {
                setIsLoading(false);
            }
        };

        loadMarkdownAsset();
    }, [guideData.mdFileName]);

    // Handle code block copying
    const handleCopy = (text: string, inlineId: string) => {
        navigator.clipboard.writeText(text);
        setCopiedText(inlineId);
        setTimeout(() => setCopiedText(null), 2000);
    };

    // Live backend upvote handler targeting PATCH /api/guides/:id/upvote
    const handleUpvote = async () => {
        if (hasUpvoted) return;

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Please log in to upvote guides.", toastConfig);
            return;
        }

        // Optimistic UI bump
        setUpvotes(prev => prev + 1);
        setHasUpvoted(true);

        try {
            const response = await fetch(`http://localhost:5000/api/guides/${guideData.id}/upvote`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            const resData = await response.json();

            if (!response.ok || !resData.success) {
                // Revert optimistic state on server error
                setUpvotes(prev => prev - 1);
                setHasUpvoted(false);
                toast.error(resData.message || "Upvote transaction failed.", toastConfig);
            } else {
                setUpvotes(resData.upvotes);
                toast.success("Upvoted successfully!", toastConfig);
            }
        } catch (err) {
            setUpvotes(prev => prev - 1);
            setHasUpvoted(false);
            toast.error("Network error submitting upvote request.", toastConfig);
        }
    };

    return (
        <>
            {/* toaster container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* navbar */}
            <Navbar />

            <div className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white min-h-screen pb-24 pt-28 transition-colors duration-300">
                <div className="w-full max-w-6xl mx-auto px-4 md:px-8">
                    {/* Back Button Action Link */}
                    <Link
                        to="/guides"
                        className="inline-flex items-center gap-2 text-xs font-mono font-semibold tracking-wide text-zinc-400 
                        hover:text-zinc-900 dark:hover:text-white mb-6 transition-colors group select-none"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> BACK TO BROWSE
                    </Link>

                    {/* MAIN BORDERED GUIDE CONTAINER CARD */}
                    <div
                        className="w-full bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 
                        dark:border-zinc-900 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl transition-all"
                    >
                        {/* Guide Meta Header Wrapper Block */}
                        <div className="border-b border-zinc-200 dark:border-zinc-800/80 pb-8 mb-8">
                            <div className="flex flex-wrap items-center gap-2.5 mb-4 select-none">
                                <span
                                    className="text-[10px] font-mono font-bold tracking-widest uppercase bg-purple-50 
                                    dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 
                                    dark:border-purple-900/40 px-2.5 py-1 rounded-md"
                                >
                                    {guideData.categoryOfGuide}
                                </span>

                                <span
                                    className="text-[10px] font-mono font-bold tracking-widest uppercase bg-zinc-100 dark:bg-zinc-900 
                                    text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2.5 py-1
                                    rounded-md flex items-center gap-1"
                                >
                                    <FileCode size={10} /> {guideData.typeOfGuide}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-zinc-900 dark:text-[#EDEEF0]">
                                {guideData.title}
                            </h1>

                            <p className="text-base text-zinc-500 dark:text-[#888a8e] mb-6 leading-relaxed max-w-3xl">
                                {guideData.description}
                            </p>

                            {/* Author & Metrics Toolbar Panel */}
                            <div
                                className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-dashed 
                                border-zinc-200 dark:border-zinc-800/60 text-xs font-mono text-zinc-500 dark:text-zinc-400"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={guideData.profileImage}
                                            alt="Contributor avatar"
                                            className="w-5 h-5 rounded-full object-cover border border-zinc-200 dark:border-zinc-800"
                                        />

                                        <span className="text-zinc-700 dark:text-zinc-300 font-medium">{guideData.contributedBy}</span>
                                    </div>

                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={13} />
                                        <span>{guideData.createdAt}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-1.5">
                                        <Eye size={13} /> <span>{guideData.views} views</span>
                                    </div>

                                    <button
                                        onClick={handleUpvote}
                                        disabled={hasUpvoted}
                                        className={`flex items-center gap-1.5 transition-all cursor-pointer px-3 py-1.5 rounded-lg border active:scale-[0.98] 
                                            ${hasUpvoted
                                                ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-900/40 cursor-default'
                                                : 'bg-white dark:bg-[#121214] text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                                            }`}
                                    >
                                        <ThumbsUp size={13} className={hasUpvoted ? 'fill-current' : ''} />
                                        <span className="font-medium">{upvotes} upvotes</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* View Mode Toggle Switch */}
                        <div
                            className="flex items-center bg-zinc-200/60 dark:bg-[#121214] p-1 rounded-xl border border-zinc-200 
                            dark:border-zinc-800/80 w-max mb-6 select-none"
                        >
                            <button
                                onClick={() => setViewMode("preview")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer
                                    ${viewMode === "preview"
                                        ? "bg-white dark:bg-[#262629] text-zinc-900 dark:text-white shadow-sm"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                    }`}
                            >
                                Preview
                            </button>

                            <button
                                onClick={() => setViewMode("raw")}
                                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer
                                    ${viewMode === "raw"
                                        ? "bg-white dark:bg-[#262629] text-zinc-900 dark:text-white shadow-sm"
                                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                                    }`}
                            >
                                Raw
                            </button>
                        </div>

                        {/* Content Render Framework Container Node */}
                        {isLoading ? (
                            <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                                Streaming markdown instructions documentation...
                            </div>
                        ) : (
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

                                                                <pre
                                                                    className="p-4 overflow-x-auto text-zinc-700 dark:text-[#b5b7ba] m-0 
                                                                    bg-transparent transition-colors"
                                                                >
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
                        )}
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </>
    );
}