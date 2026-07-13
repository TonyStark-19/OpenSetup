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
    { title: "Browse Guides", link: "/guides" },
    { title: "Requests", link: "/request" },
    { title: "Contribute", link: "/contribute" },
];

// other links
const otherLinks = [
    { title: "Start on GitHub", link: "https://github.com/TonyStark-19/OpenSetup" },
    { title: "Report an issue", link: "https://github.com/TonyStark-19/OpenSetup/issues" },
];

// footer component
export default function Footer() {
    // Current year metric sync
    const year = 2026;

    return (
        <footer
            className="w-full border-t border-zinc-200/80 dark:border-zinc-900/80 bg-white dark:bg-[#0a0a0a] 
            backdrop-blur-md transition-colors duration-300"
        >
            {/* Upper Content Section */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 md:py-16 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-10">
                {/* Brand Column */}
                <div className="md:col-span-2 flex flex-col gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 w-max"
                    >
                        <div
                            className="flex flex-row items-center gap-2.5 text-[16px] font-semibold text-zinc-900 dark:text-[#EDEEF0] 
                            hover:opacity-90 transition tracking-tight">

                            <Terminal size={15} className="text-zinc-500 dark:text-[#888a8e]" />
                            OpenSetup
                        </div>
                    </Link>

                    <p className="text-zinc-500 dark:text-[#888a8e] text-[14px] leading-relaxed max-w-sm font-medium transition-colors">
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
                                className="p-2 rounded-lg border dark:border-[#262629] bg-zinc-50 dark:bg-[#121214] 
                                text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0] border-zinc-200 
                                dark:hover:border-[#38383c] hover:border-zinc-300 transition-all duration-200 hover:scale-[1.02]"
                            >
                                <Icon size={16} />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Product Links Column */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold tracking-wider text-zinc-400 dark:text-[#525256] uppercase font-mono transition-colors">
                        Product
                    </h4>

                    <ul className="flex flex-col gap-2.5">
                        {projectLinks.map((projectLink, idx) => (
                            <li key={idx}>
                                <Link
                                    to={projectLink.link}
                                    className="text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0] 
                                    transition-colors text-[14px] font-medium"
                                >
                                    {projectLink.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Other Links Column */}
                <div className="flex flex-col gap-3">
                    <h4 className="text-[12px] font-bold tracking-wider text-zinc-400 dark:text-[#525256] uppercase font-mono transition-colors">
                        Resources
                    </h4>

                    <ul className="flex flex-col gap-2.5">
                        {otherLinks.map((otherLink, idx) => (
                            <li key={idx}>
                                <a
                                    href={otherLink.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0] 
                                    transition-colors text-[14px] font-medium"
                                >
                                    {otherLink.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* Bottom Copyright Strip */}
            <div className="border-t border-zinc-200/60 dark:border-[#262629]/60 transition-colors">
                <div className="max-w-7xl mx-auto px-6 md:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs font-medium tracking-wide">
                    {/* Copyright Info */}
                    <div className="text-zinc-400 dark:text-[#525256] flex items-center gap-1.5 transition-colors">
                        <span>© {year}</span>
                        <span className="text-zinc-700 dark:text-[#888a8e] font-semibold transition-colors">OpenSetup</span>
                        <span className="text-zinc-200 dark:text-[#262629]">·</span>
                        <span>All rights reserved.</span>
                    </div>

                    {/* Attribution */}
                    <p className="text-zinc-400 dark:text-[#525256] transition-colors">
                        Made with <span className="text-[#ef4444] opacity-80 animate-pulse">♥</span> by{" "}
                        <a
                            href="https://github.com/TonyStark-19"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-zinc-700 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0] transition-colors font-semibold"
                        >
                            Aditya Chandel
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}