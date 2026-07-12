// import icons 
import { UploadCloud, Edit3 } from "lucide-react";

// upload tabs props
interface UploadTabsProps {
    submissionType: "upload" | "editor";
    setSubmissionType: (submissionType: "upload" | "editor") => void
}

// upload tabs component
export default function UploadTabs({ submissionType, setSubmissionType }: UploadTabsProps) {
    return (
        <div
            className="bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-900 
            flex items-center relative h-9.5 w-full max-w-sm select-none"
        >
            <div
                className={`absolute top-1 bottom-1 left-1 w-[48.5%] bg-white dark:bg-[#1c1c21] border border-zinc-200 
                dark:border-zinc-800 rounded-lg shadow-sm transition-transform duration-200 ease-out transform 
                ${submissionType === "editor"
                        ? "translate-x-[102%]"
                        : "translate-x-0"}`
                }
            />

            <button
                type="button"
                onClick={() => setSubmissionType("upload")}
                className={`relative z-10 w-1/2 text-center text-xs font-semibold flex items-center justify-center 
                gap-1.5 h-full cursor-pointer 
                ${submissionType === "upload"
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-400 dark:text-zinc-600"}`
                }
            >
                <UploadCloud size={13} /> Upload File
            </button>

            <button
                type="button"
                onClick={() => setSubmissionType("editor")}
                className={`relative z-10 w-1/2 text-center text-xs font-semibold flex items-center justify-center 
                gap-1.5 h-full cursor-pointer 
                ${submissionType === "editor"
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-400 dark:text-zinc-600"}`
                }
            >
                <Edit3 size={13} /> Inline Editor
            </button>
        </div>
    )
}