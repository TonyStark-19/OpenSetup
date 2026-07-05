// import react
import React from "react";

// import routing components
import { Route, Routes } from "react-router-dom";

// import pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RequestsPage from "./pages/RequestsPage";
import ContributePage from "./pages/ContributePage";
import BrowseGuidesPage from "./pages/BrowseGuidesPage";

// import scroll to top component
import ScrollToTop from "./components/utils/Scroltotop";

// main routing app component
export default function App(): React.JSX.Element {
  return (
    <>
      <ScrollToTop scrollRef={null} />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/get-started" element={<AuthPage />} />
        <Route path="/request" element={<RequestsPage />} />
        <Route path="/contribute" element={<ContributePage />} />
        <Route path="/guides" element={<BrowseGuidesPage />} />
      </Routes>
    </>
  )
}