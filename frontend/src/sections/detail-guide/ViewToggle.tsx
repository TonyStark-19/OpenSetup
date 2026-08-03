// view toggle props
interface ViewToggleProps {
    viewMode: "preview" | "raw";
    setViewMode: React.Dispatch<React.SetStateAction<"preview" | "raw">>;
}

// view toggle component
export default function ViewToggle({ setViewMode, viewMode }: ViewToggleProps) {
    return (
        <div
            className="flex items-center bg-zinc-200/60 dark:bg-[#121214] p-1 rounded-xl border border-zinc-200 
            dark:border-zinc-800/80 w-max mb-6 select-none"
        >
            <button
                onClick={() => setViewMode("preview")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer
                    ${viewMode === "preview"
                        ? "bg-white dark:bg-[#262629] text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
            >
                Preview
            </button>

            <button
                onClick={() => setViewMode("raw")}
                className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer
                    ${viewMode === "raw"
                        ? "bg-white dark:bg-[#262629] text-zinc-900 dark:text-white shadow-sm"
                        : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300"
                    }`}
            >
                Raw
            </button>
        </div>
    )
}