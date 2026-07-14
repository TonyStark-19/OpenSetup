// import hooks
import { useEffect, useState } from "react";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

// import components
import GridPattern from "../components/auth/GridPattern";

// auth success page
export default function AuthSuccess() {
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const urlToken = searchParams.get("token");
    const provider: "Google" | "Credentials" = urlToken ? "Google" : (location.state?.provider || "Credentials");

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

    // steps
    const steps = [
        provider === "Google"
            ? "Exchanging authorization code for OAuth2 tokens..."
            : "Extracting request payload and parsing credentials...",
        provider === "Google"
            ? "Decoding ID token and verifying asymmetric Google keys..."
            : "Retrieving user record and checking argon2/bcrypt password hash...",
        "Generating sign-in payload and signing stateful JSON Web Token...",
        "Serializing session context and establishing secure handshake..."
    ];

    // Synchronize token parameters immediately into storage on mount
    useEffect(() => {
        if (urlToken) {
            localStorage.setItem("authToken", urlToken);
        }
    }, [urlToken]);

    // Coordinate terminal execution logs and progress percentage increments
    useEffect(() => {
        // Balanced to hit 100% concurrently with the log lines finishing
        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 1;
            });
        }, 15);

        const logInterval = setInterval(() => {
            setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
        }, 400);

        return () => {
            clearInterval(progressInterval);
            clearInterval(logInterval);
        };
    }, [steps.length]);

    // Holds the completed state for exactly 3 seconds to avoid a white splash
    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => {
                navigate("/", { replace: true });
            }, 2000); // 2-second hold
            return () => clearTimeout(timeout);
        }
    }, [progress, navigate]);

    return (
        <div
            className="relative min-h-screen bg-white dark:bg-[#0a0a0a] flex flex-col justify-center items-center 
            px-6 overflow-hidden transition-colors duration-300"
        >
            {/* Background Grid Structure */}
            <GridPattern />

            {/* Centered Standalone Terminal Loader Block */}
            <div
                className="relative z-10 w-full max-w-xl p-6 md:p-8 bg-white/90 dark:bg-[#0b0b0c]/90 border border-zinc-200 
                dark:border-[#262629] backdrop-blur-md rounded-2xl shadow-xl dark:shadow-2xl font-mono text-zinc-500 
                dark:text-zinc-400 animate-in fade-in zoom-in-95 duration-300"
            >
                {/* Header Panel */}
                <div className="flex justify-between items-center border-b border-zinc-200 dark:border-[#262629] pb-4 mb-6">
                    <h3 className="text-zinc-900 dark:text-[#EDEEF0] text-lg font-bold font-sans tracking-tight">
                        OpenSetup
                    </h3>

                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-600">
                        SYSTEM_V2.4.0
                    </span>
                </div>

                {/* Main Terminal Message */}
                <div className="my-6">
                    <h4 className="text-zinc-900 dark:text-white text-xl font-bold tracking-tight">
                        Authenticating session<span className="text-purple-600 dark:text-purple-400 animate-pulse">..._</span>
                    </h4>

                    <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1.5">
                        Establishing secure handshake with platform architecture...
                    </p>
                </div>

                {/* Progress Metric Segment */}
                <div className="flex justify-between items-center text-[11px] font-bold tracking-wide text-zinc-500 dark:text-zinc-500 my-4 select-none">
                    <span>{progress}%</span>

                    <span className="text-purple-600 dark:text-purple-400 transition-colors duration-300">
                        {progress === 100 ? "TUNNEL_READY" : "SECURE_TUNNEL_ESTABLISHED"}
                    </span>
                </div>

                {/* Animated Log Sequence Feed */}
                <div className="space-y-1.5 text-[11px] leading-relaxed select-none min-h-20">
                    {steps.slice(0, currentStep + 1).map((step, idx) => (
                        <div
                            key={idx}
                            className="flex gap-2 items-start transition-all duration-200 animate-in fade-in slide-in-from-left-1"
                        >
                            <span className="text-zinc-400 dark:text-zinc-600 font-bold uppercase shrink-0">
                                [LOG]
                            </span>

                            <span className={idx === currentStep ? "text-zinc-900 dark:text-zinc-300" : "text-zinc-400 dark:text-zinc-500"}>
                                {step}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Footer System Specs Meta Row */}
                <div
                    className="flex justify-center items-center gap-4 text-[9px] font-bold tracking-widest text-zinc-400 
                    dark:text-zinc-600 uppercase border-t border-zinc-200 dark:border-[#262629] pt-4 mt-6"
                >
                    <span>Encrypted Connection</span>
                    <span className="h-1 w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <span>TLS 1.3</span>
                    <span className="h-1 w-1 bg-zinc-300 dark:bg-zinc-700 rounded-full" />
                    <span>AES-256</span>
                </div>
            </div>
        </div>
    );
}