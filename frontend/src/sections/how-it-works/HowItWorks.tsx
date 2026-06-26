// stacks data
const stacks = ["NEXT.JS 14", "TYPESCRIPT", "TAILWIND", "DOCKER"];

// import components
import Header from "../../components/home/how-it-works/Header";
import StepsGrid from "../../components/home/how-it-works/StepsGrid";

// how it works section
export default function HowItWorks() {
    return (
        <div
            className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white py-24 px-6 md:px-12 
            lg:px-20 flex justify-center items-center selection:bg-emerald-500/10 dark:selection:bg-[#4ade80]/20 transition-colors duration-300"
        >
            <div className="max-w-7xl w-full flex flex-col">
                {/* header */}
                <Header />

                {/* steps grid */}
                <StepsGrid stacks={stacks} />
            </div>
        </div>
    );
}