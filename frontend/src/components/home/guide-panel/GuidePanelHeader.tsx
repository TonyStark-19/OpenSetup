// import tpye
import type { GuideMetadata } from "../../../sections/home/GuidePanel";
import type { Dispatch, SetStateAction } from "react";

// guide panel header props
interface GuidePanelHeaderProps {
    MOCK_METADATA: GuideMetadata,
    viewMode: string,
    setViewMode: Dispatch<SetStateAction<"preview" | "raw">>
}

// guide panel header
export default function GuidePanelHeader({ MOCK_METADATA, viewMode, setViewMode }: GuidePanelHeaderProps) {
    return (
        <div
            className="bg-zinc-50 dark:bg-[#121215] border-b border-zinc-200 dark:border-[#212124] px-3 sm:px-4 py-3 flex flex-col sm:flex-row items-center 
            justify-between gap-3 sm:gap-0 select-none transition-colors duration-300"
        >
            {/* Window Controls & Mobile Layout Stabilizer */}
            <div className="flex items-center justify-between w-full sm:w-1/4">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 block" />
                    <span className="w-3 h-3 rounded-full bg-[#eab308]/80 block" />
                    <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 block" />
                </div>

                {/* Preview / Raw Toggle Group (Visible on mobile right side of header row) */}
                <div className="flex sm:hidden justify-end">
                    <div
                        className="bg-zinc-100 dark:bg-[#0a0a0c] p-1 border border-zinc-200 dark:border-[#212124] rounded-lg flex 
                        items-center relative w-32 h-7 transition-colors duration-300"
                    >
                        <div
                            className={`absolute top-0.5 bottom-0.5 left-0.5 w-[calc(50%-2px)] bg-white dark:bg-[#1c1c21] border border-zinc-200 
                            dark:border-[#313135] shadow-sm rounded-md transition-all duration-200 ease-out transform 
                            ${viewMode === "raw" ? "translate-x-full" : "translate-x-0"}`}
                        />

                        <button
                            onClick={() => setViewMode("preview")}
                            className={`relative z-10 w-1/2 text-center text-[11px] font-medium transition-colors cursor-pointer 
                            ${viewMode === "preview" ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-[#888a8e]"}`}
                        >
                            Preview
                        </button>

                        <button
                            onClick={() => setViewMode("raw")}
                            className={`relative z-10 w-1/2 text-center text-[11px] font-medium transition-colors cursor-pointer 
                            ${viewMode === "raw" ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-[#888a8e]"}`}
                        >
                            Raw
                        </button>
                    </div>
                </div>
            </div>

            {/* Fake URL Path Display */}
            <div
                className="bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#212124] rounded-lg px-3 
                py-1 text-[11px] sm:text-xs text-zinc-500 dark:text-[#888a8e] flex items-center gap-1 font-mono drop-shadow-sm 
                transition-colors duration-300 max-w-full overflow-x-auto scrollbar-none"
            >
                <span className="text-zinc-400 dark:text-[#525256] shrink-0">opensetup.dev</span>
                <span className="text-zinc-300 dark:text-[#3a3a3e] shrink-0">/</span>
                <span className="shrink-0">setups</span>
                <span className="text-zinc-300 dark:text-[#3a3a3e] shrink-0">/</span>
                <span className="text-zinc-800 dark:text-[#EDEEF0] font-medium truncate max-w-35 sm:max-w-xs">{MOCK_METADATA.slug}</span>
            </div>

            {/* Preview / Raw Toggle Group (Desktop Only) */}
            <div className="hidden sm:flex w-1/4 justify-end">
                <div
                    className="bg-zinc-100 dark:bg-[#0a0a0c] p-1 border border-zinc-200 dark:border-[#212124] rounded-lg flex 
                    items-center relative w-35 h-7.5 transition-colors duration-300"
                >
                    <div
                        className={`absolute top-1 bottom-1 left-1 w-16 bg-white dark:bg-[#1c1c21] border border-zinc-200 
                        dark:border-[#313135] shadow-sm dark:shadow-none rounded-md transition-all duration-200 ease-out transform 
                        ${viewMode === "raw"
                                ? "translate-x-16"
                                : "translate-x-0"
                            }`}
                    />

                    <button
                        onClick={() => setViewMode("preview")}
                        className={`relative z-10 w-1/2 text-center text-xs font-medium transition-colors duration-150 cursor-pointer 
                        ${viewMode === "preview"
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0]"
                            }`}
                    >
                        Preview
                    </button>

                    <button
                        onClick={() => setViewMode("raw")}
                        className={`relative z-10 w-1/2 text-center text-xs font-medium transition-colors duration-150 cursor-pointer 
                        ${viewMode === "raw"
                                ? "text-zinc-900 dark:text-white"
                                : "text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0]"
                            }`}
                    >
                        Raw
                    </button>
                </div>
            </div>
        </div>
    )
}