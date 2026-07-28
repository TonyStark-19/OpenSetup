// import hooks
import { useEffect, useState } from "react";

// import components
import PopularGuidesHeader from "../../components/home/popular-guides/PopularGuidesHeader";
import PopularGuidesGrid from "../../components/home/popular-guides/PopularGuidesGrid";
import { getIconConfig } from "../../pages/BrowseGuidesPage";

// Popular Guides Interface matching backend schemas structure mapping
export interface PopularGuidesGridProps {
    id: string;
    category: string;
    title: string;
    description: string;
    type: "SCAFFOLD" | "INTEGRATION" | "CONFIG" | "DOTFILES";
    views: number;
    likes: number;
    status: string;
    icon: any;
    iconColor: string;
    iconBg: string;
    createdAt: string;
    mdFileName: string;
    contributedBy: string;
    profileImage: string;
}

// backend url
const BACKEND_URL = "http://localhost:5000/api/guides/top";

// popular guides
export default function PopularGuides() {
    const [popularGuides, setPopularGuides] = useState<PopularGuidesGridProps[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch the top 5 most popular configuration guides on component mount
    useEffect(() => {
        const fetchTopGuides = async () => {
            try {
                const response = await fetch(BACKEND_URL);
                const resData = await response.json();

                if (response.ok && resData.success) {
                    const mappedGuides: PopularGuidesGridProps[] = resData.data.map((guide: any) => {
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
                            mdFileName: guide.mdFileName || `${guide._id}.md`,
                            contributedBy: guide.contributedBy || "adityachandel",
                            profileImage: guide.profileImage || "/other/Profile.png",
                            ...iconDesignStyle
                        };
                    });
                    setPopularGuides(mappedGuides);
                }
            } catch (err) {
                console.error("Failed synchronizing data payload metrics from top guides API endpoint:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTopGuides();
    }, []);

    return (
        <div
            className="relative flex flex-col justify-center items-center py-24 bg-white dark:bg-[#0a0a0a] border-t border-zinc-200 dark:border-zinc-900
            overflow-hidden px-6 md:px-16 lg:px-24 w-full transition-colors duration-300"
        >
            <div className="w-full max-w-7xl flex flex-col gap-12">
                {/* Header Section */}
                <PopularGuidesHeader />

                {/* Loading State or Grid System Rendering Node */}
                {isLoading ? (
                    <div className="w-full text-center py-10 font-mono text-zinc-400 text-xs tracking-wide select-none">
                        Sorting configuration metrics logs...
                    </div>
                ) : (
                    <PopularGuidesGrid GUIDES_DATA={popularGuides} />
                )}
            </div>
        </div>
    );
}