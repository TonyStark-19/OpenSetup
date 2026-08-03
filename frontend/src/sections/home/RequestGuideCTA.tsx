// import components
import Actions from "../../components/home/cta/Actions";
import Info from "../../components/home/cta/Info";

// request guide cta section
export default function RequestGuideCTA() {
    return (
        <div
            className="relative flex flex-col justify-center items-center py-16 sm:py-28 bg-white dark:bg-[#0a0a0a] overflow-hidden px-6 md:px-16 
            lg:px-24 w-full border-t border-zinc-200 dark:border-zinc-900/80 transition-colors duration-300"
        >
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                {/* Left Side: Copy and Actions */}
                <Actions />

                {/* Right Side: Interactive Mock UI elements */}
                <Info />
            </div>
        </div>
    );
}