// import link
import { Link } from "react-router-dom";

// import icons
import { Terminal } from "lucide-react";
import { FaGithub, FaLinkedin, FaGlobe } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

// import type
import type { IconType } from "react-icons";

// social links props
interface SocialProps {
    icon: IconType;
    href: string;
    label: string;
}

// social links data
const socials: SocialProps[] = [
    { icon: FaGlobe, href: "https://aditya-devfolio-one.vercel.app", label: "Portfolio" },
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/aditya-chandel-dev", label: "LinkedIn" },
    { icon: FaXTwitter, href: "https://twitter.com/iamaditya_3", label: "X (Twitter)" },
    { icon: FaGithub, href: "https://github.com/TonyStark-19", label: "GitHub" },
];

// project links
const projectLinks = [
    { title: "Browse Guides", link: "/" },
    { title: "Requests", link: "/" },
    { title: "Contribute", link: "/" },
];

// other links
const otherLinks = [
    { title: "Start on GitHub", link: "/" },
    { title: "Report an issue", link: "/" },
];

// footer component
export default function Footer() {
    // year
    const year = new Date().getFullYear();

    return (
        <footer className="w-full border-t border-[#262629]/80 bg-[#0a0a0a] backdrop-blur-md">
            {/* Upper Content Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
                {/* Brand Column */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5"
                    >
                        <div className="flex flex-row items-center gap-2.5 text-[14px] font-semibold text-[#EDEEF0] hover:opacity-90 transition tracking-tight">
                            <Terminal size={15} className="text-[#888a8e]" />
                            OpenSetup
                        </div>
                    </Link>

                    <p className="text-[#888a8e] text-[14px] leading-relaxed max-w-sm font-medium">
                        Community-curated setup guides for every dev stack. Find yours, copy the steps, and start building instantly.
                    </p>

                    {/* Social links row */}
                    <div className="flex flex-row items-center gap-2.5 mt-2">
                        {socials.map(({ icon: Icon, href, label }, idx) => (
                            <a
                                key={idx}
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={label}
                                className="p-2 rounded-lg border border-[#262629] bg-[#121214] text-[#888a8e] hover:text-[#EDEEF0] 
                                hover:border-[#38383c] transition-all duration-200 hover:scale-[1.02]"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Product Links Column */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold tracking-wider text-[#525256] uppercase font-mono">
                        Product
                    </h4>

                    <ul className="flex flex-col gap-2.5">
                        {projectLinks.map((projectLink, idx) => (
                            <li key={idx}>
                                <Link
                                    to={projectLink.link}
                                    className="text-[#888a8e] hover:text-[#EDEEF0] transition-colors text-[14px] font-medium"
                                >
                                    {projectLink.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Other Links Column */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold tracking-wider text-[#525256] uppercase font-mono">
                        Resources
                    </h4>

                    <ul className="flex flex-col gap-2.5">
                        {otherLinks.map((otherLink, idx) => (
                            <li key={idx}>
                                <Link
                                    to={otherLink.link}
                                    className="text-[#888a8e] hover:text-[#EDEEF0] transition-colors text-[14px] font-medium"
                                >
                                    {otherLink.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright Strip */}
            <div className="border-t border-[#262629]/60">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-medium tracking-wide">
                    {/* Copyright Info */}
                    <div className="text-[#525256] flex items-center gap-1.5">
                        <span>© {year}</span>
                        <span className="text-[#888a8e] font-semibold">OpenSetup</span>
                        <span className="text-[#262629]">·</span>
                        <span>All rights reserved.</span>
                    </div>

                    {/* Attribution */}
                    <p className="text-[#525256]">
                        Made with <span className="text-[#ef4444] opacity-80 animate-pulse">♥</span> by{" "}
                        <a
                            href="https://github.com/TonyStark-19"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#888a8e] hover:text-[#EDEEF0] transition-colors font-semibold"
                        >
                            Aditya Chandel
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}