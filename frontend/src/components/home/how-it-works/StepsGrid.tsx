// import icons
import { FaSearch, FaRegCheckCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { LuGitPullRequest } from "react-icons/lu";
import { FaCodeCommit } from "react-icons/fa6";

// steps grid component
export default function StepsGrid({ stacks }: { stacks: string[] }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-20 gap-x-10 gap-y-16 w-full">
            {/* Step 01: Browse the catalog */}
            <div className="flex flex-col justify-start items-start w-full group px-2">
                <div className="w-full flex items-center gap-4 mb-6 select-none">
                    <span
                        className="text-xs font-mono font-bold border border-zinc-200 dark:border-zinc-800 
                        px-2.5 py-1 text-zinc-500 dark:text-zinc-400 rounded-md bg-zinc-50 dark:bg-[#0e0e10] transition-colors"
                    >
                        01
                    </span>

                    <div className="h-px bg-zinc-200 dark:bg-zinc-900 grow transition-colors" />
                </div>

                <div className="flex flex-row items-center gap-3 mb-3 text-zinc-900 dark:text-neutral-100 transition-colors">
                    <FaSearch
                        size={14}
                        className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors"
                    />

                    <h3 className="text-lg font-bold tracking-tight">Browse the catalog</h3>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed mb-6 min-h-15 transition-colors">
                    Browse or search guides by technology, category, or use case. From full stack scaffolds to single library setups.
                </p>

                {/* Stacks Pills */}
                <div className="flex flex-row gap-2 flex-wrap w-full select-none">
                    {stacks.map((stack, idx) => {
                        const isDocker = stack === "DOCKER";
                        return (
                            <div
                                key={idx}
                                className={`border px-2.5 py-0.5 rounded-md font-mono transition-colors shadow-sm dark:shadow-none 
                                ${isDocker
                                        ? "border-emerald-200 dark:border-emerald-950 bg-emerald-50 dark:bg-emerald-950/20"
                                        : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0e0e10]"
                                    }`}
                            >
                                <h4
                                    className={`text-[10px] tracking-wider font-bold 
                                    ${isDocker
                                            ? "text-emerald-600 dark:text-[#4ade80]"
                                            : "text-zinc-500 dark:text-zinc-400"
                                        }`}
                                >
                                    {stack}
                                </h4>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Step 02: Rendered or Raw */}
            <div className="flex flex-col justify-start items-start w-full group px-2">
                <div className="w-full flex items-center gap-4 mb-6 select-none">
                    <span
                        className="text-xs font-mono font-bold border border-zinc-200 dark:border-zinc-800 
                        px-2.5 py-1 text-zinc-500 dark:text-zinc-400 rounded-md bg-zinc-50 dark:bg-[#0e0e10] transition-colors"
                    >
                        02
                    </span>

                    <div className="h-px bg-zinc-200 dark:bg-zinc-900 grow transition-colors" />
                </div>

                <div className="flex flex-row items-center gap-3 mb-3 text-zinc-900 dark:text-neutral-100 transition-colors">
                    <FiFileText
                        size={15}
                        className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors"
                    />

                    <h3 className="text-lg font-bold tracking-tight">Rendered or Raw</h3>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed mb-6 min-h-15 transition-colors">
                    Open any guide and read it in rendered preview or switch to raw markdown. Copy code with one click.
                </p>

                {/* Interactive Dynamic IDE Terminal Block */}
                <div
                    className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-[#252628] 
                    p-4 text-[11px] flex flex-col gap-3 shadow-sm dark:shadow-inner transition-all duration-300"
                >
                    <div className="flex flex-row gap-1.5 select-none">
                        <div className="w-1.5 h-1.5 bg-red-500/50 dark:bg-[#ef4444]/40 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-amber-500/50 dark:bg-[#eab308]/40 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-emerald-500/50 dark:bg-[#22c55e]/40 rounded-full" />
                    </div>

                    <p className="text-zinc-700 dark:text-zinc-300 tracking-wide text-[12px] font-mono">
                        <span className="text-emerald-600 dark:text-[#4ade80] select-none">$</span> npx create-setup@latest
                    </p>
                </div>
            </div>

            {/* Step 03: Join the Registry */}
            <div className="flex flex-col justify-start items-start w-full group px-2">
                <div className="w-full flex items-center gap-4 mb-6 select-none">
                    <span
                        className="text-xs font-mono font-bold border border-zinc-200 dark:border-zinc-800 
                        px-2.5 py-1 text-zinc-500 dark:text-zinc-400 rounded-md bg-zinc-50 dark:bg-[#0e0e10] transition-colors"
                    >
                        03
                    </span>

                    <div className="h-px bg-zinc-200 dark:bg-zinc-900 grow transition-colors" />
                </div>

                <div className="flex flex-row items-center gap-3 mb-3 text-zinc-900 dark:text-neutral-100 transition-colors">
                    <LuGitPullRequest
                        size={15}
                        className="text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors"
                    />

                    <h3 className="text-lg font-bold tracking-tight">Join the Registry</h3>
                </div>

                <p className="text-zinc-500 dark:text-zinc-400 text-[13px] leading-relaxed mb-6 min-h-15 transition-colors">
                    Know a setup others would find useful? Write it in Markdown and submit it for review. If approved, it will be published with credit to you.
                </p>

                {/* Git Log Dynamic Logs */}
                <div className="w-full flex flex-col gap-2 font-mono text-[12px]">
                    {/* Commit Line */}
                    <div
                        className="w-full border border-zinc-200 dark:border-zinc-900/60 bg-zinc-50 dark:bg-black/40 
                        px-3 py-2 flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 transition-colors shadow-sm dark:shadow-none"
                    >
                        <FaCodeCommit size={14} className="text-zinc-400 dark:text-zinc-500" />
                        <span className="truncate">feat: add rust-tokio-setup.md</span>
                    </div>

                    {/* PR Approval Line */}
                    <div
                        className="w-full border border-zinc-200 dark:border-zinc-900/60 bg-zinc-50 dark:bg-black/40 
                        px-3 py-2 flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 transition-colors shadow-sm dark:shadow-none"
                    >
                        <FaRegCheckCircle size={13} className="text-emerald-600 dark:text-[#4ade80] shrink-0" />
                        <span className="truncate">Approved by <span className="text-zinc-800 dark:text-zinc-300 font-medium">@maintainer</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}