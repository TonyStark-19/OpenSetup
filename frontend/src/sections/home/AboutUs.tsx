// import usestate
import { useState } from "react";

// stacks data
const stacks = ["react", "vite", "typescript", "nodejs"];

// code snippet content
const codeString = `// Verified by 12.4k users
import { verify } from 'opensetup/core';

const result = verify('nextjs-tailwind-auth');
console.log(result.status); // SUCCESS_`;

// import components
import AboutHeader from "../../components/home/about/AboutHeader";
import LeftCard from "../../components/home/about/LeftCard";
import RightCard from "../../components/home/about/RightCard";

// about us component
export default function AboutUs() {
    const [copied, setCopied] = useState(false);

    // handlecopy
    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            className="relative flex flex-col justify-center items-center py-16 sm:py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden 
            px-6 md:px-16 lg:px-24 w-full transition-colors duration-300"
        >
            {/* Sync structured container width layout */}
            <div className="w-full max-w-7xl flex flex-col gap-12">
                {/* about header */}
                <AboutHeader />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:mt-4 w-full items-stretch">
                    {/* Left structural element wrapper */}
                    <div className="lg:col-span-4 flex">
                        <LeftCard />
                    </div>

                    {/* Right structural element wrapper */}
                    <div className="lg:col-span-8 flex">
                        <RightCard
                            codeString={codeString}
                            copied={copied}
                            handleCopy={handleCopy}
                            stacks={stacks}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}