// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import sections
import RequestsHero from "../sections/requests/RequestsHero";
import MakeRequest from "../sections/requests/MakeRequest";

// requests page
export default function RequestsPage() {
    return (
        <>
            <Navbar />
            <RequestsHero />
            <MakeRequest />
            <Footer />
        </>
    );
}