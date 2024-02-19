import { useState, useContext } from "react";
import { ModeContext } from "../../contexts/ThemeContext";
import Menu2 from "./Menu2";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import logo from "../../assets/tft.jpg";

const Nav = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ModeContext);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "User Profile", path: "/UserProfile" },
    { name: "Talent", path: "/page1" },
    { name: "Task", path: "/page2" },
    { name: "UserHub", path: "/page3" },
    { name: "Sign Out", path: "/" },
  ];

  const authItems = [
    { name: "Signin", path: "/signin" },
    { name: "Signup", path: "/signup" },
  ];

  const handleButtonClick2 = (event) => {
    event.stopPropagation();
    setIsOpen2(!isOpen2);
  };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  const handleSignOut = () => {
    setIsLoggedIn({});
    navigate("/");
  };

  return (
    <div
      className={`navbar bg-base-300 relative ${mode === "dark" ? "dark" : ""}`}
    >
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          T4T 2024
          <img
            src={logo}
            alt="company logo"
            className="w-8 border-accent border-2 rounded-full"
          />
        </a>
      </div>
      <label className="cursor-pointer grid place-items-center">
        <input
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"
          onChange={toggleMode}
          checked={mode === "dark"}
        />
        <svg
          className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost"
          onClick={handleButtonClick2}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>

        {isOpen2 && (
          <Menu2
            items={isLoggedIn ? menuItems : authItems}
            setIsOpen={setIsOpen2}
            onSignOut={handleSignOut}
          />
        )}
      </div>
    </div>
  );
};

export default Nav;
