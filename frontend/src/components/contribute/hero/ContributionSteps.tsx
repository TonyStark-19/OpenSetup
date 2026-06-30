// import icons
import { ArrowRight } from "lucide-react";

// import type
import type { MainStepsProps } from "../../../sections/contribute/ContributeHero";

// contribution steps
export default function ContributionSteps({ mainSteps }: { mainSteps: MainStepsProps[] }) {
    return (
        <div className="w-full flex flex-col items-center mb-12 px-4 max-w-6xl mx-auto">
            <h4 className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-600 uppercase mb-12">
                How Contribution Works
            </h4>

            {/* Step Pipeline Tracking Layout */}
            <div className="relative w-full grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 lg:gap-6">
                {/* Horizontal connection line layout for desktop viewports */}
                <div
                    className="hidden md:block absolute top-10 left-[10%] right-[10%] h-0.5 border-t border-dashed border-zinc-200 
                    dark:border-zinc-800 z-0 group-hover:border-zinc-400 transition-colors"
                />

                {mainSteps.map((step, idx) => (
                    <div
                        key={idx}
                        className="flex flex-col items-center relative z-10 group/item text-center"
                    >
                        {/* Circular Node Icon Wrapper */}
                        <div
                            className={`w-20 h-20 rounded-full border-2 flex items-center justify-center mb-4 transition-all duration-300 
                            relative bg-white dark:bg-[#0a0a0a] group-hover/item:scale-110 shadow-sm
                            ${idx === 0 ? 'border-purple-500/40 dark:border-purple-500/30' : ''}
                            ${idx === 1 ? 'border-blue-500/40 dark:border-blue-500/30' : ''}
                            ${idx === 2 ? 'border-amber-500/40 dark:border-amber-500/30' : ''}
                            ${idx === 3 ? 'border-zinc-400/40 dark:border-zinc-600/30' : ''}
                            ${idx === 4 ? 'border-emerald-500/40 dark:border-emerald-500/30' : ''}
                            border-zinc-200 dark:border-zinc-800 group-hover/item:border-zinc-400 dark:group-hover/item:border-zinc-600`}
                        >
                            {/* Inner ambient subtle background color core matching data logic */}
                            <div className={`absolute inset-1 rounded-full opacity-10 transition-opacity group-hover/item:opacity-20 ${step.bg.split(' ')[0]}`} />

                            <div className="relative z-10 scale-150">
                                {step.icon}
                            </div>

                            {/* Node Step Count Bubble Tag badge */}
                            <span
                                className="absolute -top-1 -right-1 w-5 h-5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 
                                dark:border-zinc-800 rounded-full text-[9px] font-mono font-bold flex items-center justify-center text-zinc-500"
                            >
                                0{idx + 1}
                            </span>
                        </div>

                        {/* Text Metadata Parameters Header blocks */}
                        <h3
                            className="text-xs md:text-sm font-bold text-zinc-900 dark:text-zinc-200 group-hover/item:text-black 
                            dark:group-hover/item:text-white transition-colors"
                        >
                            {step.title}
                        </h3>

                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-1 max-w-37.5 leading-relaxed transition-colors">
                            {step.desc}
                        </p>

                        {/* Mobile view directional indicators */}
                        {idx < 4 && (
                            <div className="flex md:hidden items-center justify-center mt-4 text-zinc-300 dark:text-zinc-800 animate-pulse">
                                <ArrowRight size={14} className="rotate-90" />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}