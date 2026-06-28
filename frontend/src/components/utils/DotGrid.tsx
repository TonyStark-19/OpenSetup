// dot grid background
export default function DotGrid() {
    return (
        <>
            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-[0.4] dark:opacity-[0.22] transition-opacity duration-300"
                style={{
                    backgroundImage: "radial-gradient(rgba(0,0,0,0.25) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            />

            <div
                className="absolute inset-0 z-0 pointer-events-none opacity-0 dark:opacity-[0.22] transition-opacity duration-300"
                style={{
                    backgroundImage: "radial-gradient(rgba(255,255,255,0.25) 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}
            />
        </>
    )
}