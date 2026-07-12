// import usestate
import { useState } from "react";

// import form event
import type { FormEvent } from "react";

// import icons
import { FcGoogle } from "react-icons/fc";

// auth card
export default function AuthCard() {
    // Mode toggle state: "login" or "signup"
    const [mode, setMode] = useState<"login" | "signup">("login");

    // Form field states
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (mode === "signup" && password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        // Handle your authentication logic here using current field values

        console.log(`${mode} submission processing for:`, { email, password });
    };

    return (
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div
                className="border border-zinc-200 dark:border-[#262629] bg-white/60 dark:bg-[#121214]/50 backdrop-blur-md rounded-2xl 
                w-full max-w-md p-8 md:p-10 shadow-xl dark:shadow-2xl flex flex-col justify-center items-center transition-all duration-300"
            >
                {/* Dynamic Title Header */}
                <div className="text-center md:text-left w-full">
                    <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-2xl font-bold tracking-tight transition-colors">
                        {mode === "login" ? "Welcome Back" : "Get Started"}
                    </h3>

                    <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] font-medium mt-1.5 transition-colors">
                        {mode === "login"
                            ? "Sign in to access your saved development blueprints."
                            : "Join the network to track and share configurations."
                        }
                    </p>
                </div>

                {/* Google OAuth Trigger */}
                <button
                    type="button"
                    className="w-full border border-zinc-200 dark:border-[#262629] bg-zinc-50 dark:bg-[#0c0c0e] hover:bg-zinc-100 
                    dark:hover:bg-[#161619] hover:border-zinc-300 dark:hover:border-[#38383c] py-2.5 flex flex-row justify-center 
                    items-center gap-2.5 mt-6 text-[13px] font-semibold text-zinc-800 dark:text-[#EDEEF0] rounded-xl cursor-pointer 
                    transition-all active:scale-[0.99] shadow-sm dark:shadow-none"
                >
                    <FcGoogle size={18} />
                    Continue with Google
                </button>

                {/* Text Divider Break */}
                <div className="w-full flex items-center justify-between gap-3 my-6 select-none">
                    <div className="h-px w-full bg-zinc-200 dark:bg-[#262629]" />

                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 dark:text-zinc-600 shrink-0">
                        or
                    </span>

                    <div className="h-px w-full bg-zinc-200 dark:bg-[#262629]" />
                </div>

                {/* Credentials Form Submission Portal */}
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 pl-0.5">
                            Email address
                        </label>

                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@domain.com"
                            className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                            px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 
                            focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 pl-0.5">
                            Password
                        </label>

                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 
                            py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 
                            focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                        />
                    </div>

                    {/* Conditional Confirm Password Layout Node */}
                    {mode === "signup" && (
                        <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
                            <label className="text-[10px] font-mono font-bold uppercase tracking-wide text-zinc-500 dark:text-zinc-400 pl-0.5">
                                Confirm Password
                            </label>

                            <input
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-white dark:bg-[#070708] border border-zinc-200 dark:border-zinc-800 rounded-xl 
                                px-4 py-2.5 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 
                                focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-700 shadow-inner"
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-zinc-900 dark:bg-white text-white dark:text-[#0a0a0a] py-2.5 mt-2 text-sm 
                        font-semibold rounded-xl cursor-pointer hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md active:scale-[0.99]"
                    >
                        {mode === "login" ? "Log In" : "Create Account"}
                    </button>
                </form>

                {/* Subtext Context Mode Switch Toggle */}
                <p className="text-xs text-zinc-500 dark:text-[#888a8e] mt-6 select-none">
                    {mode === "login" ? "New to the platform?" : "Already configured a profile?"}{" "}

                    <button
                        type="button"
                        onClick={() => setMode(mode === "login" ? "signup" : "login")}
                        className="text-purple-600 dark:text-purple-400 font-semibold underline hover:text-purple-500 
                        bg-transparent p-0 border-none cursor-pointer"
                    >
                        {mode === "login" ? "Sign up instead" : "Log in instead"}
                    </button>
                </p>
            </div>
        </div>
    );
}