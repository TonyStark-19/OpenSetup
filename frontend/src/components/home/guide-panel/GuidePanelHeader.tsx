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
            className="bg-zinc-50 dark:bg-[#121215] border-b border-zinc-200 dark:border-[#212124] px-4 py-3 flex items-center 
            justify-between select-none transition-colors duration-300"
        >
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 w-1/4">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80 block" />
                <span className="w-3 h-3 rounded-full bg-[#eab308]/80 block" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]/80 block" />
            </div>

            {/* Fake URL Path Display */}
            <div
                className="bg-zinc-100 dark:bg-[#0a0a0c] border border-zinc-200 dark:border-[#212124] rounded-lg px-3 
                py-1 text-xs text-zinc-500 dark:text-[#888a8e] flex items-center gap-1.5 font-mono drop-shadow-sm transition-colors duration-300"
            >
                <span className="text-zinc-400 dark:text-[#525256]">opensetup.dev</span>
                <span className="text-zinc-300 dark:text-[#3a3a3e]">/</span>
                <span>setups</span>
                <span className="text-zinc-300 dark:text-[#3a3a3e]">/</span>
                <span className="text-zinc-800 dark:text-[#EDEEF0] font-medium">{MOCK_METADATA.slug}</span>
            </div>

            {/* Preview / Raw Toggle Group */}
            <div className="w-1/4 flex justify-end">
                <div
                    className="bg-zinc-100 dark:bg-[#0a0a0c] p-1 border border-zinc-200 dark:border-[#212124] rounded-lg flex 
                    items-center relative w-35 h-7.5 transition-colors duration-300"
                >
                    <div
                        className={`absolute top-1 bottom-1 left-1 w-16 bg-white dark:bg-[#1c1c21] border border-zinc-200 
                        dark:border-[#313135] shadow-sm dark:shadow-none rounded-md transition-all duration-200 ease-out transform 
                        ${viewMode === "raw" ? "translate-x-16"
                                : "translate-x-0"
                            }`}
                    />

                    <button
                        onClick={() => setViewMode("preview")}
                        className={`relative z-10 w-1/2 text-center text-xs font-medium transition-colors duration-150 cursor-pointer 
                        ${viewMode === "preview" ? "text-zinc-900 dark:text-white"
                                : "text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0]"
                            }`}
                    >
                        Preview
                    </button>

                    <button
                        onClick={() => setViewMode("raw")}
                        className={`relative z-10 w-1/2 text-center text-xs font-medium transition-colors duration-150 cursor-pointer 
                        ${viewMode === "raw" ? "text-zinc-900 dark:text-white"
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