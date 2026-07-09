// import icons 
import { FileText, Upload, Eye, CheckCircle2, LayoutDashboard } from "lucide-react";

// main steps props
export interface MainStepsProps {
    title: string,
    desc: string,
    icon: React.ReactNode
    bg: string
}

// main step data
const mainSteps: MainStepsProps[] = [
    {
        title: "Write it",
        desc: "Follow markdown format",
        icon: <FileText size={16} className="text-purple-500" />,
        bg: "bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-900/40"
    },
    {
        title: "Submit here",
        desc: "Fill workspace parameters",
        icon: <Upload size={16} className="text-blue-500" />,
        bg: "bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/40"
    },
    {
        title: "Admin queue",
        desc: "Request goes to admin panel",
        icon: <LayoutDashboard size={16} className="text-amber-500" />,
        bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/40"
    },
    {
        title: "Review",
        desc: "Admin check verification",
        icon: <Eye size={16} className="text-zinc-500" />,
        bg: "bg-zinc-100 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800"
    },
    {
        title: "Live",
        desc: "Guide deployed to production",
        icon: <CheckCircle2 size={16} className="text-emerald-500" />,
        bg: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/40"
    },
];

// import components
import DotGrid from "../../components/utils/DotGrid";
import ContributeHeroContent from "../../components/contribute/hero/ContributeHeroContent";
import ContributionSteps from "../../components/contribute/hero/ContributionSteps";
import ScrollBelow from "../../components/request/hero/ScrollBelow";

// contribute hero component
export default function ContributeHero() {

    return (
        <>
            {/* dot grid */}
            <DotGrid />

            <div className="w-full max-w-7xl flex flex-col items-center justify-center min-h-[90vh] text-center select-none px-4 pt-12 relative">
                {/* hero content */}
                <ContributeHeroContent />

                {/* Horizontal Step Flow Block */}
                <ContributionSteps mainSteps={mainSteps} />

                {/* scorll below */}
                <ScrollBelow />
            </div>
        </>
    );
}