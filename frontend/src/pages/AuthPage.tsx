// import hooks
import { useState, useEffect } from "react";

// import icons
import { Sparkles, Code2, Users } from "lucide-react";

// import toaster
import { Toaster } from "react-hot-toast";

// import components
import BackToHome from "../components/auth/BackToHome";
import GridPattern from "../components/auth/GridPattern";
import Info from "../sections/auth/Info";
import AuthCard from "../sections/auth/AuthCard";

// features data
const features = [
  {
    icon: <Code2 size={14} className="text-[#888a8e]" />,
    title: "Copy-Paste Ready Snippets",
    description: "Tested boilerplate configurations for React, Vite, Tailwind v4, Express, and more."
  },
  {
    icon: <Sparkles size={14} className="text-[#888a8e]" />,
    title: "Custom Workspace Bookmarks",
    description: "Save your preferred environment structures to your profile for rapid bootstrapping."
  },
  {
    icon: <Users size={14} className="text-[#888a8e]" />,
    title: "Community Maintained",
    description: "Open source validation ensures guides stay fully patched to the latest version releases."
  },
]

// auth page
export default function AuthPage() {
  // theme toggle states
  const [isDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // update dom
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
    <div
      className="relative min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col justify-center items-center px-8 overflow-hidden pt-20 
      lg:pt-0 transition-colors duration-300"
    >
      {/* Global Toast Notification Container */}
      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      {/* Floating Back button */}
      <BackToHome />

      {/* Background Grid Pattern */}
      <GridPattern />

      {/* Main Grid Wrapper */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center py-8">
        {/* OpenSetup Info */}
        <Info features={features} />

        {/* Authentication Card Frame */}
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
          <AuthCard />
        </div>
      </div>
    </div>
  );
}