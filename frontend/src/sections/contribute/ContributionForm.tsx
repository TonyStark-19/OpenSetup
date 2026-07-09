// import usestate, useRef
import { useState, useRef } from "react";

// import type
import type { KeyboardEvent, ChangeEvent } from "react";

// import packages
import ReactMarkdown from "react-markdown";

// import icons 
import { UploadCloud, GitPullRequest, X, Edit3, ArrowDownCircle, CheckCircle } from "lucide-react";

export default function ContributionForm() {
    // Inputs utilize blank state configurations with layout fallback text defaults shifted to element placeholders
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState<string[]>(["Vite", "React", "TypeScript"]);
    const [tagInput, setTagInput] = useState("");

    const [submissionType, setSubmissionType] = useState<"upload" | "editor">("upload");
    const [editorValue, setEditorValue] = useState("");
    const [editorViewMode, setEditorViewMode] = useState<"edit" | "preview">("edit");

    // File upload native node references
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    // Dynamic tag append parsing engine
    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === ",") && tagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(tagInput.trim())) setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    // System file selector event triggers
    const triggerFileBrowser = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const targetFile = selectedFiles[0];
            if (targetFile.name.endsWith(".md")) {
                setUploadedFile(targetFile);
                setFileName(targetFile.name);
            } else {
                alert("Please drop or browse valid markdown documents (.md) exclusively.");
            }
        }
    };

    return (
        <div className="w-full bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl transition-all">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">

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
                    <div className="relative flex items-center bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden shadow-inner">
                        <div className="bg-zinc-100 dark:bg-zinc-900 px-4 py-3 border-r border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-400 select-none">
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
                        className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
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
                        className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                    />
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-600 pl-1">This appears on the guide card in the browse grid</span>
                </div>

                {/* Category Dropdown */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Category</label>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-800 dark:text-white focus:outline-none shadow-sm cursor-pointer appearance-none"
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
                    <div className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 flex flex-col gap-2.5 shadow-inner">
                        {tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 select-none">
                                {tags.map((tag) => (
                                    <div key={tag} className="flex items-center gap-1 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 text-purple-700 dark:text-purple-400 text-[10px] font-mono font-bold pl-2.5 pr-1.5 py-0.5 rounded-md">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => setTags(tags.filter(t => t !== tag))}
                                            className="hover:bg-purple-200/50 dark:hover:bg-purple-900/50 p-0.5 rounded cursor-pointer text-purple-400 transition-colors"
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
                            className="w-full bg-transparent px-1 py-0.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none"
                        />
                    </div>
                </div>

                {/* File Workspace Component Tab Controllers */}
                <div className="pt-4 flex flex-col gap-4">
                    <div className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase border-b border-zinc-200 dark:border-zinc-900 pb-2">
                        Guide Content File
                    </div>

                    <div className="bg-zinc-100 dark:bg-zinc-950 p-1 rounded-xl border border-zinc-200 dark:border-zinc-900 flex items-center relative h-9.5 w-full max-w-sm select-none">
                        <div className={`absolute top-1 bottom-1 left-1 w-[48.5%] bg-white dark:bg-[#1c1c21] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm transition-transform duration-200 ease-out transform ${submissionType === "editor" ? "translate-x-[102%]" : "translate-x-0"}`} />
                        <button
                            type="button"
                            onClick={() => setSubmissionType("upload")}
                            className={`relative z-10 w-1/2 text-center text-xs font-semibold flex items-center justify-center gap-1.5 h-full cursor-pointer ${submissionType === "upload" ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-600"}`}
                        >
                            <UploadCloud size={13} /> Upload File
                        </button>
                        <button
                            type="button"
                            onClick={() => setSubmissionType("editor")}
                            className={`relative z-10 w-1/2 text-center text-xs font-semibold flex items-center justify-center gap-1.5 h-full cursor-pointer ${submissionType === "editor" ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-zinc-600"}`}
                        >
                            <Edit3 size={13} /> Inline Editor
                        </button>
                    </div>

                    {submissionType === "upload" ? (
                        <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl p-8 flex flex-col items-center justify-center bg-zinc-50/20 dark:bg-black/10 select-none text-center min-h-50 transition-all relative">
                            <UploadCloud size={24} className="text-zinc-400 dark:text-zinc-600 mb-3" />

                            {uploadedFile ? (
                                <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 px-3 py-1.5 border border-emerald-200 dark:border-emerald-900/40 rounded-xl font-mono animate-fade-in">
                                    <CheckCircle size={14} />
                                    <span>{uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)}kb)</span>
                                </div>
                            ) : (
                                <div className="text-sm font-medium text-zinc-800 dark:text-zinc-300">Drop your .md file here</div>
                            )}

                            <div className="text-xs text-zinc-400 dark:text-zinc-600 mt-1">
                                or <button type="button" onClick={triggerFileBrowser} className="text-purple-600 dark:text-purple-400 font-semibold underline cursor-pointer hover:text-purple-500 inline-block bg-transparent p-0 border-none">click to browse</button> — markdown max 500kb
                            </div>

                            {/* Template Route Anchor Point Button */}
                            <a
                                href="/guides/setup-template.md"
                                download="setup-template.md"
                                className="mt-5 flex items-center gap-2 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] px-4 py-2 rounded-lg text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-900 cursor-pointer shadow-sm no-underline"
                            >
                                <ArrowDownCircle size={13} /> Download setup-template.md
                            </a>
                        </div>
                    ) : (
                        <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070708] rounded-xl overflow-hidden flex flex-col min-h-80 shadow-inner">
                            <div className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-4 py-2 flex items-center justify-between text-xs select-none">
                                <span className="font-mono text-zinc-400 dark:text-zinc-600">embedded_workspace.md</span>

                                <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5 bg-white dark:bg-zinc-900">
                                    <button
                                        type="button"
                                        onClick={() => setEditorViewMode("edit")}
                                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-all duration-200 ${editorViewMode === "edit" ? "bg-zinc-100 dark:bg-[#1c1c21] text-zinc-900 dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setEditorViewMode("preview")}
                                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-all duration-200 ${editorViewMode === "preview" ? "bg-zinc-100 dark:bg-[#1c1c21] text-zinc-900 dark:text-white shadow-sm" : "text-zinc-400 hover:text-zinc-600"}`}
                                    >
                                        Preview
                                    </button>
                                </div>
                            </div>

                            {/* Restored Toggle Workspace Layout Elements */}
                            <div className="w-full min-h-65 flex flex-col relative grow">
                                {editorViewMode === "edit" ? (
                                    <textarea
                                        value={editorValue}
                                        onChange={(e) => setEditorValue(e.target.value)}
                                        placeholder={`# Quickstart: ${title || 'Your Stack'}\n\n${desc || 'Provide an overview definition here...'}\n\n### 1. Installation\n\`\`\`bash\nnpm install your-package\n\`\`\``}
                                        className="w-full grow p-4 font-mono text-[13px] bg-transparent text-zinc-800 dark:text-[#b5b7ba] placeholder-zinc-400/60 dark:placeholder-zinc-700 focus:outline-none resize-none leading-relaxed min-h-65 animate-fade-in"
                                    />
                                ) : (
                                    <div className="p-5 grow overflow-y-auto text-left max-h-100 prose dark:prose-invert max-w-none bg-zinc-50/20 dark:bg-black/10 min-h-65 animate-fade-in text-zinc-800 dark:text-zinc-200">
                                        {editorValue.trim() ? (
                                            <div className="markdown-preview text-sm leading-relaxed space-y-4">
                                                <ReactMarkdown
                                                    components={{
                                                        h1: ({ node, ...props }) => <h1 className="text-2xl font-extrabold tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2 mt-6 mb-4 text-zinc-900 dark:text-white" {...props} />,
                                                        h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100" {...props} />,
                                                        h3: ({ node, ...props }) => <h3 className="text-lg font-bold mt-4 mb-2 text-zinc-800 dark:text-zinc-200" {...props} />,
                                                        p: ({ node, ...props }) => <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed" {...props} />,
                                                        ul: ({ node, ...props }) => <ul className="list-disc pl-5 mb-4 space-y-1 text-zinc-600 dark:text-zinc-400" {...props} />,
                                                        ol: ({ node, ...props }) => <ol className="list-decimal pl-5 mb-4 space-y-1 text-zinc-600 dark:text-zinc-400" {...props} />,
                                                        li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                                                        code: ({ node, inline, ...props }: any) => (
                                                            inline ? (
                                                                <code className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono text-xs text-purple-600 dark:text-purple-400" {...props} />
                                                            ) : (
                                                                <pre className="bg-zinc-100 dark:bg-zinc-950 p-4 border border-zinc-200 dark:border-zinc-900 rounded-xl leading-relaxed overflow-x-auto my-3">
                                                                    <code className="font-mono text-xs text-zinc-700 dark:text-zinc-300 block whitespace-pre" {...props} />
                                                                </pre>
                                                            )
                                                        )
                                                    }}
                                                >
                                                    {editorValue}
                                                </ReactMarkdown>
                                            </div>
                                        ) : (
                                            <div className="text-center text-zinc-400 dark:text-zinc-600 italic py-6 text-xs select-none">
                                                Workspace is empty. Start drafting markdown code inside the editor tab to review live parameters.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
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
                        className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] px-6 py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.99]"
                    >
                        <GitPullRequest size={14} /> Initialize submission
                    </button>
                </div>
            </form>
        </div>
    );
}