// import react
import React from "react";

// stats data
const stats = [
    { count: "50+", title: "Setup guides" },
    { count: "20+", title: "Tech stacks" },
    { count: "100%", title: "Open source" },
]

// stats component
export default function Stats() {
    return (
        <div
            className="flex flex-row flex-wrap justify-center items-center gap-6 md:gap-14 border-t border-zinc-200 
            dark:border-[#262629]/60 py-6 mt-16 max-w-4xl w-[90%] px-4 z-10 select-none transition-colors duration-300"
        >
            {stats.map((stat, idx) => (
                <React.Fragment key={idx}>
                    <div className="flex flex-col justify-center items-center text-center">
                        <h4 className="text-zinc-900 dark:text-[#EDEEF0] text-xl md:text-2xl font-semibold tracking-tight transition-colors">
                            {stat.count}
                        </h4>

                        <p className="text-zinc-400 dark:text-[#525256] text-xs font-mono font-bold tracking-wide mt-0.5 uppercase transition-colors">
                            {stat.title}
                        </p>
                    </div>

                    {idx < stats.length - 1 && (
                        <span className="h-8 w-px bg-zinc-200 dark:bg-[#262629]/80 transition-colors" />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}