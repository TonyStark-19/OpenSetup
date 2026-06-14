// imporr usestate and useeffect
import { useState, useEffect } from "react";

// import link
import { Link } from "react-router-dom";

// import icons
import { Terminal, Sun, Moon } from "lucide-react";

// navlinks data
const Navlinks = ["Browse Guides", "Requests", "Contribute"];

// navbar component
export default function Navbar() {
    // Theme toggle state
    const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
        const savedTheme = localStorage.getItem("theme");
        return savedTheme ? savedTheme === "dark" : true;
    });

    // Synchronize actual DOM class updates with state
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-3.5 border-b border-[#262629]/80 w-full bg-[#0a0a0af2] backdrop-blur-md">
            <div className="flex flex-row justify-between items-center w-full max-w-7xl px-6 md:px-8">
                {/* Brand */}
                <Link
                    to="/"
                    className="flex-1 flex justify-start"
                >
                    <div
                        className="flex flex-row items-center gap-2.5 text-md font-semibold text-[#EDEEF0] hover:opacity-90 
                        transition cursor-pointer tracking-tight"
                    >
                        <Terminal size={15} className="text-[#888a8e]" />
                        OpenSetup
                    </div>
                </Link>

                {/* Navlinks / Center Section */}
                <div className="hidden md:flex flex-row justify-center items-center gap-7 flex-1">
                    {Navlinks.map((navlink, idx) => (
                        <p
                            key={idx}
                            className="text-[#888a8e] hover:text-[#EDEEF0] transition text-[14px] font-medium cursor-pointer"
                        >
                            {navlink}
                        </p>
                    ))}
                </div>

                {/* Utilities & Auth */}
                <div className="flex flex-row justify-end items-center gap-4 flex-1">
                    {/* Theme Toggle Button */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="p-2 rounded-full border border-[#262629] bg-[#121214] text-[#888a8e] hover:text-[#EDEEF0] 
                        hover:border-[#38383c] transition-colors cursor-pointer"
                        aria-label="Toggle theme"
                    >
                        {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
                    </button>

                    {/* separator line */}
                    <span className="h-4 w-px bg-[#262629]" />

                    {/* Login */}
                    <button className="text-[#888a8e] hover:text-[#EDEEF0] transition text-[14px] font-medium cursor-pointer">
                        Login
                    </button>

                    {/* Signup */}
                    <button
                        className="text-[14px] font-semibold cursor-pointer py-1.5 px-4 bg-[#EDEEF0] hover:bg-white text-black rounded-full 
                        transition active:scale-[0.98]"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </nav>
    );
}