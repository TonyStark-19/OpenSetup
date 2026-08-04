// import react markdown
import ReactMarkdown from "react-markdown";

// editor modal props
interface EditorModalProps {
    editorViewMode: "edit" | "preview";
    setEditorViewMode: (editorViewMode: "edit" | "preview") => void;
    editorValue: string;
    setEditorValue: (editorValue: string) => void;
    title: string;
    desc: string;
}

// editor modal component
export default function EditorModal({ editorViewMode, setEditorViewMode, editorValue, setEditorValue, title, desc }: EditorModalProps) {
    return (
        <div
            className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#070708] rounded-xl 
            overflow-hidden flex flex-col min-h-80 shadow-inner max-w-full"
        >
            <div
                className="bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 px-3 sm:px-4 py-2 
                flex items-center justify-between text-xs select-none gap-2 flex-wrap"
            >
                <span className="font-mono text-zinc-400 dark:text-zinc-600 truncate max-w-37.5 sm:max-w-xs">embedded_workspace.md</span>

                <div className="flex border border-zinc-200 dark:border-zinc-800 rounded-md p-0.5 bg-white dark:bg-zinc-900 shrink-0">
                    <button
                        type="button"
                        onClick={() => setEditorViewMode("edit")}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-all duration-200 
                        ${editorViewMode === "edit"
                                ? "bg-zinc-100 dark:bg-[#1c1c21] text-zinc-900 dark:text-white shadow-sm"
                                : "text-zinc-400 hover:text-zinc-600"}`
                        }
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        onClick={() => setEditorViewMode("preview")}
                        className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-all duration-200 
                        ${editorViewMode === "preview"
                                ? "bg-zinc-100 dark:bg-[#1c1c21] text-zinc-900 dark:text-white shadow-sm"
                                : "text-zinc-400 hover:text-zinc-600"}`
                        }
                    >
                        Preview
                    </button>
                </div>
            </div>

            {/* Toggle Workspace Layout Elements */}
            <div className="w-full min-h-65 flex flex-col relative grow overflow-hidden">
                {editorViewMode === "edit" ? (
                    <textarea
                        value={editorValue}
                        onChange={(e) => setEditorValue(e.target.value)}
                        placeholder={`# Quickstart: ${title || 'Your Stack'}\n\n${desc || 'Provide an overview definition here...'}\n\n### 1. Installation\n\`\`\`bash\nnpm install your-package\n\`\`\``}
                        className="w-full grow p-3.5 sm:p-4 font-mono text-xs sm:text-[13px] bg-transparent text-zinc-800 dark:text-[#b5b7ba] 
                        placeholder-zinc-400/60 dark:placeholder-zinc-700 focus:outline-none resize-none leading-relaxed min-h-65 animate-fade-in"
                    />
                ) : (
                    <div
                        className="p-4 sm:p-5 grow overflow-y-auto text-left max-h-100 prose dark:prose-invert max-w-none bg-zinc-50/20 
                        dark:bg-black/10 min-h-65 animate-fade-in text-zinc-800 dark:text-zinc-200"
                    >
                        {editorValue.trim() ? (
                            <div className="markdown-preview text-xs sm:text-sm leading-relaxed space-y-4 overflow-x-auto">
                                <ReactMarkdown
                                    components={{
                                        h1: ({ node, ...props }) =>
                                            <h1
                                                className="text-xl sm:text-2xl font-extrabold tracking-tight border-b border-zinc-200 
                                                dark:border-zinc-800 pb-2 mt-6 mb-4 text-zinc-900 dark:text-white" {...props}
                                            />,
                                        h2: ({ node, ...props }) =>
                                            <h2 className="text-lg sm:text-xl font-bold mt-6 mb-3 text-zinc-900 dark:text-zinc-100" {...props} />,
                                        h3: ({ node, ...props }) =>
                                            <h3 className="text-base sm:text-lg font-bold mt-4 mb-2 text-zinc-800 dark:text-zinc-200" {...props} />,
                                        p: ({ node, ...props }) =>
                                            <p className="mb-4 text-zinc-600 dark:text-zinc-400 leading-relaxed" {...props} />,
                                        ul: ({ node, ...props }) =>
                                            <ul className="list-disc pl-5 mb-4 space-y-1 text-zinc-600 dark:text-zinc-400" {...props} />,
                                        ol: ({ node, ...props }) =>
                                            <ol className="list-decimal pl-5 mb-4 space-y-1 text-zinc-600 dark:text-zinc-400" {...props} />,
                                        li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,

                                        code: ({ node, inline, ...props }: any) => (
                                            inline ? (
                                                <code
                                                    className="bg-zinc-100 dark:bg-zinc-900 px-1.5 py-0.5 rounded font-mono 
                                                    text-xs text-purple-600 dark:text-purple-400"
                                                    {...props}
                                                />
                                            ) : (
                                                <pre
                                                    className="bg-zinc-100 dark:bg-zinc-950 p-3 sm:p-4 border border-zinc-200 
                                                    dark:border-zinc-900 rounded-xl leading-relaxed overflow-x-auto my-3"
                                                >
                                                    <code
                                                        className="font-mono text-xs text-zinc-700 dark:text-zinc-300 block whitespace-pre"
                                                        {...props}
                                                    />
                                                </pre>
                                            )
                                        )
                                    }}
                                >
                                    {editorValue}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="text-center text-zinc-400 dark:text-zinc-600 italic py-6 text-xs select-none px-2">
                                Workspace is empty. Start drafting markdown code inside the editor tab to review live parameters.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}