// grid pattern
export default function GridPattern() {
    return (
        <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.25] dark:opacity-[0.3] transition-opacity duration-300"
            style={{
                backgroundImage: `
                linear-gradient(var(--grid-color, rgba(0, 0, 0, 0.07)) 1px, transparent 1px),
                linear-gradient(90deg, var(--grid-color, rgba(0, 0, 0, 0.07)) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 85%)",
                maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 85%)"
            }}
            ref={(el) => {
                if (el) {
                    const isDark = document.documentElement.classList.contains("dark");
                    el.style.setProperty("--grid-color", isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.07)");
                }
            }}
        />
    );
}