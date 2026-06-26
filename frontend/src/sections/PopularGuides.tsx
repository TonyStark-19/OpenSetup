// import icons
import { FaBolt, FaDatabase, FaCompass, FaDocker, FaShieldHalved } from "react-icons/fa6";

// guides data
const GUIDES_DATA = [
    {
        id: 1,
        category: "Frontend · Scaffold",
        title: "Vite + React + TypeScript",
        description: "Production-ready React app with TS and HMR.",
        icon: FaBolt,
        iconColor: "text-purple-400",
        iconBg: "bg-purple-950/50 border border-purple-800/50",
        views: "2.4k",
        likes: "184",
    },
    {
        id: 2,
        category: "Backend · Integration",
        title: "Node.js + PostgreSQL",
        description: "Optimized connection pooling and raw SQL utilities.",
        icon: FaDatabase,
        iconColor: "text-blue-400",
        iconBg: "bg-blue-950/50 border border-blue-800/50",
        views: "5.1k",
        likes: "422",
    },
    {
        id: 3,
        category: "Fullstack · Edge",
        title: "Next.js + Tailwind v4",
        description: "Cutting-edge setup with app router and Oxide engine.",
        icon: FaCompass,
        iconColor: "text-emerald-400",
        iconBg: "bg-emerald-950/50 border border-emerald-800/50",
        views: "12k",
        likes: "891",
    },
    {
        id: 4,
        category: "Devops · Cache",
        title: "Docker + Redis",
        description: "Multi-stage build for distributed session management.",
        icon: FaDocker,
        iconColor: "text-sky-400",
        iconBg: "bg-sky-950/50 border border-sky-800/50",
        views: "1.8k",
        likes: "92",
    },
    {
        id: 5,
        category: "Auth · Serverless",
        title: "Supabase + NextAuth",
        description: "Secure JWT handling, RBAC tables, and multi-provider OAuth.",
        icon: FaShieldHalved,
        iconColor: "text-amber-400",
        iconBg: "bg-amber-950/50 border border-amber-800/50",
        views: "7.3k",
        likes: "516",
    },
];

// import components
import PopularGuidesHeader from "../components/popular-guides/PopularGuidesHeader";
import PopularGuidesGrid from "../components/popular-guides/PopularGuidesGrid";

// popular guides component
export default function PopularGuides() {
    return (
        <div
            className="relative flex flex-col justify-center items-center py-24 bg-white dark:bg-[#0a0a0a] 
            overflow-hidden px-6 md:px-16 lg:px-24 w-full transition-colors duration-300"
        >
            <div className="w-full max-w-7xl flex flex-col gap-12">
                {/* Header Section */}
                <PopularGuidesHeader />

                {/* Grid System */}
                <PopularGuidesGrid GUIDES_DATA={GUIDES_DATA} />
            </div>
        </div>
    );
}