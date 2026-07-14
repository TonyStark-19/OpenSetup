// import navbar and footer
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// import toaster
import { Toaster } from "react-hot-toast";

// import sections
import RequestsHero from "../sections/requests/RequestsHero";
import MakeRequest from "../sections/requests/MakeRequest";

// requests page
export default function RequestsPage() {
    return (
        <>
            {/* Global Toast Notification Container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <Navbar />
            <RequestsHero />
            <MakeRequest />
            <Footer />
        </>
    );
}