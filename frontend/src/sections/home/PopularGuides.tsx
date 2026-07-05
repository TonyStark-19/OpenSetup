// import icons
import { Code, Terminal, Database, Cloud, Smartphone } from "lucide-react";

// import type
import type { IconType } from "react-icons/lib";

// popular guides grid props
export interface PopularGuidesGridProps {
    id: string | number;
    category: string;
    title: string;
    description: string;
    type: "SCAFFOLD" | "INTEGRATION" | "CONFIG" | "DOTFILES";
    views: number | string;
    likes: number | string;
    status: "VERIFIED" | "PENDING";
    icon: IconType;
    iconColor: string;
    iconBg: string;
}

// guides data
const GUIDES_DATA: PopularGuidesGridProps[] = [
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
import PopularGuidesHeader from "../../components/home/popular-guides/PopularGuidesHeader";
import PopularGuidesGrid from "../../components/home/popular-guides/PopularGuidesGrid";

// popular guides component
export default function PopularGuides() {
    return (
        <div
            className="relative flex flex-col justify-center items-center py-24 bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-zinc-900
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