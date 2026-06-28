// import usestate
import { useState } from "react";

// import usestate
import type { KeyboardEvent } from "react";

// import type
import type { RequestItem } from "./RequestsHero";

// Data mirroring user-specific list on image_33dc99.png
const INITIAL_MY_REQUESTS: RequestItem[] = [
    { id: "my1", title: "Mongoose + Express REST API setup", tags: ["MongoDB", "Express"], status: "Open" },
    { id: "my2", title: "Redux Toolkit with async thunks", tags: ["React", "Redux"], status: "In progress" },
];

// import components
import RequestForm from "../../components/request/make-request/RequestForm";
import RequestList from "../../components/request/make-request/RequestList";

// make request section
export default function MakeRequest() {
    // Form States
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState<string[]>(["MongoDB", "Express"]);
    const [currentTagInput, setCurrentTagInput] = useState("");
    const [context, setContext] = useState("");

    // List States
    const [myRequests, setMyRequests] = useState<RequestItem[]>(INITIAL_MY_REQUESTS);

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

    // Form Submission Handling
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const newRequest: RequestItem = {
            id: `user-${Date.now()}`,
            title: title.trim(),
            tags: tags.length > 0 ? tags : ["General"],
            status: "Open"
        };

        setMyRequests([newRequest, ...myRequests]);
        setTitle("");
        setContext("");
        setTags(["MongoDB", "Express"]);
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
                <RequestList myRequests={myRequests} />
            </div>
        </div>
    )
}