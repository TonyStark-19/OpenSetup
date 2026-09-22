// import sections
import DotGrid from "../../components/utils/DotGrid";
import Content from "../../components/home/hero/Content";
import GuidePanel from "./GuidePanel";

// hero section
export default function Hero() {
    return (
        <div
            className="relative bg-white dark:bg-[#0a0a0a] flex flex-col justify-center items-center min-h-screen 
            overflow-hidden px-4 transition-colors duration-300 sm:pb-10"
        >
            {/* LIGHT THEME GLOW LAYER (Yellow/Amber Subtle Blend) */}
            <div
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 opacity-100 dark:opacity-0 mix-blend-multiply"
                style={{
                    backgroundImage: `
                    radial-gradient(circle at 50% 100%, rgba(254, 240, 138, 0.6) 0%, transparent 75%),
                    radial-gradient(circle at 50% 100%, rgba(251, 191, 36, 0.25) 0%, transparent 85%),
                    radial-gradient(circle at 50% 100%, rgba(253, 230, 138, 0.4) 0%, transparent 70%)`,
                }}
            />

            {/* DARK THEME GLOW LAYER (Indigo/Slate Original Blend) */}
            <div
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500 opacity-0 dark:opacity-100 mix-blend-screen"
                style={{
                    backgroundImage: `
                    radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 80%),
                    radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
                    radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)`,
                }}
            />

            {/* Dot Grid Layer */}
            <DotGrid />

            {/* Content Container */}
            <Content />

            {/* setup guide panel wrapper targeting internal layouts */}
            <div className="w-full max-w-8xl relative z-20 px-2">
                <GuidePanel />
            </div>
        </div>
    );
}