// import usestate and useeffect
import { useState, useEffect } from "react";

// import link
import { Link } from "react-router-dom";

// import icons
import { Terminal, Sun, Moon } from "lucide-react";

// import custom auth hook
import { useAuth } from "../hooks/useAuth";

// navlinks data
const Navlinks = [
    { title: "Browse Guides", link: "/guides" },
    { title: "Requests", link: "/request" },
    { title: "Contribute", link: "/contribute" }
];

// navbar component
export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();

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
        <nav
            className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center py-3.5 border-b border-zinc-200/80 dark:border-zinc-900/80 w-full 
            bg-white/90 dark:bg-[#0a0a0a]/95 backdrop-blur-md transition-colors duration-300"
        >
            <div className="flex flex-row justify-between items-center w-full max-w-7xl px-6 md:px-8">
                {/* Brand */}
                <Link
                    to="/"
                    className="flex-1 flex justify-start"
                >
                    <div
                        className="flex flex-row items-center gap-2.5 text-md font-semibold text-zinc-900 dark:text-[#EDEEF0] 
                        hover:opacity-90 transition cursor-pointer tracking-tight"
                    >
                        <Terminal size={15} className="text-zinc-500 dark:text-[#888a8e]" />
                        OpenSetup
                    </div>
                </Link>

                {/* Navlinks / Center Section - Rendered only post login */}
                <div className="hidden md:flex flex-row justify-center items-center gap-7 flex-1">
                    {isLoggedIn && Navlinks.map((navlink, idx) => (
                        <Link key={idx} to={navlink.link}>
                            <p className="text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0] transition 
                                text-[14px] font-medium cursor-pointer"
                            >
                                {navlink.title}
                            </p>
                        </Link>
                    ))}
                </div>

                {/* Utilities & Auth */}
                <div className="flex flex-row justify-end items-center gap-4 flex-1">
                    {/* Theme Toggle Button with smooth icon transition */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className="relative w-9 h-9 flex items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 
                        bg-zinc-50 dark:bg-[#121214] text-zinc-500 dark:text-[#888a8e] hover:text-zinc-900 dark:hover:text-[#EDEEF0]
                        hover:border-zinc-300 dark:hover:border-[#38383c] transition-all duration-300 cursor-pointer overflow-hidden"
                        aria-label="Toggle theme"
                    >
                        {/* Sun Icon */}
                        <div
                            className={`absolute transition-all duration-300 transform 
                            ${isDarkMode
                                    ? "rotate-0 scale-100 opacity-100"
                                    : "rotate-90 scale-0 opacity-0"
                                }`}
                        >
                            <Sun size={16} />
                        </div>

                        {/* Moon Icon */}
                        <div
                            className={`absolute transition-all duration-300 transform 
                            ${isDarkMode
                                    ? "-rotate-90 scale-0 opacity-0"
                                    : "rotate-0 scale-100 opacity-100"
                                }`}
                        >
                            <Moon size={16} />
                        </div>
                    </button>

                    {/* separator line */}
                    <span className="h-4 w-px bg-zinc-200 dark:bg-[#262629]" />

                    {/* Dynamic Auth Action Node */}
                    {isLoggedIn ? (
                        <button
                            onClick={logout}
                            className="text-[14px] font-medium cursor-pointer py-1.5 px-4 rounded-full border border-zinc-200 dark:border-zinc-800 
                            bg-zinc-50 dark:bg-[#121214] text-zinc-600 dark:text-[#888a8e] hover:text-red-600 dark:hover:text-red-400 
                            hover:border-red-200 dark:hover:border-red-950/50 hover:bg-red-50/50 dark:hover:bg-red-950/20 
                            transition-all duration-200 active:scale-[0.98]"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/get-started">
                            <button
                                className="text-[14px] font-semibold cursor-pointer py-1.5 px-4 bg-zinc-900 dark:bg-[#EDEEF0] hover:bg-zinc-800 
                                dark:hover:bg-white text-white dark:text-black rounded-full transition active:scale-[0.98]"
                            >
                                Get Started
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}