// stacks data
const stacks = ["NEXT.JS 14", "TYPESCRIPT", "TAILWIND", "DOCKER"];

// import components
import Header from "../../components/home/how-it-works/Header";
import StepsGrid from "../../components/home/how-it-works/StepsGrid";

export default function HowItWorks() {
    return (
        <div
            className="w-full bg-[#0a0a0a] text-white py-24 px-6 md:px-12 lg:px-20 flex justify-center items-center 
            selection:bg-[#4ade80]/20 selection:text-white"
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