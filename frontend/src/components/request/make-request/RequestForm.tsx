// import icons
import { Send, X, Plus, Terminal } from "lucide-react";

// import type
import type { KeyboardEvent, FormEvent } from "react";

// request form props
interface RequestFormProps {
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
    title: string;
    setTitle: (title: string) => void;
    tags: string[];
    handleRemoveTag: (tag: string) => void;
    currentTagInput: string;
    setCurrentTagInput: (currentTagInput: string) => void;
    handleAddTag: (e: KeyboardEvent<HTMLInputElement>) => void;
    context: string;
    setContext: (context: string) => void;
}

// request form component
export default function RequestForm(
    { handleSubmit, title, setTitle, tags, handleRemoveTag, currentTagInput, setCurrentTagInput, handleAddTag, context, setContext }: RequestFormProps
) {
    return (
        <div
            className="lg:col-span-5 bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 
            dark:border-zinc-900 rounded-2xl p-6 shadow-xl dark:shadow-2xl transition-all"
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white">Create a Request</h3>
                    <p className="text-zinc-500 dark:text-[#888a8e] text-xs font-medium">Add a template you want the core registry to optimize.</p>
                </div>

                {/* Title Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-bold tracking-wide uppercase text-zinc-400 dark:text-zinc-500">Guide title</label>

                    <div className="relative">
                        <Terminal size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />

                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="e.g. Mongoose + Express REST API setup"
                            className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800/80 
                            rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 
                            dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 transition-colors shadow-inner"
                        />
                    </div>
                </div>

                {/* Tech Tags Input */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-bold tracking-wide uppercase text-zinc-400 dark:text-zinc-500">Tech tags</label>

                    <div
                        className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800/80 rounded-xl 
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
                                            onClick={() => handleRemoveTag(tag)}
                                            className="hover:bg-purple-200/50 dark:hover:bg-purple-900/50 p-0.5 rounded cursor-pointer 
                                            text-purple-400 hover:text-purple-600 transition-colors"
                                        >
                                            <X size={10} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="relative">
                            <Plus size={14} className="absolute left-1 top-1/2 -translate-y-1/2 text-zinc-400" />

                            <input
                                type="text"
                                value={currentTagInput}
                                onChange={(e) => setCurrentTagInput(e.target.value)}
                                onKeyDown={handleAddTag}
                                placeholder="Add a tag..."
                                className="w-full bg-transparent pl-6 pr-2 py-0.5 text-sm text-zinc-900 dark:text-white 
                                placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Context Area */}
                <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono font-bold tracking-wide uppercase text-zinc-400 dark:text-zinc-500">
                        Why do you need this? <span className="lowercase font-normal italic text-zinc-400">optional</span>
                    </label>

                    <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder="Short context helps contributors understand the use case..."
                        rows={2}
                        className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800/80 rounded-xl p-4 text-sm 
                        text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-zinc-400 
                        dark:focus:border-zinc-700 transition-colors shadow-inner resize-none"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] py-3 rounded-xl text-sm font-semibold 
                    flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all 
                    shadow-md active:scale-[0.99]"
                >
                    <Send size={13} />
                    Submit request
                </button>
            </form>
        </div>
    )
}