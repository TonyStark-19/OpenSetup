// import icons
import { X } from "lucide-react";

// form fields props
interface FormFieldsProps {
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    fileName: string;
    setFileName: (fileName: string) => void;
    title: string
    setTitle: (title: string) => void;
    desc: string;
    setDesc: (desc: string) => void;
    category: string;
    setCategory: (category: string) => void;
    tags: string[];
    setTags: (tags: string[]) => void;
    tagInput: string;
    setTagInput: (tagInput: string) => void;
    handleAddTag: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

// form fields component
export default function FormFields(
    { fileInputRef, handleFileChange, fileName, setFileName, title, setTitle, desc, setDesc, category,
        setCategory, tags, setTags, tagInput, setTagInput, handleAddTag }: FormFieldsProps
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
                <h3 className="text-xs font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">Manifest Details</h3>
            </div>

            {/* File Name Input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">File name</label>

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

                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 font-mono pl-1">Use kebab-case. Must end in .md</span>
            </div>

            {/* Title Input */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Full title</label>

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
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">One-line description</label>

                <input
                    type="text"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="e.g. Production-ready React app with TypeScript, HMR, and path aliases."
                    className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                    px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                />

                <span className="text-[10px] text-zinc-400 dark:text-zinc-600 pl-1">This appears on the guide card in the browse grid</span>
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Category</label>

                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                    px-4 py-3 text-sm text-zinc-800 dark:text-white focus:outline-none shadow-sm cursor-pointer appearance-none"
                >
                    <option value="" disabled>Select a category</option>
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="fullstack">Fullstack</option>
                    <option value="devops">Devops</option>
                </select>
            </div>

            {/* Tags Engine */}
            <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Tech tags</label>

                <div
                    className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                    p-3 flex flex-col gap-2.5 shadow-inner"
                >
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 select-none">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 
                                    dark:border-purple-900/40 text-purple-700 dark:text-purple-400 text-[10px] font-mono font-bold 
                                    pl-2.5 pr-1.5 py-0.5 rounded-md"
                                >
                                    {tag}

                                    <button
                                        type="button"
                                        onClick={() => setTags(tags.filter(t => t !== tag))}
                                        className="hover:bg-purple-200/50 dark:hover:bg-purple-900/50 p-0.5 rounded cursor-pointer 
                                        text-purple-400 transition-colors"
                                    >
                                        <X size={10} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder="Add tag... (Press Enter)"
                        className="w-full bg-transparent px-1 py-0.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 
                        dark:placeholder-zinc-600 focus:outline-none"
                    />
                </div>
            </div>
        </>
    )
}