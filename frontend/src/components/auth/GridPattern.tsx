// grid pattern
export default function GridPattern() {
    return (
        <div
            className="absolute inset-0 z-0 pointer-events-none opacity-[0.3]"
            style={{
                backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
                WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 85%)",
                maskImage: "radial-gradient(circle at 50% 50%, black 40%, transparent 85%)"
            }}
        />
    )
}