// import icons
import { X, Save, ChevronDown } from "lucide-react";

// import type
import type { ContributedGuide } from "../../pages/ManageContributionsPage";

// edit guide model props
interface EditGuideModelProps {
    editingGuide: ContributedGuide;
    setEditingGuide: React.Dispatch<React.SetStateAction<ContributedGuide | null>>;
    handleUpdateGuide: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
    categories: string[];
    guideTypes: string[];
    isSaving: boolean;
}

// edit guide model component
export default function EditGuideModel({ editingGuide, setEditingGuide, handleUpdateGuide, categories, guideTypes, isSaving }: EditGuideModelProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div
                className="w-full max-w-lg bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 
                rounded-2xl shadow-2xl p-6 relative overflow-hidden"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Contribution</h2>
                        <p className="text-xs font-mono text-zinc-400">ID: {editingGuide._id}</p>
                    </div>

                    <button
                        onClick={() => setEditingGuide(null)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 
                        dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Form */}
                <form
                    onSubmit={handleUpdateGuide}
                    className="space-y-4"
                >
                    {/* File Name */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Markdown File Name
                        </label>

                        <input
                            type="text"
                            value={editingGuide.mdFileName}
                            onChange={(e) => setEditingGuide({ ...editingGuide, mdFileName: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 
                            rounded-xl px-3.5 py-2.5 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none 
                            focus:border-zinc-400 dark:focus:border-zinc-700"
                            required
                        />
                    </div>

                    {/* Title */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Guide Title
                        </label>

                        <input
                            type="text"
                            value={editingGuide.title}
                            onChange={(e) => setEditingGuide({ ...editingGuide, title: e.target.value })}
                            className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 
                            rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 
                            dark:focus:border-zinc-700"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Description
                        </label>

                        <textarea
                            value={editingGuide.description}
                            onChange={(e) => setEditingGuide({ ...editingGuide, description: e.target.value })}
                            rows={3}
                            className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 
                            rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 
                            dark:focus:border-zinc-700 resize-none"
                            required
                        />
                    </div>

                    {/* Category & Category Type Row */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Category Dropdown */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Category
                            </label>

                            <div
                                className="relative flex items-center bg-zinc-50 dark:bg-[#070708] rounded-xl border border-zinc-200 
                                dark:border-zinc-800 overflow-hidden"
                            >
                                <select
                                    value={editingGuide.categoryOfGuide.toLowerCase()}
                                    onChange={(e) => setEditingGuide({ ...editingGuide, categoryOfGuide: e.target.value })}
                                    className="w-full bg-transparent p-2.5 pr-8 text-xs text-zinc-900 dark:text-white focus:outline-none 
                                    appearance-none cursor-pointer relative z-10"
                                >
                                    {categories.map((cat) => (
                                        <option
                                            key={cat}
                                            value={cat}
                                            className="bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200"
                                        >
                                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown size={14} className="absolute right-2.5 text-zinc-400 pointer-events-none" />
                            </div>
                        </div>

                        {/* Category Type Dropdown */}
                        <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                Category Type
                            </label>

                            <div
                                className="relative flex items-center bg-zinc-50 dark:bg-[#070708] rounded-xl border border-zinc-200 
                                dark:border-zinc-800 overflow-hidden"
                            >
                                <select
                                    value={editingGuide.typeOfGuide}
                                    onChange={(e) => setEditingGuide({ ...editingGuide, typeOfGuide: e.target.value })}
                                    className="w-full bg-transparent p-2.5 pr-8 text-xs text-zinc-900 dark:text-white focus:outline-none 
                                    appearance-none cursor-pointer relative z-10 font-mono"
                                >
                                    {guideTypes.map((gt) => (
                                        <option
                                            key={gt}
                                            value={gt}
                                            className="bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200"
                                        >
                                            {gt}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown size={14} className="absolute right-2.5 text-zinc-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Verification Status Selector */}
                    <div className="flex flex-col gap-1.5 pt-1">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                            Publish / Review Status
                        </label>

                        <div className="grid grid-cols-3 gap-2">
                            {["PENDING", "VERIFIED", "REJECTED"].map((st) => (
                                <button
                                    key={st}
                                    type="button"
                                    onClick={() => setEditingGuide({ ...editingGuide, status: st })}
                                    className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all cursor-pointer 
                                        ${editingGuide.status === st
                                            ? st === "VERIFIED"
                                                ? "bg-emerald-500 text-white border-emerald-600"
                                                : st === "REJECTED"
                                                    ? "bg-red-500 text-white border-red-600"
                                                    : "bg-purple-600 text-white border-purple-700"
                                            : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                        }`}
                                >
                                    {st}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-6">
                        <button
                            type="button"
                            onClick={() => setEditingGuide(null)}
                            className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-900 
                            dark:hover:text-white transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] rounded-xl text-xs 
                            font-semibold flex items-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer 
                            shadow-md disabled:opacity-50"
                        >
                            <Save size={13} /> {isSaving ? "Saving..." : "Save & Commit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}