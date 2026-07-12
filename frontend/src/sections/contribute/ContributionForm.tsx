// import usestate, useRef
import { useState, useRef } from "react";

// import type
import type { KeyboardEvent, ChangeEvent } from "react";

// import icons 
import { GitPullRequest } from "lucide-react";

// import components
import FormFields from "../../components/contribute/form/FormFields";
import UploadModal from "../../components/contribute/form/UploadModal";
import EditorModal from "../../components/contribute/form/EditorModal";
import UploadTabs from "../../components/contribute/form/UploadTabs";

// contribute form component
export default function ContributionForm() {
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

    // handle file change
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
        <div
            className="w-full bg-zinc-50/50 dark:bg-[#0d0d0f]/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-900 
            rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-2xl transition-all"
        >
            <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-6"
            >
                {/* form fields */}
                <FormFields
                    category={category}
                    desc={desc}
                    fileInputRef={fileInputRef}
                    fileName={fileName}
                    handleAddTag={handleAddTag}
                    handleFileChange={handleFileChange}
                    setCategory={setCategory}
                    setDesc={setDesc}
                    setFileName={setFileName}
                    setTagInput={setTagInput}
                    setTags={setTags}
                    setTitle={setTitle}
                    tagInput={tagInput}
                    tags={tags}
                    title={title}
                />

                {/* File Workspace Component Tab Controllers */}
                <div className="pt-4 flex flex-col gap-4">
                    <div
                        className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase 
                        border-b border-zinc-200 dark:border-zinc-900 pb-2"
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
                        className="w-full sm:w-auto bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] px-6 py-3 rounded-xl 
                        text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-zinc-800 
                        dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.99]"
                    >
                        <GitPullRequest size={14} /> Submit for Review
                    </button>
                </div>
            </form>
        </div>
    );
}