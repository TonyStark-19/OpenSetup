// import icons
import { FaSearch, FaRegCheckCircle } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { LuGitPullRequest } from "react-icons/lu";
import { FaCodeCommit } from "react-icons/fa6";

// steps grid component
export default function StepsGrid({ stacks }: { stacks: string[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 mt-20 gap-x-10 gap-y-16 w-full">
            {/* Browse the catalog */}
            <div className="flex flex-col justify-start items-start w-full group px-5">
                <div className="w-full flex items-center gap-4 mb-6">
                    <span className=" text-xs border border-neutral-800 px-2 py-1 text-neutral-300 rounded-sm bg-[#0e0e10]">
                        01
                    </span>

                    <div className="h-px bg-neutral-900 grow" />
                </div>

                <div className="flex flex-row items-center gap-3 mb-3 text-neutral-100">
                    <FaSearch size={15} className="text-neutral-400 group-hover:text-neutral-200 transition-colors" />
                    <h3 className="text-lg font-bold">Browse the catalog</h3>
                </div>

                <p className="text-neutral-400 text-[13px] leading-relaxed mb-6 min-h-15">
                    Browse or search guides by technology, category, or use case. From full stack scaffolds to single library setups.
                </p>

                {/* Stacks Container */}
                <div className="flex flex-row gap-2 flex-wrap w-full">
                    {stacks.map((stack, idx) => (
                        <div
                            key={idx}
                            className={`border border-neutral-800 bg-[#0e0e10] px-2 py-0.5 rounded-sm 
                                        ${stack === "DOCKER" ? "border-emerald-950 bg-emerald-950/20"
                                    : ""
                                }`}
                        >
                            <h4 className={`text-[10px] tracking-wider font-medium 
                                    ${stack === "DOCKER" ? "text-[#4ade80]"
                                    : "text-neutral-400"
                                }`}
                            >
                                {stack}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>

            {/* Rendered or Raw */}
            <div className="flex flex-col justify-start items-start w-full group px-5">
                <div className="w-full flex items-center gap-4 mb-6">
                    <span className=" text-xs border border-neutral-800 px-2 py-1 text-neutral-300 rounded-sm bg-[#0e0e10]">
                        02
                    </span>

                    <div className="h-px bg-neutral-900 grow" />
                </div>

                <div className="flex flex-row items-center gap-3 mb-3 text-neutral-100">
                    <FiFileText size={16} className="text-neutral-400 group-hover:text-neutral-200 transition-colors" />
                    <h3 className="text-lg font-bold">Rendered or Raw</h3>
                </div>

                <p className="text-neutral-400 text-[13px] leading-relaxed mb-6 min-h-15">
                    Open any guide and read it in rendered preview or switch to raw markdown. Copy code with one click.
                </p>

                {/* Interactive IDE Command Output */}
                <div className="w-full bg-black border-2 border-[#252628] rounded-sm p-4  text-[11px] flex flex-col gap-3 shadow-inner">
                    <div className="flex flex-row gap-1.5">
                        <div className="w-1.5 h-1.5 bg-[#ef4444]/40 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-[#eab308]/40 rounded-full" />
                        <div className="w-1.5 h-1.5 bg-[#22c55e]/40 rounded-full" />
                    </div>

                    <p className="text-neutral-300 tracking-wide text-[12px]">
                        <span className="text-[#4ade80]">$</span> npx create-setup@latest
                    </p>
                </div>
            </div>

            {/* Join the Registry */}
            <div className="flex flex-col justify-start items-start w-full group px-5">
                {/* Number Header */}
                <div className="w-full flex items-center gap-4 mb-6">
                    <span className=" text-xs border border-neutral-800 px-2 py-1 text-neutral-300 rounded-sm bg-[#0e0e10]">
                        03
                    </span>

                    <div className="h-px bg-neutral-900 grow" />
                </div>

                <div className="flex flex-row items-center gap-3 mb-3 text-neutral-100">
                    <LuGitPullRequest size={16} className="text-neutral-400 group-hover:text-neutral-200 transition-colors" />
                    <h3 className="text-lg font-bold">Join the Registry</h3>
                </div>

                <p className="text-neutral-400 text-[13px] leading-relaxed mb-6 min-h-15">
                    Know a setup others would find useful? Write it in markdown and open a GitHub PR. Get merged and credited.
                </p>

                {/* Git / PR Log Terminal Components */}
                <div className="w-full flex flex-col gap-2">
                    {/* PR Commit Block */}
                    <div
                        className="w-full border border-neutral-900 bg-black/40 px-3 py-2 rounded-sm flex items-center gap-2.5  
                        text-[12px] text-neutral-400"
                    >
                        <FaCodeCommit size={16} />
                        <span>feat: add rust-tokio-setup.md</span>
                    </div>

                    {/* Approval Status Block */}
                    <div
                        className="w-full border border-neutral-900 bg-black/40 px-3 py-2 rounded-sm flex items-center gap-2.5 
                        text-[12px] text-neutral-400"
                    >
                        <FaRegCheckCircle size={14} className="text-[#4ade80]" />
                        <span>Review approved by <span className="text-neutral-300">@maintainer</span></span>
                    </div>
                </div>
            </div>

        </div>
    )
}