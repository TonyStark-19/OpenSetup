// import hooks 
import { useState, useMemo, useEffect } from "react";

// import icons
import { Code, Terminal, Database, Cloud, Smartphone } from "lucide-react";

// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import components
import BrowseGuideHeader from "../sections/browse-guides/BrowseGuideHeader";
import GuidesGrid from "../sections/browse-guides/GuidesGrid";

// guides card interface
export interface GuideCardData {
    id: string;
    title: string;
    description: string;
    category: string;
    type: string;
    views: number;
    likes: number; // maps directly onto backend upvotes metric tracking keys
    status: string;
    icon: any;
    iconColor: string;
    iconBg: string;
    createdAt: string;
}

// backend url
const BACKEND_URL = "http://localhost:5000/api/guides";

// Helper map utility linking guide type values to design tokens
export const getIconConfig = (typeOfGuide: string) => {
    switch (typeOfGuide.toUpperCase()) {
        case "SCAFFOLD":
            return {
                icon: Code,
                iconColor: "text-purple-600 dark:text-purple-400",
                iconBg: "bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/40"
            };
        case "INTEGRATION":
            return {
                icon: Database,
                iconColor: "text-blue-600 dark:text-blue-400",
                iconBg: "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40"
            };
        case "CONFIG":
            return {
                icon: Cloud,
                iconColor: "text-sky-600 dark:text-sky-400",
                iconBg: "bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/40"
            };
        case "DOTFILES":
            return {
                icon: Terminal,
                iconColor: "text-amber-600 dark:text-amber-400",
                iconBg: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40"
            };
        default:
            return {
                icon: Smartphone,
                iconColor: "text-emerald-600 dark:text-emerald-400",
                iconBg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40"
            };
    }
};

// BrowseGuidesPage Component
export default function BrowseGuidesPage() {
    // Backend API State Trackers
    const [guides, setGuides] = useState<GuideCardData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Interactive State Engine Hooks
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"views" | "likes" | "newest">("views");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Static Category and Filter Rails matching layout constraints
    const categories = ["All", "Frontend", "Backend", "Mobile", "DevOps", "Config"];
    const typeFilters = ["SCAFFOLD", "INTEGRATION", "CONFIG", "DOTFILES"];

    // Fetch guides engine assembly interface
    useEffect(() => {
        const fetchAllGuides = async () => {
            try {
                const response = await fetch(BACKEND_URL);
                const resData = await response.json();

                if (response.ok && resData.success) {
                    // Map backend data attributes cleanly into local data model configuration metrics
                    const structuralData: GuideCardData[] = resData.data.map((guide: any) => {
                        const iconDesignStyle = getIconConfig(guide.typeOfGuide);
                        return {
                            id: guide._id,
                            title: guide.title,
                            description: guide.description,
                            category: guide.categoryOfGuide,
                            type: guide.typeOfGuide,
                            views: guide.views || 0,
                            likes: guide.upvotes || 0,
                            status: guide.status,
                            createdAt: guide.createdAt,
                            ...iconDesignStyle
                        };
                    });
                    setGuides(structuralData);
                }
            } catch (err) {
                console.error("Failed fetching configuration guides from api server workspace:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllGuides();
    }, []);

    // Multi-select type filter handler
    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    // Filter & Sort Pipeline
    const filteredGuides = useMemo(() => {
        return guides.filter(guide => {
            const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                guide.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || guide.category.toLowerCase() === selectedCategory.toLowerCase();
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(guide.type.toUpperCase());

            return matchesSearch && matchesCategory && matchesType;
        }).sort((a, b) => {
            if (sortBy === "views") return b.views - a.views;
            if (sortBy === "likes") return b.likes - a.likes;
            // Native ISO String sorting handling for newest configuration releases
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
    }, [guides, searchQuery, selectedCategory, selectedTypes, sortBy]);

    // Value formatter
    const formatCount = (num: number) => {
        return num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num.toString();
    };

    return (
        <>
            {/* navbar */}
            <Navbar />

            {/* main content */}
            <div
                className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white py-24 min-h-screen 
                flex flex-col items-center justify-start transition-colors duration-300"
            >
                <div className="w-full max-w-7xl px-4 md:px-8 flex flex-col items-start justify-start">
                    {/* header */}
                    <BrowseGuideHeader
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        categories={categories}
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        typeFilters={typeFilters}
                        selectedTypes={selectedTypes}
                        handleTypeToggle={handleTypeToggle}
                        setIsSortOpen={setIsSortOpen}
                        isSortOpen={isSortOpen}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />

                    {/* MAIN GUIDES CARDS GRID OR LOADING SYSTEM FEED */}
                    {isLoading ? (
                        <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                            Synchronizing open source environment catalog...
                        </div>
                    ) : (
                        <GuidesGrid
                            filteredGuides={filteredGuides}
                            formatCount={formatCount}
                        />
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}