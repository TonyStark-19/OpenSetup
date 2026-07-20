// import react
import React from "react";

// import routing components
import { Route, Routes } from "react-router-dom";

// import route protection components
import { ProtectedRoute } from "./components/utils/ProtectedRoute";
import { PublicRoute } from "./components/utils/PublicRoute";

// import pages
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import RequestsPage from "./pages/RequestsPage";
import ContributePage from "./pages/ContributePage";
import BrowseGuidesPage from "./pages/BrowseGuidesPage";
import AuthSuccess from "./pages/AuthSuccess";

// import scroll to top component
import ScrollToTop from "./components/utils/Scroltotop";

// main routing app component
export default function App(): React.JSX.Element {
  return (
    <>
      <ScrollToTop scrollRef={null} />

      <Routes>
        {/* Publically accessible landing page */}
        <Route path="/" element={<HomePage />} />

        {/* Auth page: Restricted to non-logged-in users only */}
        <Route
          path="/get-started"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />

        {/* Auth success page: Restricted to non-logged-in users only */}
        <Route
          path="/auth/callback"
          element={<AuthSuccess />}
        />

        {/* Protected Feature Routes */}
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <RequestsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contribute"
          element={
            <ProtectedRoute>
              <ContributePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/guides"
          element={
            <ProtectedRoute>
              <BrowseGuidesPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}