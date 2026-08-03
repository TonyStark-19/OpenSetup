// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import sections
import ContributeHero from "../sections/contribute/ContributeHero";
import ContributionForm from "../sections/contribute/ContributionForm";
import ContributionGuidelines from "../sections/contribute/ContributionGuidelines";

// import toaster
import { Toaster } from "react-hot-toast";

// Master Page Export Framework
export default function ContributePage() {
    return (
        <>
            {/* Global Toast Notification Container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* navbar */}
            <Navbar />

            <div
                className="w-full bg-white dark:bg-[#0a0a0a] text-zinc-900 dark:text-white flex flex-col items-center 
                justify-start transition-colors duration-300 pb-16 sm:pb-24"
            >
                {/* hero section */}
                <ContributeHero />

                {/* form section */}
                <div className="w-full max-w-7xl px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10 mt-18">
                    <div className="lg:col-span-8 w-full">
                        <ContributionForm />
                    </div>

                    <div className="lg:col-span-4 w-full">
                        <ContributionGuidelines />
                    </div>
                </div>
            </div>

            {/* footer */}
            <Footer />
        </>
    );
}