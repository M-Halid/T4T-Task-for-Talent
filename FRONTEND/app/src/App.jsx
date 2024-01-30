import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext, useState, useEffect, createContext } from "react";
import { ModeContext } from "./contexts/ThemeContext";
import Nav from "./components/Nav/Nav.jsx";
import HeroSection from "./components/HeroSection/HeroSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import TaskProfile from "./components/Profiles/TaskProfile.jsx";
import UserHub from "./components/UserHub/UserHub";
import User from "./pages/User";
import { TagsProvider } from "./contexts/TagsContext.jsx";
export const AuthContext = createContext();

function App() {
  const { mode } = useContext(ModeContext);
  const [isLoggedIn, setIsLoggedIn] = useState({
    id: "",
    name: "",
    email: "",
    skills: "",
    workingFields: "",
    age: "",
    gender: "",
    location: "",
    background: "",
    resume: null,
    portfolio: "",
    github: "",
    linkedin: "",
    education: "",
    certifications: "",
    certificationFile: null,
    languages: "",
    userId: "",
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <TagsProvider>
        <Router>
          <Nav />
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/page1" element={<Page1 />} />
            <Route path="/page2" element={<Page2 />} />
            <Route path="/page3" element={<Page3 />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/create-task" element={<TaskProfile />} />
            <Route path="/UserHub" element={<UserHub />} />
            <Route path="/User" element={<User />} />
          </Routes>
          <Footer />
        </Router>
      </TagsProvider>
    </AuthContext.Provider>
  );
}

export default App;
