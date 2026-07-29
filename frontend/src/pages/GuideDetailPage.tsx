// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { ArrowLeft } from "lucide-react";

// import routing
import { Link, useParams, useLocation } from "react-router-dom";

// import toast utilities
import toast, { Toaster } from "react-hot-toast";

// import layout components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import components
import GuideHeader from "../sections/detail-guide/GuideHeader";
import ViewToggle from "../sections/detail-guide/ViewToggle";
import ShowMarkdown from "../sections/detail-guide/ShowMarkdown";

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
    const [views, setViews] = useState<number>(guideData.views);
    const [hasUpvoted, setHasUpvoted] = useState<boolean>(false);

    // Prevent React 18 Strict Mode double-invocation during dev
    const hasIncrementedView = useRef(false);

    // Increment View Count on Mount / Guide ID Change
    useEffect(() => {
        if (!guideData.id || hasIncrementedView.current) return;
        hasIncrementedView.current = true;

        const recordView = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/guides/${guideData.id}/view`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" }
                });
                const resData = await response.json();

                if (response.ok && resData.success) {
                    setViews(resData.views);
                }
            } catch (err) {
                console.error("Failed to record view count increment:", err);
            }
        };

        recordView();
    }, [guideData.id]);

    // Check if the user has already upvoted this guide locally
    useEffect(() => {
        setUpvotes(guideData.upvotes);

        const upvotedGuides: string[] = JSON.parse(localStorage.getItem("upvotedGuides") || "[]");
        if (upvotedGuides.includes(guideData.id)) {
            setHasUpvoted(true);
        } else {
            setHasUpvoted(false);
        }
    }, [guideData.id, guideData.upvotes]);

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

        const upvotedGuides: string[] = JSON.parse(localStorage.getItem("upvotedGuides") || "[]");
        if (upvotedGuides.includes(guideData.id)) {
            setHasUpvoted(true);
            toast.error("You have already upvoted this guide.", toastConfig);
            return;
        }

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
                localStorage.setItem("upvotedGuides", JSON.stringify([...upvotedGuides, guideData.id]));
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
            {/* toast container */}
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

                    <div className="w-full bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 
                        dark:border-zinc-900 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl transition-all"
                    >
                        {/* Guide Meta Header Wrapper Block */}
                        <GuideHeader
                            guideData={guideData}
                            handleUpvote={handleUpvote}
                            hasUpvoted={hasUpvoted}
                            upvotes={upvotes}
                            views={views}
                        />

                        {/* View Mode Toggle Switch */}
                        <ViewToggle
                            setViewMode={setViewMode}
                            viewMode={viewMode}
                        />

                        {/* Content Render Framework Container Node */}
                        {isLoading ? (
                            <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                                Streaming markdown instructions documentation...
                            </div>
                        ) : (
                            <ShowMarkdown
                                copiedText={copiedText}
                                guideData={guideData}
                                handleCopy={handleCopy}
                                markdownContent={markdownContent}
                                viewMode={viewMode}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </>
    );
}