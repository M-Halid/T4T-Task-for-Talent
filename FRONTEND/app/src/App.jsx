import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import { ModeContext } from "./contexts/ThemeContext";
import Nav from "./components/Nav/Nav.jsx";
import HeroSection from "./components/HeroSection/HeroSection.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page4 from "./pages/Page4";
import TaskProfile from "./components/Profiles/TaskProfile.jsx";
import UserHub from "./components/UserHub/UserHub";
import GetStarted from "./components/GetStarted/GetStarted.jsx";
import Contact from "./components/Contact/Contact.jsx";
import About from "./components/About/About.jsx";
import UserProfile from "./components/Profiles/UserProfile";
import { TagsProvider } from "./contexts/TagsContext.jsx";
import { UserHubTagsProvider } from "./contexts/UserHubTagsContext.jsx";
import UserContext from "./contexts/UserContext";
import TalentContext from "./contexts/TalentContext";
import TaskContext from "./contexts/TaskContext";

function App() {
  const { mode } = useContext(ModeContext);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userProfile, setUserProfile] = useState({
    id: "",
    email: "",
    name: "",
    age: "",
    gender: "",
    location: "",
    Beschreibungstext: "",
    linkedin: "",
    education: "",
    languages: "",
  });

  const [talentProfile, setTalentProfile] = useState({
    name: "",
    skills: "",
    workingFields: "",
    background: "",
    resume: null,
    portfolio: "",
    github: "",
    education: "",
    certifications: "",
    certificationFile: null,
  });

  const [taskProfile, setTaskProfile] = useState({
    taskDescription: "",
    requiredSkills: "",
    experienceLevel: "",
    clientName: "",
    clientIndustry: "",
    clientWebsite: "",
    pay: "",
    clientDescription: "",
  });

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    const storedCurrentUser = localStorage.getItem("currentUser");
    if (storedIsLoggedIn) {
      setIsLoggedIn(JSON.parse(storedIsLoggedIn));
    }
    if (storedCurrentUser) {
      const { user, talent, task } = JSON.parse(storedCurrentUser);
      setUserProfile(user);
      setTalentProfile(talent);
      setTaskProfile(task);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
    const currentUser = {
      user: userProfile,
      talent: talentProfile,
      task: taskProfile,
    };
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [isLoggedIn, userProfile, talentProfile, taskProfile]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <AuthProvider>
      <TagsProvider>
        <UserContext.Provider value={{ userProfile, setUserProfile }}>
          <TalentContext.Provider value={{ talentProfile, setTalentProfile }}>
            <TaskContext.Provider value={{ taskProfile, setTaskProfile }}>
              <UserHubTagsProvider>
                <Router>
                  <div className="flex flex-col min-h-screen">
                    <Nav />
                    <div className="flex-grow">
                      <Routes>
                        <Route path="/" element={<HeroSection />} />
                        <Route path="/GetStarted" element={<GetStarted />} />
                        <Route path="/page1" element={<Page1 />} />
                        <Route path="/page2" element={<Page2 />} />
                        <Route path="/page3" element={<Page3 />} />
                        <Route path="/page4" element={<Page4 />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/create-task" element={<TaskProfile />} />
                        {taskProfile && taskProfile.taskDescription && (
                          <p>{taskProfile.taskDescription}</p>
                        )}
                        <Route path="/UserHub" element={<UserHub />} />
                        <Route path="/UserProfile" element={<UserProfile />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/about" element={<About />} />
                      </Routes>
                    </div>
                    <Footer />
                  </div>
                </Router>
              </UserHubTagsProvider>
            </TaskContext.Provider>
          </TalentContext.Provider>
        </UserContext.Provider>
      </TagsProvider>
    </AuthProvider>
  );
}

export default App;
