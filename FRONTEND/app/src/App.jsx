import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav.jsx";
import HeroSection from "./components/HeroSection/HeroSection.jsx";
import Footer from "./components/Footer/Footer.jsx";

// Import your page components here
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";

function App() {
  return (
    <Router>
      <Nav
        items={[
          { name: "Home", path: "/" },
          { name: "Item 1", path: "/page1" },
          { name: "Item 2", path: "/page2" },
          { name: "Item 3", path: "/page3" },
        ]}
      />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/page1" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
