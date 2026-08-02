// import hooks
import { useState, useEffect } from "react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import components
import HeaderControl from "../sections/manage-contributions/HeaderControls";
import ContributionGrid from "../sections/manage-contributions/ContribututionGrid";
import EditGuideModel from "../sections/manage-contributions/EditGuideModel";

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

// guide and category types
const guideTypes = ["SCAFFOLD", "INTEGRATION", "CONFIG", "DOTFILES"];
const categories = ["frontend", "backend", "fullstack", "devops"];

// manage contributions page
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
            {/* toast container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* navbar */}
            <Navbar />

            <div className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white min-h-screen py-24 transition-colors duration-300">
                <div className="w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-start justify-start">
                    {/* Header Controls */}
                    <HeaderControl
                        fetchPendingGuides={fetchPendingGuides}
                        isLoading={isLoading}
                    />

                    {/* Pending Guides Grid / List */}
                    {isLoading ? (
                        <div className="w-full text-center py-20 font-mono text-zinc-400 text-xs tracking-wide">
                            Synchronizing contribution moderation pipeline...
                        </div>
                    ) : guides.length > 0 ? (
                        <ContributionGrid
                            guides={guides}
                            setEditingGuide={setEditingGuide}
                        />
                    ) : (
                        <div
                            className="w-full text-center py-20 bg-zinc-50/50 dark:bg-[#0c0c0e]/30 border border-dashed border-zinc-200 
                            dark:border-zinc-900 rounded-2xl select-none"
                        >
                            <p className="text-sm font-medium text-zinc-400 dark:text-zinc-600">
                                No unverified guide contributions awaiting moderation.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* EDIT & MODERATE GUIDE MODAL */}
            {editingGuide && (
                <EditGuideModel
                    categories={categories}
                    editingGuide={editingGuide}
                    guideTypes={guideTypes}
                    handleUpdateGuide={handleUpdateGuide}
                    isSaving={isSaving}
                    setEditingGuide={setEditingGuide}
                />
            )}

            {/* footer */}
            <Footer />
        </>
    );
}