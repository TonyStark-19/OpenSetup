// stack item props
export interface StackItem {
    name: string;
    icon: string;
}

// stack data list
const stackData: StackItem[] = [
    { name: "Anaconda", icon: "Anaconda.png" },
    { name: "AWS", icon: "AWS.png" },
    { name: "Express.js", icon: "Express.png" },
    { name: "Google Cloud", icon: "Google.png" },
    { name: "Jupyter", icon: "Jupyter.png" },
    { name: "MongoDB", icon: "MongoDB.png" },
    { name: "Mongoose.js", icon: "Mongoose.js.png" },
    { name: "MySQL", icon: "MySQL.png" },
    { name: "Node.js", icon: "Node.js.png" },
    { name: "Postman", icon: "Postman.png" },
    { name: "React", icon: "React.png" },
    { name: "Streamlit", icon: "Streamlit.png" },
    { name: "Tailwind CSS", icon: "Tailwind CSS.png" },
    { name: "TypeScript", icon: "TypeScript.png" },
    { name: "Vercel", icon: "Vercel.png" },
    { name: "Vite.js", icon: "Vite.js.png" },
];

// Split arrays for different rows
const firstRow = [...stackData];
const secondRow = [...stackData].reverse();

// import components
import Header from "../../components/home/stack/Header";
import ScrollingStacks from "../../components/home/stack/ScrollingStacks";
import Stats from "../../components/home/stack/Stats";

// tech stacks section
export default function TechStacks() {
    return (
        <section
            className="relative flex flex-col justify-center items-center py-16 sm:py-24 bg-white dark:bg-[#0a0a0a] overflow-hidden 
            transition-colors duration-300 border-t border-zinc-200 dark:border-zinc-900"
        >
            {/* Header Content */}
            <Header />

            {/* INFINITE TICKER WRAPPER */}
            <ScrollingStacks
                firstRow={firstRow}
                secondRow={secondRow}
            />

            {/* Platform Stats Footer Block */}
            <Stats />
        </section>
    );
}