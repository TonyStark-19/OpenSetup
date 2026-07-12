// import icons
import { Terminal } from "lucide-react";

// import type
import type { ReactNode } from "react";

// info props
interface Feature {
    icon: ReactNode;
    title: string;
    description: string;
}

interface InfoProps {
    features: Feature[];
}

// info component
export default function Info({ features }: InfoProps) {
    return (
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 max-w-lg mx-auto lg:mx-0">
            <div
                className="flex flex-row items-center gap-2.5 text-[14px] font-semibold text-zinc-900 dark:text-[#EDEEF0] 
                tracking-tight select-none transition-colors"
            >
                <Terminal size={15} className="text-zinc-500 dark:text-[#888a8e]" />
                OpenSetup
            </div>

            <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-[#EDEEF0] leading-[1.15] transition-colors">
                    The open repository <br /> for developer setups.
                </h2>

                <p className="text-zinc-500 dark:text-[#888a8e] text-[14px] leading-relaxed transition-colors">
                    Stop digging through outdated documentation or scattering configurations across project directories. Access structured environment setups instantly.
                </p>
            </div>

            <hr className="border-zinc-200 dark:border-[#262629]/40 w-full transition-colors" />

            {/* Features Stack */}
            <div className="space-y-4">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-3"
                    >
                        <div
                            className="mt-0.5 p-2 rounded-lg bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-[#262629]/60 
                            flex shrink-0 transition-colors shadow-sm dark:shadow-none"
                        >
                            {feature.icon}
                        </div>

                        <div>
                            <h4 className="text-[13px] font-semibold text-zinc-900 dark:text-[#EDEEF0] transition-colors">
                                {feature.title}
                            </h4>

                            <p className="text-zinc-500 dark:text-[#888a8e] text-xs mt-0.5 transition-colors">
                                {feature.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}