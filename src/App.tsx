// import react
import React from "react";

// import routing components
import { Route, Routes } from "react-router-dom";

// import pages
import HomePage from "./pages/HomePage";

// main routing app component
export default function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  )
}