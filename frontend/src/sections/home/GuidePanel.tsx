// import hooks
import { useState, useEffect } from "react";

// metadata interface
export interface GuideMetadata {
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
    verifiedDate: "Jun 2026",
};

// import components
import GuidePanelHeader from "../../components/home/guide-panel/GuidePanelHeader";
import BreadCrumbs from "../../components/home/guide-panel/BreadCrumbs";
import ViewerPanel from "../../components/home/guide-panel/ViewerPanel";
import ActionBar from "../../components/home/guide-panel/ActionBar";

// guide panel
export default function GuidePanel() {
    const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");
    const [copiedText, setCopiedText] = useState<string | null>(null);
    const [upvoted, setUpvoted] = useState(false);
    const [upvoteCount, setUpvoteCount] = useState(MOCK_METADATA.upvotes);
    const [markdownText, setMarkdownText] = useState<string>("");

    // fetch markdown
    useEffect(() => {
        fetch("/guides/quick-start-vite.md")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch markdown file");
                return res.text();
            })
            .then((text) => {
                setMarkdownText(text);
            })
            .catch((err) => {
                console.error("Error loading blueprint template:", err);
                // Fallback default text if the file fails to fetch
                setMarkdownText("# Quickstart Guide\n\nFailed to load template content dynamically.");
            });
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
        <div
            className="w-full max-w-5xl mx-auto bg-white dark:bg-[#0c0c0e] border border-zinc-200 dark:border-[#212124] overflow-hidden 
            shadow-2xl text-zinc-900 dark:text-[#EDEEF0] font-sans my-12 rounded-xl transition-colors duration-300"
        >
            {/* Browser Window Header */}
            <GuidePanelHeader
                MOCK_METADATA={MOCK_METADATA}
                setViewMode={setViewMode}
                viewMode={viewMode}
            />

            {/* Breadcrumbs & Real-time Live Stats */}
            <BreadCrumbs
                MOCK_METADATA={MOCK_METADATA}
                upvoteCount={upvoteCount}
            />

            {/* Main Dynamic Viewer Panels */}
            <ViewerPanel
                MOCK_METADATA={MOCK_METADATA}
                copiedText={copiedText}
                handleCopy={handleCopy}
                markdownText={markdownText}
                viewMode={viewMode}
            />

            {/* Action Bar Footer */}
            <ActionBar
                MOCK_METADATA={MOCK_METADATA}
                handleUpvote={handleUpvote}
                upvoteCount={upvoteCount}
                upvoted={upvoted}
            />
        </div>
    );
}