import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import TestPage2 from "../pages/Page2";
import LandingPage from "../pages/LandingPage";
import { AnimatePresence } from "framer-motion";
import Dreams from "../pages/Dreams";

function AnimatedRoutes() {
  const location = useLocation();
  const apa = "Hej";
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/:user" element={<Home />} />
        <Route path="/page2" element={<TestPage2 msg={apa} />} />
        <Route path="/dreams" element={<Dreams />} />
        <Route
          path="*"
          element={
            <div>
              <h1>You found the nightmare web...</h1> <p>404 not found</p>
            </div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
