// import hooks
import { useState, useEffect } from "react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import components
import HeaderControl from "../sections/manage-requests/HeaderControl";
import RequestGrid from "../sections/manage-requests/RequestGrid";
import RequestModel from "../sections/manage-requests/RequestModel";

// Request Document Interface
export interface SetupRequest {
    _id: string;
    requestId: string;
    email: string;
    title: string;
    tags: string[];
    description?: string;
    status: "Pending" | "In progress" | "Completed" | "Rejected" | string;
    statusReason?: string;
    createdAt: string;
}

// API endpoint configuration
const BACKEND_URL = import.meta.env.VITE_BASE_URL;

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

// manage requests page
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
            const response = await fetch(`${BACKEND_URL}/api/requests/all`, {
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
            const response = await fetch(`${BACKEND_URL}/api/requests/update/${selectedRequest._id}`, {
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
            {/* toast container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* navbar */}
            <Navbar />

            <div className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white min-h-screen py-24 transition-colors duration-300">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start justify-start">
                    {/* Header Toolbar */}
                    <HeaderControl
                        fetchAllRequests={fetchAllRequests}
                        isLoading={isLoading}
                    />

                    {/* Request Cards Grid */}
                    {isLoading ? (
                        <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                            Synchronizing requests database...
                        </div>
                    ) : requests.length > 0 ? (
                        <RequestGrid
                            openStatusModal={openStatusModal}
                            requests={requests}
                        />
                    ) : (
                        <div
                            className="w-full text-center py-20 bg-zinc-50/50 dark:bg-[#0c0c0e]/30 border border-dashed 
                            border-zinc-200 dark:border-zinc-900 rounded-2xl select-none"
                        >
                            <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">
                                No active setup requests found in database.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* STATUS TOGGLE MODAL */}
            {selectedRequest && (
                <RequestModel
                    handleUpdateStatus={handleUpdateStatus}
                    isUpdating={isUpdating}
                    selectedRequest={selectedRequest}
                    setSelectedRequest={setSelectedRequest}
                    setStatusReason={setStatusReason}
                    setTargetStatus={setTargetStatus}
                    statusReason={statusReason}
                    targetStatus={targetStatus}
                />
            )}

            {/* footer */}
            <Footer />
        </>
    );
}