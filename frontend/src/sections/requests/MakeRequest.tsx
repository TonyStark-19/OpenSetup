// import hooks
import { useState } from "react";

// import types
import type { KeyboardEvent } from "react";
import type { RequestItem } from "./RequestsHero";

// import toast utilities
import toast from "react-hot-toast";

// import components
import RequestForm from "../../components/request/make-request/RequestForm";
import RequestList from "../../components/request/make-request/RequestList";

const BACKEND_URL = import.meta.env.VITE_BASE_URL;

// Dynamic theme-aware configuration options for react-hot-toast
const toastConfig = {
    style: {
        background: document.documentElement.classList.contains("dark") ? "#161619" : "#ffffff",
        color: document.documentElement.classList.contains("dark") ? "#EDEEF0" : "#18181b",
        border: document.documentElement.classList.contains("dark") ? "1px solid #262629" : "1px solid #e4e4e7",
        fontSize: "13px",
        borderRadius: "12px",
        padding: "12px 16px",
    },
    success: {
        iconTheme: {
            primary: "#10B981",
            secondary: "#ffffff",
        },
    },
    error: {
        iconTheme: {
            primary: "#EF4444",
            secondary: "#ffffff",
        },
    },
};

// make request section
export default function MakeRequest() {
    // Form States
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>(["MongoDB", "Express"]);
    const [currentTagInput, setCurrentTagInput] = useState("");
    const [context, setContext] = useState("");

    // List States 
    const [myRequests, setMyRequests] = useState<RequestItem[]>([]);

    // Dynamic Tag Addition Handling
    const handleAddTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === "Enter" || e.key === ",") && currentTagInput.trim()) {
            e.preventDefault();
            if (!tags.includes(currentTagInput.trim())) {
                setTags([...tags, currentTagInput.trim()]);
            }
            setCurrentTagInput("");
        }
    };

    // handle remove tag
    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    // Integrated Backend Form Submission Handling
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("You must be logged in to make a request.", toastConfig);
            return;
        }

        const toastId = toast.loading("Submitting blueprint request...", toastConfig);

        try {
            const response = await fetch(`${BACKEND_URL}/api/requests`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: title.trim(),
                    tags: tags.length > 0 ? tags : ["General"],
                    description: context.trim()
                })
            });

            const resData = await response.json();

            if (!response.ok) {
                throw new Error(resData.message || "Failed to submit request.");
            }

            // Map data record onto local interface array state structures
            const newRequest: RequestItem = {
                id: resData.data.requestId,
                title: resData.data.title,
                tags: resData.data.tags,
                status: resData.data.status
            };

            setMyRequests([newRequest, ...myRequests]);

            toast.success("Blueprint request logged successfully!", { ...toastConfig, id: toastId });

            // Clear form field variables context values
            setTitle("");
            setContext("");
            setTags(["MongoDB", "Express"]);

        } catch (err: any) {
            const errorMsg = err.message || "Unable to log data request on authorization server.";
            toast.error(errorMsg, { ...toastConfig, id: toastId });
        }
    };

    return (
        <div
            className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white pb-16 pt-6 flex flex-col items-center 
            justify-start transition-colors duration-300"
        >
            {/* Split Grid for Content Forms & Requests Panel */}
            <div className="w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
                {/* INPUT FORM ELEMENT AREA */}
                <RequestForm
                    context={context}
                    currentTagInput={currentTagInput}
                    handleAddTag={handleAddTag}
                    handleRemoveTag={handleRemoveTag}
                    handleSubmit={handleSubmit}
                    setContext={setContext}
                    setCurrentTagInput={setCurrentTagInput}
                    setTitle={setTitle}
                    tags={tags}
                    title={title}
                />

                {/* PERSONAL REQUEST LOG ACCORDION PANEL */}
                <RequestList
                    myRequests={myRequests}
                    setMyRequests={setMyRequests}
                />
            </div>
        </div>
    );
}