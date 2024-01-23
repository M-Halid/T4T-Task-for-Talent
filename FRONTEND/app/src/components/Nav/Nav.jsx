import { useState, useContext } from "react";
import { ModeContext } from "../../contexts/ThemeContext";
import Menu from "./Menu";
import Menu2 from "./Menu2";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const navigate = useNavigate();
  const { mode, setMode } = useContext(ModeContext);

  const menu1Items = [
    { name: "Home", path: "/" },
    { name: "Item 1", path: "/page1" },
    { name: "Item 2", path: "/page2" },
    { name: "Item 3", path: "/page3" },
  ];
  const menu2Items = [
    { name: "Signin", path: "/signin" },
    { name: "Signup", path: "/signup" },
  ];

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };
  const handleButtonClick2 = (event) => {
    event.stopPropagation();
    setIsOpen2(!isOpen2);
  };
  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "dark" ? "light" : "dark"));
  };

  return (
    <div
      className={`navbar bg-base-100 relative ${mode === "dark" ? "dark" : ""}`}
    >
      <div className="flex-none">
        <button
          className="btn btn-square btn-ghost"
          onClick={handleButtonClick}
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
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost text-xl" onClick={() => navigate("/")}>
          T4T 2024
        </a>
      </div>
      <div className="flex-none">
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
        {isOpen && <Menu items={menu1Items} setIsOpen={setIsOpen} />}
        {isOpen2 && <Menu2 items={menu2Items} setIsOpen={setIsOpen2} />}
      </div>
    </div>
  );
};

export default Nav;
