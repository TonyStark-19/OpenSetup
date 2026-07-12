// import icons
import { ChevronDown } from "lucide-react";

// scroll below indicator
export default function ScrollBelow() {
    // handle scroll
    const handleScroll = () => {
        window.scrollTo({
            top: window.innerHeight * 0.85,
            behavior: "smooth"
        });
    };

    return (
        <button
            type="button"
            onClick={handleScroll}
            aria-label="Scroll to next section"
            className="flex items-center justify-center p-2.5 rounded-full border border-zinc-200 dark:border-zinc-900 
            bg-zinc-50/50 dark:bg-[#0c0c0e]/50 backdrop-blur-sm text-zinc-400 dark:text-zinc-600 hover:text-zinc-900 
            dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-800 transition-all duration-200 
            animate-bounce cursor-pointer shadow-sm active:scale-[0.97]"
        >
            <ChevronDown size={16} />
        </button>
    );
}