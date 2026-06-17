// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import sections
import Hero from "../sections/home/Hero";

// home page component
export default function HomePage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Footer />
        </>
    )
}