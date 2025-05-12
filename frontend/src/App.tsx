import Home from "./pages/Home";
import TestPage2 from "./pages/TestPage2";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  const apa = "Hej";

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="testpage2" element={<TestPage2 msg={apa} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
