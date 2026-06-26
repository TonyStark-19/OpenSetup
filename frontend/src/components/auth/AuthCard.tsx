// import icons
import { FcGoogle } from "react-icons/fc";

// auth card
export default function AuthCard() {
    return (
        <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <div
                className="border border-zinc-200 dark:border-[#262629] bg-white/60 dark:bg-[#121214]/50 backdrop-blur-md rounded-2xl 
                w-full max-w-md p-8 md:p-10 shadow-xl dark:shadow-2xl flex flex-col justify-center items-center transition-all duration-300"
            >
                <div className="text-center md:text-left w-full">
                    <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-2xl font-bold tracking-tight transition-colors">
                        Get Started
                    </h3>
                    <p className="text-zinc-500 dark:text-[#888a8e] text-[13px] font-medium mt-1.5 transition-colors">
                        Join the network to track and share configurations.
                    </p>
                </div>

                {/* Google OAuth Trigger */}
                <button
                    className="w-full border border-zinc-200 dark:border-[#262629] bg-zinc-50 dark:bg-[#0c0c0e] hover:bg-zinc-100 
                    dark:hover:bg-[#161619] hover:border-zinc-300 dark:hover:border-[#38383c] py-2.5 flex flex-row justify-center 
                    items-center gap-2.5 mt-8 text-[13px] font-semibold text-zinc-800 dark:text-[#EDEEF0] rounded-xl cursor-pointer 
                    transition-all active:scale-[0.99] shadow-sm dark:shadow-none"
                >
                    <FcGoogle size={18} />
                    Continue with Google
                </button>

                {/* Legal Disclaimer */}
                <p className="text-center text-zinc-400 dark:text-[#525256] text-[11px] font-medium leading-relaxed mt-8 max-w-70 transition-colors">
                    By continuing, you become a part of an open-source community to learn, collaborate, and share your setup guides.
                </p>
            </div>
        </div>
    );
}