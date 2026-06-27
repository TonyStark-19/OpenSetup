// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import sections
import Hero from "../sections/home/Hero";
import TechStacks from "../sections/home/TechStacks";
import AboutUs from "../sections/home/AboutUs";
import HowItWorks from "../sections/home/HowItWorks";
import PopularGuides from "../sections/home/PopularGuides";
import RequestGuideCTA from "../sections/home/RequestGuideCTA";

// home page component
export default function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <AboutUs />
            <TechStacks />
            <HowItWorks />
            <PopularGuides />
            <RequestGuideCTA />
            <Footer />
        </>
    )
}