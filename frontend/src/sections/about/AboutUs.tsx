// import usestate
import { useState } from "react";

// stacks data
const stacks = ["react", "vite", "typescript", "nodejs"];

// code snippet content
const codeString = `// Verified by 12.4k users
import { verify } from 'opensetup/core';

const result = verify('nextjs-tailwind-auth');
console.log(result.status); // SUCCESS_`;

// custom styles
const customCodeBlockStyle = {
    backgroundColor: '#000000',
    padding: '1.5rem',
    borderRadius: '2px',
    border: '1px solid #262626',
    fontSize: '12px',
    marginTop: '0px',
    marginBottom: '0px',
};

// import components
import AboutHeader from "../../components/about/AboutHeader";
import LeftCard from "../../components/about/LeftCard";
import RightCard from "../../components/about/RightCard";

// about us component
export default function AboutUs() {
    const [copied, setCopied] = useState(false);

    // handlecopy
    const handleCopy = async () => {
        await navigator.clipboard.writeText(codeString);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <div className="relative flex flex-col justify-center items-center py-24 bg-[#0a0a0a] overflow-hidden px-30 w-full">
            {/* header */}
            <AboutHeader />

            <div className="grid grid-cols-[420px_1fr] gap-10 mt-14 w-full">
                {/* left card */}
                <LeftCard />

                {/* right card grid */}
                <RightCard
                    codeString={codeString}
                    copied={copied}
                    customCodeBlockStyle={customCodeBlockStyle}
                    handleCopy={handleCopy}
                    stacks={stacks}
                />
            </div>
        </div>
    )
}