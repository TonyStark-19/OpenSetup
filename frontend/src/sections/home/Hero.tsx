// import sections
import DotGrid from "../../components/utils/DotGrid";
import Content from "../../components/home/hero/Content";
import GuidePanel from "./GuidePanel";

// hero section
export default function Hero() {
    return (
        <div
            className="relative bg-white dark:bg-[#0a0a0a] flex flex-col justify-center items-center min-h-screen 
            overflow-hidden px-4 transition-colors duration-300 pb-10"
            style={{
                backgroundImage: `
                radial-gradient(circle at 50% 100%, rgba(70, 85, 110, 0.5) 0%, transparent 80%),
                radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.4) 0%, transparent 70%),
                radial-gradient(circle at 50% 100%, rgba(181, 184, 208, 0.3) 0%, transparent 80%)`,
            }}
        >
            {/* Dot Grid Layer */}
            <DotGrid />

            {/* Content Container */}
            <Content />

            {/* setup guide panel wrapper targeting internal layouts */}
            <div className="w-full max-w-7xl relative z-20 px-2 mt-4">
                <GuidePanel />
            </div>
        </div>
    );
}