// request item interface
export interface RequestItem {
    id: string;
    title: string;
    tags: string[];
    status: "Open" | "In progress" | "Rejected" | "Pending";
}

// Data mirroring tickers
const TICKER_ROW_1: RequestItem[] = [
    { id: "t1", title: "Zustand state management", tags: ["React", "TypeScript"], status: "In progress" },
    { id: "t2", title: "Docker + Node.js production", tags: ["Docker", "Node.js"], status: "Open" },
    { id: "t3", title: "tRPC + Next.js setup", tags: ["Next.js", "TypeScript"], status: "Open" },
    { id: "t4", title: "Redis caching layer", tags: ["Redis", "Backend"], status: "Open" },
];

const TICKER_ROW_2: RequestItem[] = [
    { id: "t5", title: "RTK Query + Axios setup", tags: ["React", "Axios"], status: "Rejected" },
    { id: "t6", title: "Socket.io + Express rooms", tags: ["Socket.io", "Express"], status: "Open" },
    { id: "t7", title: "GitHub Actions CI/CD", tags: ["GitHub", "Docker"], status: "Pending" },
    { id: "t8", title: "GraphQL + Apollo Client", tags: ["GraphQL", "React"], status: "Open" },
];

// import components
import RequestHeroHeader from "../../components/request/hero/RequestHeroHeader";
import ScrollingRequests from "../../components/request/hero/ScrollingRequests";
import ScrollBelow from "../../components/request/hero/ScrollBelow";
import DotGrid from "../../components/utils/DotGrid";

// Dynamic Status Color Utilities
export const getStatusStyles = (status: RequestItem["status"]) => {
    switch (status) {
        case "In progress":
            return "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900/50";
        case "Rejected":
            return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50";
        case "Pending":
            return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900/50";
        default:
            return "text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900/60 border-zinc-200 dark:border-zinc-800";
    }
};

// reuqest page hero section component
export default function RequestsHero() {
    return (
        <div
            className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white py-20 sm:py-24 md:py-28 min-h-screen 
            flex flex-col items-center justify-center sm:justify-start transition-colors duration-300 px-4 sm:px-6 overflow-hidden"
        >
            {/* Dot Grid Layer */}
            <DotGrid />

            {/* HEADER SECTION */}
            <RequestHeroHeader />

            {/* INFINITE SCROLLING TICKERS ROW */}
            <ScrollingRequests
                TICKER_ROW_1={TICKER_ROW_1}
                TICKER_ROW_2={TICKER_ROW_2}
                getStatusStyles={getStatusStyles}
            />

            {/* ANIMATED SCROLL BELOW INDICATOR */}
            <ScrollBelow />
        </div>
    )
}