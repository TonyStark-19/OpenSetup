import { useState, useEffect } from "react";
import {
    RefreshCw,
    Edit3,
    CheckCircle2,
    Clock,
    XCircle,
    FileCode,
    ExternalLink,
    X,
    Save,
    ChevronDown
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Guide document interface matching backend MongoDB schema
export interface ContributedGuide {
    _id: string;
    mdFileName: string;
    title: string;
    description: string;
    contributedBy: string;
    profileImage?: string;
    typeOfGuide: "SCAFFOLD" | "INTEGRATION" | "CONFIG" | "DOTFILES" | string;
    categoryOfGuide: string;
    upvotes: number;
    views: number;
    status: string;
    mdFileUrl: string;
    createdAt: string;
}

// Backend configuration URL
const BACKEND_URL = "http://localhost:5000/api/guides";

// Toast Notification Config
const toastConfig = {
    style: {
        background: document.documentElement.classList.contains("dark") ? "#161619" : "#ffffff",
        color: document.documentElement.classList.contains("dark") ? "#EDEEF0" : "#18181b",
        border: document.documentElement.classList.contains("dark") ? "1px solid #262629" : "1px solid #e4e4e7",
        fontSize: "13px",
        borderRadius: "12px",
        padding: "12px 16px",
    },
    success: { iconTheme: { primary: "#10B981", secondary: "#ffffff" } },
    error: { iconTheme: { primary: "#EF4444", secondary: "#ffffff" } },
};

const guideTypes = ["SCAFFOLD", "INTEGRATION", "CONFIG", "DOTFILES"];
const categories = ["frontend", "backend", "fullstack", "devops"];

export default function ManageContributionsPage() {
    const [guides, setGuides] = useState<ContributedGuide[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal Edit State Tracker
    const [editingGuide, setEditingGuide] = useState<ContributedGuide | null>(null);
    const [isSaving, setIsSubmitting] = useState(false);

    // Fetch all pending/unverified contributions
    const fetchPendingGuides = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`${BACKEND_URL}/pending`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const resData = await response.json();

            if (response.ok && resData.success) {
                setGuides(resData.data);
            } else {
                toast.error(resData.message || "Failed fetching unverified guides queue.", toastConfig);
            }
        } catch (err) {
            console.error("Error loading pending guide records:", err);
            toast.error("Network error synchronizing contribution catalog.", toastConfig);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingGuides();
    }, []);

    // Commit Metadata Updates & Verification Toggle to Backend
    const handleUpdateGuide = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingGuide) return;

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Authentication expired. Please sign in as admin.", toastConfig);
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Updating guide configuration record...", toastConfig);

        try {
            const response = await fetch(`${BACKEND_URL}/update/${editingGuide._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    mdFileName: editingGuide.mdFileName,
                    title: editingGuide.title,
                    description: editingGuide.description,
                    typeOfGuide: editingGuide.typeOfGuide,
                    categoryOfGuide: editingGuide.categoryOfGuide,
                    status: editingGuide.status
                })
            });

            const resData = await response.json();

            if (response.ok && resData.success) {
                toast.success(
                    editingGuide.status === "VERIFIED"
                        ? "Guide verified & live email alert dispatched!"
                        : "Guide metadata updated successfully!",
                    { ...toastConfig, id: toastId }
                );

                // Refresh catalog list and close modal
                setEditingGuide(null);
                fetchPendingGuides();
            } else {
                toast.error(resData.message || "Failed updating guide parameters.", { ...toastConfig, id: toastId });
            }
        } catch (err) {
            console.error("Error updating guide record:", err);
            toast.error("Network error committing updates.", { ...toastConfig, id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />

            <div className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white min-h-screen py-24 transition-colors duration-300">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start justify-start">

                    {/* Header Controls */}
                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="p-1 rounded bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40">
                                    <FileCode size={14} />
                                </span>
                                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#EDEEF0]">
                                    Contribution Review Queue
                                </h1>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                                Moderate and publish community blueprint submissions
                            </p>
                        </div>

                        <button
                            onClick={fetchPendingGuides}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer select-none active:scale-[0.98]"
                        >
                            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                            Sync Queue
                        </button>
                    </div>

                    {/* Pending Guides Grid / List */}
                    {isLoading ? (
                        <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                            Synchronizing contribution moderation pipeline...
                        </div>
                    ) : guides.length > 0 ? (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {guides.map((guide) => (
                                <div
                                    key={guide._id}
                                    className="flex flex-col bg-zinc-50/50 dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-800 transition-all shadow-sm dark:shadow-none"
                                >
                                    {/* Card Header Toolbar */}
                                    <div className="flex items-center justify-between bg-zinc-100/60 dark:bg-[#141416] px-4 py-3 border-b border-zinc-200 dark:border-zinc-900">
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/30 px-2 py-0.5 rounded border border-purple-100 dark:border-purple-900/40">
                                                {guide.categoryOfGuide}
                                            </span>
                                            <span className="text-[10px] font-mono font-bold uppercase text-zinc-500 dark:text-zinc-400 bg-zinc-200/50 dark:bg-zinc-800/50 px-2 py-0.5 rounded border border-zinc-300/40 dark:border-zinc-700/40">
                                                {guide.typeOfGuide}
                                            </span>
                                        </div>

                                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${guide.status === "VERIFIED"
                                                ? "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/30"
                                                : guide.status === "REJECTED"
                                                    ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                                                    : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
                                            }`}>
                                            {guide.status === "VERIFIED" ? <CheckCircle2 size={10} /> : guide.status === "REJECTED" ? <XCircle size={10} /> : <Clock size={10} />}
                                            {guide.status}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="flex flex-col p-5 grow">
                                        <h3 className="text-zinc-900 dark:text-[#EDEEF0] font-semibold text-base mb-1.5 line-clamp-1">
                                            {guide.title}
                                        </h3>
                                        <p className="text-zinc-500 dark:text-[#888a8e] text-xs leading-relaxed mb-4 line-clamp-2">
                                            {guide.description}
                                        </p>

                                        {/* Document Context Details */}
                                        <div className="mt-auto space-y-2 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                                            <div className="flex items-center justify-between">
                                                <span>File Name:</span>
                                                <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{guide.mdFileName}</span>
                                            </div>
                                            <div className="flex items-center justify-between truncate">
                                                <span>Contributor:</span>
                                                <span className="text-zinc-700 dark:text-zinc-300 truncate max-w-[180px]">{guide.contributedBy}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="flex items-center justify-between bg-zinc-100/40 dark:bg-[#0a0a0c] px-4 py-3 border-t border-zinc-200 dark:border-zinc-900 text-xs font-mono">
                                        {/* Open Live Asset Link */}
                                        {guide.mdFileUrl ? (
                                            <a
                                                href={guide.mdFileUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                                                title="Open raw S3 file in new tab"
                                            >
                                                <ExternalLink size={13} />
                                                <span>View Live File</span>
                                            </a>
                                        ) : (
                                            <span className="text-zinc-400 text-[11px]">No URL</span>
                                        )}

                                        <button
                                            onClick={() => setEditingGuide(guide)}
                                            className="inline-flex items-center gap-1 px-3 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] rounded-lg text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer"
                                        >
                                            <Edit3 size={12} /> Edit / Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full text-center py-20 bg-zinc-50/50 dark:bg-[#0c0c0e]/30 border border-dashed border-zinc-200 dark:border-zinc-900 rounded-2xl select-none">
                            <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">
                                No unverified guide contributions awaiting moderation.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT & MODERATE GUIDE MODAL */}
            {editingGuide && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-lg bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-5">
                            <div>
                                <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Edit Contribution</h2>
                                <p className="text-xs font-mono text-zinc-400">ID: {editingGuide._id}</p>
                            </div>
                            <button
                                onClick={() => setEditingGuide(null)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleUpdateGuide} className="space-y-4">
                            {/* File Name */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Markdown File Name
                                </label>
                                <input
                                    type="text"
                                    value={editingGuide.mdFileName}
                                    onChange={(e) => setEditingGuide({ ...editingGuide, mdFileName: e.target.value })}
                                    className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs font-mono text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700"
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
                                    className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700"
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
                                    className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 resize-none"
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
                                    <div className="relative flex items-center bg-zinc-50 dark:bg-[#070708] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                                        <select
                                            value={editingGuide.categoryOfGuide.toLowerCase()}
                                            onChange={(e) => setEditingGuide({ ...editingGuide, categoryOfGuide: e.target.value })}
                                            className="w-full bg-transparent p-2.5 pr-8 text-xs text-zinc-900 dark:text-white focus:outline-none appearance-none cursor-pointer relative z-10"
                                        >
                                            {categories.map((cat) => (
                                                <option key={cat} value={cat} className="bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200">
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
                                    <div className="relative flex items-center bg-zinc-50 dark:bg-[#070708] rounded-xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                                        <select
                                            value={editingGuide.typeOfGuide}
                                            onChange={(e) => setEditingGuide({ ...editingGuide, typeOfGuide: e.target.value })}
                                            className="w-full bg-transparent p-2.5 pr-8 text-xs text-zinc-900 dark:text-white focus:outline-none appearance-none cursor-pointer relative z-10 font-mono"
                                        >
                                            {guideTypes.map((gt) => (
                                                <option key={gt} value={gt} className="bg-white dark:bg-[#121214] text-zinc-800 dark:text-zinc-200">
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
                                            className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all cursor-pointer ${editingGuide.status === st
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
                                    className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer shadow-md disabled:opacity-50"
                                >
                                    <Save size={13} /> {isSaving ? "Saving..." : "Save & Commit"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}