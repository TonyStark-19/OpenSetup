// import icons
import { ArrowLeft } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// back to home button
export default function BackToHome() {
    return (
        <div className="absolute top-6 left-6 md:left-8 z-30">
            <Link
                to="/"
                className="flex flex-row items-center gap-2 text-[13px] font-medium text-zinc-500 dark:text-[#888a8e] 
                hover:text-zinc-900 dark:hover:text-[#EDEEF0] transition-colors duration-200 group"
            >
                <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200 ease-out" />
                Back to home
            </Link>
        </div>
    );
}