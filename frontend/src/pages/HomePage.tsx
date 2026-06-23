// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import sections
import Hero from "../sections/home/Hero";
import TechStacks from "../sections/stack/TechStacks";
import AboutUs from "../sections/about/AboutUs";
import HowItWorks from "../sections/how-it-works/HowItWorks";
import PopularGuides from "../sections/PopularGuides";
import RequestGuideCTA from "../sections/RequestGuideCTA";

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