// import dependencies
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Guide } from '../models/Guide';

// env config
dotenv.config();

// guides data
const sampleGuides = [
    {
        mdFileName: "docker-desktop.md",
        title: "Docker Desktop Setup",
        description: "Complete development containerization guide with custom network configs and optimized memory limits.",
        typeOfGuide: "CONFIG",
        categoryOfGuide: "DevOps"
    },
    {
        mdFileName: "n8n-docker.md",
        title: "n8n Self-Hosted via Docker",
        description: "Production-ready docker-compose workflow layout for self-hosting n8n with postgreSQL integrations.",
        typeOfGuide: "INTEGRATION",
        categoryOfGuide: "DevOps"
    },
    {
        mdFileName: "native-expo-deployment.md",
        title: "React Native Expo Production Build",
        description: "Step-by-step pipeline blueprint configuring EAS CLI credentials for App Store and Google Play submissions.",
        typeOfGuide: "CONFIG",
        categoryOfGuide: "Mobile"
    },
    {
        mdFileName: "react-native-expo.md",
        title: "React Native + Expo Scaffold",
        description: "Mobile base template configured with TypeScript, NativeWind styles, and Prettier rules out of the box.",
        typeOfGuide: "SCAFFOLD",
        categoryOfGuide: "Mobile"
    },
    {
        mdFileName: "tailwind-css-js.md",
        title: "Tailwind CSS v4 + Vanilla JS",
        description: "Lightweight frontend layout integration linking Tailwind CSS utility engine directly inside bare HTML/JS.",
        typeOfGuide: "INTEGRATION",
        categoryOfGuide: "Frontend"
    },
    {
        mdFileName: "tailwind-css-ts.md",
        title: "Tailwind CSS v4 + TypeScript",
        description: "Modern static application workflow bundle with type checking and optimized bundle post-processing rules.",
        typeOfGuide: "INTEGRATION",
        categoryOfGuide: "Frontend"
    },
    {
        mdFileName: "vite-react-js.md",
        title: "Vite + React JS Standard",
        description: "Highly optimized development environment scaffolding pre-built with React router DOM setup modules.",
        typeOfGuide: "SCAFFOLD",
        categoryOfGuide: "Frontend"
    },
    {
        mdFileName: "vite-react-ts.md",
        title: "Vite + React + TS",
        description: "Optimized production-ready scaffold with Tailwind CSS, ESLint, and Prettier pre-configured.",
        typeOfGuide: "SCAFFOLD",
        categoryOfGuide: "Frontend"
    }
];

// seed in db
const seedDatabase = async () => {
    try {
        // Connect to MongoDB using your URI environment variables
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('Connected to MongoDB for database seeding configuration...');

        // Clear out existing sample logs to avoid unique key constraints conflicts
        await Guide.deleteMany({ contributedBy: 'adityachandel' });
        console.log('Cleared previous default system contributor configuration records.');

        // Format data to fit backend database model guidelines
        const formattedGuides = sampleGuides.map(guide => ({
            ...guide,
            contributedBy: 'adityachandel',
            profileImage: '/other/Profile.png',
            upvotes: 0,
            views: 0,
            status: 'VERIFIED',
            mdFileUrl: `https://opensetup-guides.s3.amazonaws.com/${guide.mdFileName}`
        }));

        // Write batch records inside database collection index
        await Guide.insertMany(formattedGuides);
        console.log('Successfully seeded database data array variables payload!');

        process.exit(0);
    } catch (error) {
        console.error('Error attempting database records generation seeds payload:', error);
        process.exit(1);
    }
};

// call function
seedDatabase();