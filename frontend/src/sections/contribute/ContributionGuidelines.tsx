// import icons 
import { Code2, Clock, AlertTriangle, CheckCircle, FileText, Sparkles } from "lucide-react";

// rules data
const rules = [
    {
        icon: <AlertTriangle size={14} className="text-zinc-500" />,
        title: "Use the template",
        desc: "Download the starter shell structure to align with core engine schemas."
    },
    {
        icon: <Code2 size={14} className="text-zinc-500" />,
        title: "Fenced code blocks",
        desc: "Every command syntax line must contain appropriate language tags (e.g., bash, json)."
    },
    {
        icon: <Clock size={14} className="text-zinc-500" />,
        title: "Keep it current",
        desc: "Tag accurate framework releases. Outdated pipelines get automatically flagged."
    },
    {
        icon: <FileText size={14} className="text-zinc-500" />,
        title: "Define frontmatter",
        desc: "Include all metadata blocks at the top: title, description, category, and tech tags."
    },
    {
        icon: <CheckCircle size={14} className="text-zinc-500" />,
        title: "Verify commands",
        desc: "Test installation scripts locally before submitting to prevent broken runtime states."
    },
    {
        icon: <Sparkles size={14} className="text-zinc-500" />,
        title: "Clean explanations",
        desc: "Keep step descriptions brief and direct. Document *why* configuration steps matter."
    }
];

// contribution guidelines component
export default function ContributionGuidelines() {
    return (
        <div className="flex flex-col gap-4 lg:sticky lg:top-28 select-none">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-600 uppercase px-1">
                Registry Constraints
            </h4>

            {rules.map((rule, idx) => (
                <div
                    key={idx}
                    className="flex gap-3 p-4 bg-zinc-50/30 dark:bg-[#0a0a0c]/20 border border-zinc-200/60 dark:border-zinc-900/60 
                    rounded-xl transition-colors"
                >
                    <div
                        className="p-1.5 h-max rounded-md bg-zinc-100 dark:bg-zinc-900/50 border border-zinc-200 
                        dark:border-zinc-800/40 text-zinc-400 shrink-0"
                    >
                        {rule.icon}
                    </div>

                    <div className="flex flex-col">
                        <h5 className="text-xs font-bold font-mono tracking-wide text-zinc-800 dark:text-zinc-300 uppercase">{rule.title}</h5>
                        <p className="text-zinc-500 dark:text-[#888a8e] text-[11px] leading-relaxed mt-0.5">{rule.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}