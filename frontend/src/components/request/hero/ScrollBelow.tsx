// import icons
import { ChevronDown } from "lucide-react"

// scroll below indicator
export default function ScrollBelow() {
    return (
        <div className="flex flex-col items-center justify-center gap-1 mb-12 animate-bounce select-none pointer-events-none">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-600 font-bold">
                Scroll below
            </span>

            <ChevronDown size={14} className="text-zinc-400 dark:text-zinc-600" />
        </div>
    )
}