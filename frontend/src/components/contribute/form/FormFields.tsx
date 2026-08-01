// import icons
import { ChevronDown } from "lucide-react";

// form fields props
interface FormFieldsProps {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string;
    setFileName: (fileName: string) => void;
    title: string;
    setTitle: (title: string) => void;
    desc: string;
    setDesc: (desc: string) => void;
    category: string;
    setCategory: (category: string) => void;
    guideType: string;
    setGuideType: (type: string) => void;
}

// category type filters
const typeFilters = ["SCAFFOLD", "INTEGRATION", "CONFIG", "DOTFILES"];
const categoryFilter = ["Frontend", "Backend", "Fullstack", "Devops"]

// form fields component
export default function FormFields({
    fileInputRef, handleFileChange, fileName, setFileName, title, setTitle, desc, setDesc, category, setCategory, guideType, setGuideType, }: FormFieldsProps
) {
    return (
        <>
            {/* Hidden Native File Attachment Input Portal */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept=".md"
                className="hidden"
            />

            <div className="border-b border-zinc-200 dark:border-zinc-900 pb-2">
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                    Manifest Details
                </h3>
            </div>

            {/* File Name Input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    File name
                </label>

                <div
                    className="relative flex items-center bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 
                    rounded-xl overflow-hidden shadow-inner"
                >
                    <div
                        className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 border-r border-zinc-200 dark:border-zinc-800 
                        text-xs font-mono text-zinc-400 select-none"
                    >
                        setups/
                    </div>

                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="e.g. vite-react-ts.md"
                        className="w-full bg-transparent px-4 py-3 text-sm font-mono text-zinc-900 dark:text-white focus:outline-none"
                    />
                </div>

                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono pl-1">
                    Use kebab-case. Must end in .md
                </span>
            </div>

            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Full title
                </label>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Vite + React + TypeScript"
                    className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                    px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                />
            </div>

            {/* Description Input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    One-line description
                </label>

                <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="e.g. Production-ready React app with TypeScript, HMR, and path aliases."
                    className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                    px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                />

                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 pl-1">
                    This appears on the guide card in the browse grid
                </span>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Category
                </label>

                <div className="relative w-full flex items-center bg-white dark:bg-[#070708] rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-colors duration-150 focus-within:border-zinc-400 dark:focus-within:border-zinc-700 group cursor-pointer overflow-hidden">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={`w-full bg-transparent p-4 pr-12 text-sm focus:outline-none cursor-pointer appearance-none select-none relative z-10 transition-colors
                            ${!category
                                ? "text-zinc-400 dark:text-zinc-500"
                                : "text-zinc-900 dark:text-white font-medium"
                            }`}
                    >
                        <option
                            value=""
                            disabled
                            className="bg-white dark:bg-[#121214] text-zinc-400 dark:text-zinc-500"
                        >
                            Select a category
                        </option>

                        {categoryFilter.map((filter) => (
                            <option
                                key={filter}
                                value={filter}
                                className="bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200 font-mono"
                            >
                                {filter}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={16}
                        className="absolute right-4 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 
                        dark:group-hover:text-zinc-400 transition-colors duration-150 pointer-events-none z-0"
                        strokeWidth={2}
                    />
                </div>
            </div>

            {/* Category Type Dropdown */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                    Category type
                </label>

                <div
                    className="relative w-full flex items-center bg-white dark:bg-[#070708] rounded-xl border border-zinc-200 
                    dark:border-zinc-800 shadow-sm transition-colors duration-150 focus-within:border-zinc-400 
                    dark:focus-within:border-zinc-700 group cursor-pointer overflow-hidden"
                >
                    <select
                        value={guideType}
                        onChange={(e) => setGuideType(e.target.value)}
                        className={`w-full bg-transparent p-4 pr-12 text-sm focus:outline-none cursor-pointer appearance-none select-none relative z-10 transition-colors
                            ${!guideType
                                ? "text-zinc-400 dark:text-zinc-500"
                                : "text-zinc-900 dark:text-white font-medium"
                            }`}
                    >
                        <option
                            value=""
                            disabled
                            className="bg-white dark:bg-[#121214] text-zinc-400 dark:text-zinc-500"
                        >
                            Select a category type
                        </option>

                        {typeFilters.map((filter) => (
                            <option
                                key={filter}
                                value={filter}
                                className="bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200 font-mono"
                            >
                                {filter}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        size={16}
                        className="absolute right-4 text-zinc-400 dark:text-zinc-600 group-hover:text-zinc-600 
                        dark:group-hover:text-zinc-400 transition-colors duration-150 pointer-events-none z-0"
                        strokeWidth={2}
                    />
                </div>
            </div>
        </>
    );
}