// import icons 
import { UploadCloud, ArrowDownCircle, CheckCircle } from "lucide-react";

// upload modal props
interface UploadModalProps {
    uploadedFile: File | null;
    triggerFileBrowser: () => void
}

// upload modal component
export default function UploadModal({ uploadedFile, triggerFileBrowser }: UploadModalProps) {
    return (
        <div
            className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col 
            items-center justify-center bg-zinc-50/20 dark:bg-black/10 select-none text-center min-h-50 transition-all relative"
        >
            <UploadCloud size={24} className="text-zinc-400 dark:text-zinc-600 mb-3" />

            {uploadedFile ? (
                <div
                    className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 
                    bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 border border-emerald-200 
                    dark:border-emerald-900/40 rounded-xl font-mono animate-fade-in"
                >
                    <CheckCircle size={14} />
                    <span>{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)}kb)</span>
                </div>
            ) : (
                <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Drop your .md file here</div>
            )}

            <div className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
                or <button
                    type="button"
                    onClick={triggerFileBrowser}
                    className="text-purple-600 dark:text-purple-400 font-semibold underline cursor-pointer 
                    hover:text-purple-500 inline-block bg-transparent p-0 border-none"
                >
                    click to browse
                </button> — markdown max 500kb
            </div>

            {/* Template Route Anchor Point Button */}
            <a
                href="/guides/setup-template.md"
                download="setup-template.md"
                className="mt-5 flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white 
                dark:bg-[#121214] px-4 py-2 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 
                hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer shadow-sm no-underline"
            >
                <ArrowDownCircle size={13} /> Download setup-template.md
            </a>
        </div>
    )
}