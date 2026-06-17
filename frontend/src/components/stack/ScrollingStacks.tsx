// import props
import type { StackItem } from "../../sections/stack/TechStacks";

// scrollstacks props
interface ScrollingStacks {
    firstRow: StackItem[],
    secondRow: StackItem[]
}

// Scrolling stacks component
export default function ScrollingStacks({ firstRow, secondRow }: ScrollingStacks) {
    return (
        <div className="relative w-full flex flex-col gap-4 mt-16 z-10 pointer-events-none select-none">
            {/* Visual Glass Edge Vignette Masking Layers */}
            <div className="absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-[#0a0a0a] to-transparent z-20" />
            <div className="absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-[#0a0a0a] to-transparent z-20" />

            {/* ROW 1: Scrolling Left */}
            <div className="flex w-max overflow-hidden">
                <div className="flex gap-4 px-2 animate-scroll-left whitespace-nowrap">
                    {[...firstRow, ...firstRow].map((stack, idx) => (
                        <div
                            key={`r1-${idx}`}
                            className="flex items-center gap-3 bg-[#121214]/60 border border-[#212124] rounded-xl px-5 py-2.5 backdrop-blur-sm min-w-37.5"
                        >
                            <img
                                src={`/stacks/${stack.icon}`}
                                alt={`${stack.name} icon`}
                                className="w-7 h-7 object-contain opacity-80"
                                onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                }}
                            />

                            <span className="text-[#b5b7ba] font-medium text-[14px] tracking-tight">{stack.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* ROW 2: Scrolling Right */}
            <div className="flex w-max overflow-hidden">
                <div className="flex gap-4 px-2 animate-scroll-right whitespace-nowrap">
                    {[...secondRow, ...secondRow].map((stack, idx) => (
                        <div
                            key={`r2-${idx}`}
                            className="flex items-center gap-3 bg-[#121214]/60 border border-[#212124] rounded-xl px-5 py-2.5 backdrop-blur-sm min-w-37.5"
                        >
                            <img
                                src={`/stacks/${stack.icon}`}
                                alt={`${stack.name} icon`}
                                className="w-7 h-7 object-contain opacity-80"
                                onError={(e) => {
                                    (e.target as HTMLElement).style.display = 'none';
                                }}
                            />

                            <span className="text-[#b5b7ba] font-medium text-[14px] tracking-tight">{stack.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}