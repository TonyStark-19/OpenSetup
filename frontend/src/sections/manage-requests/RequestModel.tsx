// import icons
import { X, Save, AlertCircle } from "lucide-react";

// import type
import type { SetupRequest } from "../../pages/ManageRequestsPage";

// request model props
interface RequestModelProps {
    selectedRequest: SetupRequest;
    setSelectedRequest: (selectedRequest: SetupRequest | null) => void;
    handleUpdateStatus: React.FormEventHandler<HTMLFormElement>;
    setTargetStatus: (targetStatus: string) => void;
    setStatusReason: (statusReason: string) => void;
    statusReason: string;
    targetStatus: string;
    isUpdating: boolean;
}

// request model component
export default function RequestModel(
    { selectedRequest, setSelectedRequest, handleUpdateStatus, setTargetStatus, setStatusReason, statusReason, targetStatus, isUpdating }: RequestModelProps
) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
            <div
                className="w-full max-w-md bg-white dark:bg-[#0d0d0f] border border-zinc-200 dark:border-zinc-800 rounded-2xl 
                shadow-2xl p-6 relative overflow-hidden"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800 mb-5">
                    <div>
                        <h2 className="text-base font-bold text-zinc-900 dark:text-white">Update Request Status</h2>
                        <p className="text-xs font-mono text-zinc-400">{selectedRequest.requestId}</p>
                    </div>

                    <button
                        onClick={() => setSelectedRequest(null)}
                        className="p-1 rounded-lg text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 
                        dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Modal Form */}
                <form
                    onSubmit={handleUpdateStatus}
                    className="space-y-4"
                >
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

                        <div className="grid grid-cols-4 gap-1.5">
                            {["Pending", "In progress", "Completed", "Rejected"].map((st) => (
                                <button
                                    key={st}
                                    type="button"
                                    onClick={() => {
                                        setTargetStatus(st);
                                        if (st === "Completed") {
                                            setStatusReason("Great news! Your requested guide setup has been completed and published.");
                                        } else if (st === "In progress") {
                                            setStatusReason("Yes, your guide is currently in work!");
                                        } else if (st === "Pending") {
                                            setStatusReason("Your request has been received and has not been worked on yet.");
                                        } else if (st === "Rejected" && !statusReason) {
                                            setStatusReason("");
                                        }
                                    }}
                                    className={`py-2 text-[10px] font-mono font-bold rounded-xl border transition-all cursor-pointer 
                                        ${targetStatus === st
                                            ? st === "Completed"
                                                ? "bg-emerald-600 text-white border-emerald-700"
                                                : st === "In progress"
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
                            <label
                                className="text-[10px] font-mono font-bold uppercase tracking-wide text-red-500 dark:text-red-400 
                                flex items-center gap-1"
                            >
                                <AlertCircle size={11} /> Rejection Reason (Required)
                            </label>

                            <textarea
                                value={statusReason}
                                onChange={(e) => setStatusReason(e.target.value)}
                                placeholder="Specify why this request was rejected..."
                                rows={3}
                                className="w-full bg-zinc-50 dark:bg-[#070708] border border-red-200 dark:border-red-900/40 
                                rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-red-400 
                                resize-none font-sans"
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
                                className="w-full bg-zinc-50 dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 
                                rounded-xl px-3.5 py-2.5 text-xs text-zinc-900 dark:text-white focus:outline-none focus:border-zinc-400 
                                dark:focus:border-zinc-700 resize-none font-sans"
                            />
                        </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-200 dark:border-zinc-800 mt-5">
                        <button
                            type="button"
                            onClick={() => setSelectedRequest(null)}
                            className="px-4 py-2 rounded-xl text-xs font-mono font-semibold text-zinc-500 hover:text-zinc-900 
                            dark:hover:text-white transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="px-5 py-2 bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] rounded-xl text-xs 
                            font-semibold flex items-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer 
                            shadow-md disabled:opacity-50"
                        >
                            <Save size={13} /> {isUpdating ? "Saving..." : "Save & Notify"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}