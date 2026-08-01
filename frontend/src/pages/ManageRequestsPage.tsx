import { useState, useEffect } from "react";
import {
    RefreshCw,
    Clock,
    CheckCircle2,
    XCircle,
    Tag as TagIcon,
    User,
    Calendar,
    X,
    Save,
    SlidersHorizontal,
    AlertCircle
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Request Document Interface
export interface SetupRequest {
    _id: string;
    requestId: string;
    email: string;
    title: string;
    tags: string[];
    description?: string;
    status: "Pending" | "In progress" | "Rejected" | string;
    statusReason?: string;
    createdAt: string;
}

// API endpoint configuration
const BACKEND_URL = "http://localhost:5000/api/requests";

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

export default function ManageRequestsPage() {
    const [requests, setRequests] = useState<SetupRequest[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Modal Status Management State
    const [selectedRequest, setSelectedRequest] = useState<SetupRequest | null>(null);
    const [targetStatus, setTargetStatus] = useState<string>("Pending");
    const [statusReason, setStatusReason] = useState<string>("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Fetch all user requests
    const fetchAllRequests = async () => {
        setIsLoading(true);
        const token = localStorage.getItem("authToken");

        try {
            const response = await fetch(`${BACKEND_URL}/all`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const resData = await response.json();

            if (response.ok && resData.success) {
                setRequests(resData.data);
            } else {
                toast.error(resData.message || "Failed to retrieve request records.", toastConfig);
            }
        } catch (err) {
            console.error("Error loading system requests:", err);
            toast.error("Network error synchronizing request queue.", toastConfig);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAllRequests();
    }, []);

    // Open status management modal
    const openStatusModal = (req: SetupRequest) => {
        setSelectedRequest(req);
        setTargetStatus(req.status || "Pending");
        setStatusReason(req.statusReason || "");
    };

    // Commit Status Toggle & Optional Reason to Backend
    const handleUpdateStatus = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRequest) return;

        // Validation for Rejection status
        if (targetStatus === "Rejected" && !statusReason.trim()) {
            toast.error("A rejection reason must be specified before rejecting.", toastConfig);
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Authentication session expired. Please log in.", toastConfig);
            return;
        }

        setIsUpdating(true);
        const toastId = toast.loading("Updating status & notifying user...", toastConfig);

        try {
            const response = await fetch(`${BACKEND_URL}/update/${selectedRequest._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    status: targetStatus,
                    reason: statusReason.trim()
                })
            });

            const resData = await response.json();

            if (response.ok && resData.success) {
                toast.success("Request status updated & user notified!", { ...toastConfig, id: toastId });
                setSelectedRequest(null);
                fetchAllRequests();
            } else {
                toast.error(resData.message || "Failed updating status.", { ...toastConfig, id: toastId });
            }
        } catch (err) {
            console.error("Error committing request update:", err);
            toast.error("Network error processing status update.", { ...toastConfig, id: toastId });
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            <Navbar />

            <div className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white min-h-screen py-24 transition-colors duration-300">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start justify-start">

                    {/* Header Toolbar */}
                    <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800/80 pb-6 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                                    <SlidersHorizontal size={15} />
                                </span>
                                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-[#EDEEF0]">
                                    Manage Setup Requests
                                </h1>
                            </div>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                                Review user feature requests and update lifecycle status states
                            </p>
                        </div>

                        <button
                            onClick={fetchAllRequests}
                            disabled={isLoading}
                            className="inline-flex items-center gap-2 px-3.5 py-2 bg-zinc-100 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all cursor-pointer select-none active:scale-[0.98]"
                        >
                            <RefreshCw size={13} className={isLoading ? "animate-spin" : ""} />
                            Sync Requests
                        </button>
                    </div>

                    {/* Request Cards Grid */}
                    {isLoading ? (
                        <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                            Synchronizing requests database...
                        </div>
                    ) : requests.length > 0 ? (
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {requests.map((req) => (
                                <div
                                    key={req._id}
                                    className="flex flex-col bg-zinc-50/50 dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-900 rounded-2xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-800 transition-all shadow-sm dark:shadow-none"
                                >
                                    {/* Card Header Toolbar */}
                                    <div className="flex items-center justify-between bg-zinc-100/60 dark:bg-[#141416] px-4 py-3 border-b border-zinc-200 dark:border-zinc-900">
                                        <span className="text-[10px] font-mono font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                                            {req.requestId}
                                        </span>

                                        <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded flex items-center gap-1 ${req.status === "In progress"
                                                ? "bg-purple-50 dark:bg-purple-950/30 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900/40"
                                                : req.status === "Rejected"
                                                    ? "bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/30"
                                                    : "bg-amber-50 dark:bg-amber-950/20 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30"
                                            }`}>
                                            {req.status === "In progress" ? <CheckCircle2 size={10} /> : req.status === "Rejected" ? <XCircle size={10} /> : <Clock size={10} />}
                                            {req.status}
                                        </span>
                                    </div>

                                    {/* Card Body */}
                                    <div className="flex flex-col p-5 grow">
                                        <h3 className="text-zinc-900 dark:text-[#EDEEF0] font-semibold text-base mb-2">
                                            {req.title}
                                        </h3>

                                        <p className="text-zinc-500 dark:text-[#888a8e] text-xs leading-relaxed mb-4">
                                            {req.description || "No description provided."}
                                        </p>

                                        {/* Tags */}
                                        {req.tags && req.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4 select-none">
                                                {req.tags.map((tag, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="inline-flex items-center gap-1 bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 text-[10px] font-mono px-2 py-0.5 rounded border border-zinc-300/40 dark:border-zinc-700/40"
                                                    >
                                                        <TagIcon size={9} /> {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Status Reason Note if exists */}
                                        {req.statusReason && (
                                            <div className="mb-4 p-2.5 rounded-xl bg-zinc-100/70 dark:bg-[#121215] border border-zinc-200/80 dark:border-zinc-800/80 text-[11px] text-zinc-600 dark:text-zinc-400 font-mono">
                                                <span className="font-bold block text-[10px] text-zinc-400 uppercase mb-0.5">Note:</span>
                                                {req.statusReason}
                                            </div>
                                        )}

                                        {/* Requester Info */}
                                        <div className="mt-auto space-y-2 pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-800/80 font-mono text-[11px] text-zinc-400">
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1"><User size={11} /> Created By:</span>
                                                <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[180px]">{req.email}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="flex items-center gap-1"><Calendar size={11} /> Date:</span>
                                                <span className="text-zinc-700 dark:text-zinc-300">
                                                    {new Date(req.createdAt).toISOString().split("T")[0]}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Footer */}
                                    <div className="flex items-center justify-end bg-zinc-100/40 dark:bg-[#0a0a0c] px-4 py-3 border-t border-zinc-200 dark:border-zinc-900">
                                        <button
                                            onClick={() => openStatusModal(req)}
                                            className="px-3.5 py-1.5 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] rounded-lg text-xs font-mono font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer active:scale-[0.98]"
                                        >
                                            Toggle Status
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-full text-center py-20 bg-zinc-50/50 dark:bg-[#0c0c0e]/30 border border-dashed border-zinc-200 dark:border-zinc-900 rounded-2xl select-none">
                            <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">
                                No setup requests found in database.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* STATUS TOGGLE MODAL */}
            {selectedRequest && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl p-6 relative overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-5">
                            <div>
                                <h2 className="text-base font-bold text-zinc-900 dark:text-white">Update Request Status</h2>
                                <p className="text-xs font-mono text-zinc-400">{selectedRequest.requestId}</p>
                            </div>
                            <button
                                onClick={() => setSelectedRequest(null)}
                                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Modal Form */}
                        <form onSubmit={handleUpdateStatus} className="space-y-4">
                            {/* Request Info Box */}
                            <div className="p-3 rounded-xl bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800/80 text-xs">
                                <p className="font-semibold text-zinc-900 dark:text-white mb-0.5">{selectedRequest.title}</p>
                                <p className="text-zinc-500 text-[11px] font-mono">{selectedRequest.email}</p>
                            </div>

                            {/* Status Selector */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                    Select Status
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Pending", "In progress", "Rejected"].map((st) => (
                                        <button
                                            key={st}
                                            type="button"
                                            onClick={() => {
                                                setTargetStatus(st);
                                                if (st === "In progress") {
                                                    setStatusReason("Yes, your guide is currently in work!");
                                                } else if (st === "Pending") {
                                                    setStatusReason("Your request has been received and has not been worked on yet.");
                                                } else if (st === "Rejected" && !statusReason) {
                                                    setStatusReason("");
                                                }
                                            }}
                                            className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all cursor-pointer ${targetStatus === st
                                                    ? st === "In progress"
                                                        ? "bg-purple-600 text-white border-purple-700"
                                                        : st === "Rejected"
                                                            ? "bg-red-500 text-white border-red-600"
                                                            : "bg-amber-500 text-white border-amber-600"
                                                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                                }`}
                                        >
                                            {st}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Rejection / Note Input Field */}
                            {targetStatus === "Rejected" ? (
                                <div className="flex flex-col gap-1.5 animate-fade-in">
                                    <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-red-500 dark:text-red-400 flex items-center gap-1">
                                        <AlertCircle size={11} /> Rejection Reason (Required)
                                    </label>
                                    <textarea
                                        value={statusReason}
                                        onChange={(e) => setStatusReason(e.target.value)}
                                        placeholder="Specify why this request was rejected..."
                                        rows={3}
                                        className="w-full bg-zinc-50 dark:bg-[#070708] border border-red-200 dark:border-red-900/40 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-red-400 resize-none font-sans"
                                        required
                                    />
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                                        Status Note (Optional)
                                    </label>
                                    <textarea
                                        value={statusReason}
                                        onChange={(e) => setStatusReason(e.target.value)}
                                        placeholder="Add an update message to send to the requester..."
                                        rows={2}
                                        className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 resize-none font-sans"
                                    />
                                </div>
                            )}

                            {/* Form Actions */}
                            <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-5">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRequest(null)}
                                    className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isUpdating}
                                    className="px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer shadow-md disabled:opacity-50"
                                >
                                    <Save size={13} /> {isUpdating ? "Saving..." : "Save & Notify"}
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