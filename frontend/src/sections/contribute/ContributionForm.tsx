// import usestate, useRef
import { useState, useRef } from "react";

// import type
import type { ChangeEvent, FormEvent } from "react";

// import icons
import { GitPullRequest } from "lucide-react";

// import toast utilities
import toast from "react-hot-toast";

// import components
import FormFields from "../../components/contribute/form/FormFields";
import UploadModal from "../../components/contribute/form/UploadModal";
import EditorModal from "../../components/contribute/form/EditorModal";
import UploadTabs from "../../components/contribute/form/UploadTabs";

// backend url
const BACKEND_URL = "http://localhost:5000/api/guides/contribute";

// aws url
const AWS_LAMBDA_URL = "https://p73dtulw63.execute-api.ap-south-1.amazonaws.com/get-upload-url";

// toast config
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

// contribute form
export default function ContributionForm() {
    const [fileName, setFileName] = useState("");
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState(""); // Category (e.g. frontend, backend)
    const [guideType, setGuideType] = useState(""); // Category type (e.g. SCAFFOLD, INTEGRATION)

    const [submissionType, setSubmissionType] = useState<"upload" | "editor">("upload");
    const [editorValue, setEditorValue] = useState("");
    const [editorViewMode, setEditorViewMode] = useState<"edit" | "preview">("edit");

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // System file selector event triggers
    const triggerFileBrowser = () => {
        fileInputRef.current?.click();
    };

    // handle file change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const targetFile = selectedFiles[0];
            if (targetFile.name.endsWith(".md")) {
                setUploadedFile(targetFile);
                setFileName(targetFile.name);
            } else {
                toast.error("Please provide valid markdown documents (.md) exclusively.", toastConfig);
            }
        }
    };

    // Form Submission orchestrating AWS S3 and Express Backend Integration
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        // 1. Initial Validation Rules Check
        if (!title.trim() || !desc.trim() || !category.trim() || !guideType.trim() || !fileName.trim()) {
            toast.error("Please fulfill all form metadata parameters rows.", toastConfig);
            return;
        }

        // Validate filename extension
        if (!fileName.toLowerCase().endsWith(".md")) {
            toast.error("File name must end with .md extension.", toastConfig);
            return;
        }

        if (submissionType === "upload" && !uploadedFile) {
            toast.error("Please drop or browse a configuration file to upload.", toastConfig);
            return;
        }

        if (submissionType === "editor" && !editorValue.trim()) {
            toast.error("The workspace code editor context cannot be empty.", toastConfig);
            return;
        }

        const token = localStorage.getItem("authToken");
        if (!token) {
            toast.error("Authentication expired. Please sign in to log contributions.", toastConfig);
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Processing upload configurations pipeline...", toastConfig);

        try {
            let uploadTargetBlob: Blob | File;

            // Prepare payload data depending on chosen interface workspace tab
            if (submissionType === "editor") {
                uploadTargetBlob = new Blob([editorValue], { type: "text/markdown" });
            } else {
                uploadTargetBlob = uploadedFile!;
            }

            // 2. Step One: Trigger AWS Lambda tunnel to receive secure pre-signed PUT parameters URL
            const awsResponse = await fetch(AWS_LAMBDA_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ filename: fileName.trim() })
            });
            const awsData = await awsResponse.json();

            if (!awsResponse.ok || !awsData.success) {
                throw new Error(awsData.message || "Failed gathering S3 pre-signed parameters handshake.");
            }

            const { uploadUrl, fileUrl, mdFileName: cleanedName } = awsData;

            // 3. Step Two: Stream file binary parameters directly into target S3 bucket via PUT payload command
            const s3PutResponse = await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": "text/markdown" },
                body: uploadTargetBlob
            });

            if (!s3PutResponse.ok) {
                throw new Error("AWS S3 bucket rejected workspace text binary stream transfer.");
            }

            // 4. Step Three: Commit configuration indexing parameters record inside database collection tracking
            const backendResponse = await fetch(BACKEND_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    mdFileName: cleanedName,
                    title: title.trim(),
                    description: desc.trim(),
                    typeOfGuide: guideType.toUpperCase(),
                    categoryOfGuide: category,
                    mdFileUrl: fileUrl
                })
            });

            const backendData = await backendResponse.json();

            if (!backendResponse.ok) {
                throw new Error(backendData.message || "Configuration database repository write rejected.");
            }

            // 5. Success UI Lifecycle updates
            toast.success("Guide logged and sent for verification review!", { ...toastConfig, id: toastId });

            // Cleanup input parameters states fields values
            setTitle("");
            setDesc("");
            setCategory("");
            setGuideType("");
            setFileName("");
            setUploadedFile(null);
            setEditorValue("");

        } catch (err: any) {
            toast.error(err.message || "Contribution sequence pipeline aborted.", { ...toastConfig, id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="w-full bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 
            rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl transition-all"
        >
            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Form fields component with category and category type state handlers */}
                <FormFields
                    category={category}
                    setCategory={setCategory}
                    guideType={guideType}
                    setGuideType={setGuideType}
                    desc={desc}
                    setDesc={setDesc}
                    fileInputRef={fileInputRef}
                    fileName={fileName}
                    setFileName={setFileName}
                    handleFileChange={handleFileChange}
                    title={title}
                    setTitle={setTitle}
                />

                {/* File Workspace Component Tab Controllers */}
                <div className="pt-4 flex flex-col gap-4">
                    <div
                        className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase 
                        border-b border-zinc-200 dark:border-zinc-900 pb-2 select-none"
                    >
                        Guide Content File
                    </div>

                    {/* upload tabs */}
                    <UploadTabs
                        setSubmissionType={setSubmissionType}
                        submissionType={submissionType}
                    />

                    {submissionType === "upload" ? (
                        <UploadModal
                            triggerFileBrowser={triggerFileBrowser}
                            uploadedFile={uploadedFile}
                        />
                    ) : (
                        <EditorModal
                            desc={desc}
                            editorValue={editorValue}
                            editorViewMode={editorViewMode}
                            setEditorValue={setEditorValue}
                            setEditorViewMode={setEditorViewMode}
                            title={title}
                        />
                    )}
                </div>

                {/* Form Action Submissions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-900 mt-8 select-none">
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-600 font-mono">
                        <GitPullRequest size={12} />
                        Submit your guide for review.
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] px-6 py-3 rounded-xl 
                        text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 
                        dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <GitPullRequest size={14} /> {isSubmitting ? "Processing..." : "Submit for Review"}
                    </button>
                </div>
            </form>
        </div>
    );
}