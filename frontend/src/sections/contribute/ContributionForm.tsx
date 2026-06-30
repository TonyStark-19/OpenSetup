// import usestate
import { useState } from "react";

// import type
import type { KeyboardEvent } from "react";

// import icons 
import { UploadCloud, GitPullRequest, X, Edit3, ArrowDownCircle } from "lucide-react";

// contribution form component
export default function ContributionForm() {
    const [fileName, setFileName] = useState("vite-react-ts.md");
    const [title, setTitle] = useState("Vite + React + TypeScript");
    const [desc, setDesc] = useState("Production-ready React app with TypeScript, HMR, and path aliases.");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState<string[]>(["Vite", "React", "TypeScript"]);
    const [tagInput, setTagInput] = useState("");

    const [submissionType, setSubmissionType] = useState<"upload" | "editor">("upload");
    const [editorValue, setEditorValue] = useState(`# Quickstart: ${title || 'Your Stack'}\n\n${desc || 'Provide an overview definition here...'}\n\n### 1. Installation\n\`\`\`bash\nnpm install your-package\n\`\`\``);
    const [editorViewMode, setEditorViewMode] = useState<"edit" | "preview">("edit");

    // handel add tag
    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    return (
        <div
            className="w-full bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 
            rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl transition-all"
        >
            <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
            >
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
                            setups /
                        </div>

                        <input
                            type="text"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            placeholder="your-setup-name.md"
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
                        placeholder="Vite + React + TypeScript Setup Guide"
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
                        placeholder="Provide a concise production summary for the display card..."
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
                        className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 
                        rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-white focus:outline-none shadow-sm cursor-pointer appearance-none"
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

                {/* File Workspace Component Tab Controllers */}
                <div className="pt-4 flex flex-col gap-4">
                    <div
                        className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase border-b
                        border-zinc-200 dark:border-zinc-900 pb-2"
                    >
                        Guide Content File
                    </div>

                    <div
                        className="bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-900 
                        flex items-center relative h-9.5 w-full max-w-sm select-none"
                    >
                        <div
                            className={`absolute top-1 bottom-1 left-1 w-[48.5%] bg-white dark:bg-[#1c1c21] border border-zinc-200 
                            dark:border-zinc-800 rounded-lg shadow-sm transition-transform duration-200 ease-out transform 
                            ${submissionType === "editor" ? "translate-x-[102%]"
                                    : "translate-x-0"}`
                            }
                        />

                        <button
                            type="button"
                            onClick={() => setSubmissionType("upload")}
                            className={`relative z-10 w-1/2 text-center text-xs font-semibold flex items-center justify-center gap-1.5 h-full cursor-pointer 
                            ${submissionType === "upload" ? "text-zinc-900 dark:text-white"
                                    : "text-zinc-400 dark:text-zinc-600"}`
                            }
                        >
                            <UploadCloud size={13} /> Upload File
                        </button>

                        <button
                            type="button"
                            onClick={() => setSubmissionType("editor")}
                            className={`relative z-10 w-1/2 text-center text-xs font-semibold flex items-center justify-center gap-1.5 h-full cursor-pointer 
                            ${submissionType === "editor" ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-600"}`
                            }
                        >
                            <Edit3 size={13} /> Inline Editor
                        </button>
                    </div>

                    {submissionType === "upload" ? (
                        <div
                            className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex 
                            flex-col items-center justify-center bg-zinc-50/20 dark:bg-black/10 select-none text-center min-h-50 transition-all relative"
                        >
                            <UploadCloud size={24} className="text-zinc-400 dark:text-zinc-600 mb-3" />
                            <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Drop your .md file here</div>

                            <div className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
                                or <span className="text-purple-600 dark:text-purple-400 font-semibold underline cursor-pointer hover:text-purple-500">
                                    click to browse
                                </span> — markdown max 500kb
                            </div>

                            <button
                                type="button"
                                className="mt-5 flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] 
                                px-4 py-2 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 
                                dark:hover:bg-zinc-900 cursor-pointer shadow-sm"
                            >
                                <ArrowDownCircle size={13} /> Download setup-template.md
                            </button>
                        </div>
                    ) : (
                        <div
                            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070708] rounded-xl overflow-hidden 
                            flex flex-col min-h-80 shadow-inner"
                        >
                            <div
                                className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex 
                                items-center justify-between text-xs select-none"
                            >
                                <span className="font-mono text-zinc-400 dark:text-zinc-600">embedded_workspace.md</span>

                                <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5 bg-white dark:bg-zinc-900">
                                    <button
                                        type="button"
                                        onClick={() => setEditorViewMode("edit")}
                                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-colors 
                                        ${editorViewMode === "edit" ? "bg-zinc-100 dark:bg-[#1c1c21] text-zinc-900 dark:text-white"
                                                : "text-zinc-400 hover:text-zinc-600"}`
                                        }
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditorViewMode("preview")}
                                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-colors 
                                            ${editorViewMode === "preview" ? "bg-zinc-100 dark:bg-[#1c1c21] text-zinc-900 dark:text-white"
                                                : "text-zinc-400 hover:text-zinc-600"}`
                                        }
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>

                            {editorViewMode === "edit" ? (
                                <textarea
                                    value={editorValue}
                                    onChange={(e) => setEditorValue(e.target.value)}
                                    className="w-full grow p-4 font-mono text-[13px] bg-transparent text-zinc-800 dark:text-[#b5b7ba] 
                                    focus:outline-none min-h-65 resize-none leading-relaxed"
                                />
                            ) : (
                                <div
                                    className="p-5 grow overflow-y-auto text-left min-h-65 max-h-100 prose dark:prose-invert 
                                    max-w-none bg-zinc-50/20 dark:bg-black/10 transition-colors"
                                >
                                    <h1 className="text-2xl font-extrabold tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-1 mb-3">
                                        {title || 'Guide Title'}
                                    </h1>

                                    <p className="text-sm text-zinc-500 leading-relaxed mb-4">{desc || 'Description text...'}</p>

                                    <div
                                        className="font-mono text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-950 p-4 border 
                                        border-zinc-200 dark:border-zinc-900/60 rounded-xl leading-relaxed whitespace-pre"
                                    >
                                        {editorValue}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Form Action Submissions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-900 mt-8 select-none">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-600 font-mono">
                        <GitPullRequest size={12} />
                        Automated PR creation engine initialization parameters.
                    </div>

                    <button
                        type="submit"
                        className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] px-6 py-3 rounded-xl 
                        text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 
                        dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.99]"
                    >
                        <GitPullRequest size={14} /> Initialize submission
                    </button>
                </div>
            </form>
        </div>
    );
}