// import hooks 
import { useState, useMemo } from "react";

// import icons
import { Code, Terminal, Database, Cloud, Smartphone } from "lucide-react";

// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Guide Schema Interface
export interface GuideCardData {
    id: string;
    title: string;
    description: string;
    category: "Frontend" | "Backend" | "Mobile" | "DevOps" | "Config";
    type: "SCAFFOLD" | "INTEGRATION" | "CONFIG" | "DOTFILES";
    views: number;
    likes: number;
    status: "VERIFIED" | "PENDING";
    icon: any;
    iconColor: string;
    iconBg: string;
}

// Data matching image_4644fd.png structural components
const GUIDES_DATABASE: GuideCardData[] = [
    {
        id: "g1",
        title: "Vite + React + TS",
        description: "Optimized production-ready scaffold with Tailwind CSS, ESLint, and Prettier pre-configured.",
        category: "Frontend",
        type: "SCAFFOLD",
        views: 1200,
        likes: 428,
        status: "VERIFIED",
        icon: Code,
        iconColor: "text-purple-600 dark:text-purple-400",
        iconBg: "bg-purple-50 dark:bg-purple-950/30 border-purple-100 dark:border-purple-900/40"
    },
    {
        id: "g2",
        title: "Zsh + OhMyZsh",
        description: "Ultra-fast shell setup featuring Powerlevel10k theme and essential developer aliases.",
        category: "Config",
        type: "DOTFILES",
        views: 3500,
        likes: 892,
        status: "VERIFIED",
        icon: Terminal,
        iconColor: "text-amber-600 dark:text-amber-400",
        iconBg: "bg-amber-50 dark:bg-amber-950/30 border-amber-100 dark:border-amber-900/40"
    },
    {
        id: "g3",
        title: "Node + PostgreSQL",
        description: "Dockerized backend setup with Prisma ORM and automated database migrations.",
        category: "Backend",
        type: "INTEGRATION",
        views: 920,
        likes: 156,
        status: "PENDING",
        icon: Database,
        iconColor: "text-blue-600 dark:text-blue-400",
        iconBg: "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900/40"
    },
    {
        id: "g4",
        title: "Terraform AWS Base",
        description: "Baseline Infrastructure as Code for VPC, S3, and RDS setups on Amazon Web Services.",
        category: "DevOps",
        type: "CONFIG",
        views: 2100,
        likes: 340,
        status: "VERIFIED",
        icon: Cloud,
        iconColor: "text-sky-600 dark:text-sky-400",
        iconBg: "bg-sky-50 dark:bg-sky-950/30 border-sky-100 dark:border-sky-900/40"
    },
    {
        id: "g5",
        title: "React Native + Expo",
        description: "Modern mobile dev starter with TypeScript, Navigation, and native module templates.",
        category: "Mobile",
        type: "SCAFFOLD",
        views: 850,
        likes: 194,
        status: "PENDING",
        icon: Smartphone,
        iconColor: "text-emerald-600 dark:text-emerald-400",
        iconBg: "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-100 dark:border-emerald-900/40"
    }
];

// import components
import BrowseGuideHeader from "../components/browse-guides/BrowseGuideHeader";
import GuidesGrid from "../components/browse-guides/GuidesGrid";

// BrowseGuidesPage Component
export default function BrowseGuidesPage() {
    // Interactive State Engine Hooks
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<"views" | "likes" | "newest">("views");
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Static Category and Filter Rails matching layout constraints
    const categories = ["All", "Frontend", "Backend", "Mobile", "DevOps", "Config"];
    const typeFilters = ["SCAFFOLD", "INTEGRATION", "CONFIG", "DOTFILES"];

    // Multi-select type filter handler
    const handleTypeToggle = (type: string) => {
        setSelectedTypes(prev =>
            prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
        );
    };

    // Filter & Sort Pipeline
    const filteredGuides = useMemo(() => {
        return GUIDES_DATABASE.filter(guide => {
            const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                guide.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || guide.category === selectedCategory;
            const matchesType = selectedTypes.length === 0 || selectedTypes.includes(guide.type);

            return matchesSearch && matchesCategory && matchesType;
        }).sort((a, b) => {
            if (sortBy === "views") return b.views - a.views;
            if (sortBy === "likes") return b.likes - a.likes;
            return b.id.localeCompare(a.id); // Fallback mock newest structure
        });
    }, [searchQuery, selectedCategory, selectedTypes, sortBy]);

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

                    {/* MAIN GUIDES TEMPLATE CARDS GRID SYSTEM */}
                    <GuidesGrid
                        filteredGuides={filteredGuides}
                        formatCount={formatCount}
                    />
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}