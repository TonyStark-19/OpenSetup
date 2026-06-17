// import icons
import { Terminal } from "lucide-react";

// import type
import type { ReactNode } from "react";

// info props
interface Feature {
    icon: ReactNode,
    title: string,
    description: string
}

interface InfoProps {
    features: Feature[];
}

// info component
export default function Info({ features }: InfoProps) {
    return (
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 max-w-lg mx-auto lg:mx-0">
            <div className="flex flex-row items-center gap-2.5 text-[14px] font-semibold text-[#EDEEF0] tracking-tight select-none">
                <Terminal size={15} className="text-[#888a8e]" />
                OpenSetup
            </div>

            <div className="space-y-3">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#EDEEF0] leading-[1.15]">
                    The open repository <br /> for developer setups.
                </h2>

                <p className="text-[#888a8e] text-[14px] leading-relaxed">
                    Stop digging through outdated documentation or scattering configurations across project directories. Access structured environment setups instantly.
                </p>
            </div>

            <hr className="border-[#262629]/40 w-full" />

            {/* Cleaned Features Stack */}
            <div className="space-y-4">
                {features.map((feature, idx) => (
                    <div
                        key={idx}
                        className="flex items-start gap-3"
                    >
                        <div className="mt-0.5 p-2 rounded-lg bg-[#121214] border border-[#262629]/60 flex shrink-0">
                            {feature.icon}
                        </div>

                        <div>
                            <h4 className="text-[13px] font-semibold text-[#EDEEF0]">{feature.title}</h4>
                            <p className="text-[#888a8e] text-xs mt-0.5">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}