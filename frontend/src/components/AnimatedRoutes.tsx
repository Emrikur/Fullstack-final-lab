
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Horoscope from "../pages/Horoscope";
import LandingPage from "../pages/LandingPage";
import Admin from "../pages/Admin";
import { AnimatePresence } from "framer-motion";
import Dreams from "../pages/Dreams";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/:user" element={<Home />} />
        <Route path="/horoscope" element={<Horoscope />} />
        <Route path="/dreams" element={<Dreams />} />
        <Route path="/admin" element={<Admin />} />
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
