import { useState } from "react";
import Menu from "./Menu";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const items = [
    { name: "Home", path: "/" },
    { name: "Item 1", path: "/page1" },
    { name: "Item 2", path: "/page2" },
    { name: "Item 3", path: "/page3" },
  ];
  const navigate = useNavigate();

  const handleButtonClick = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div className="navbar bg-base-100 relative">
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
        <button className="btn btn-square btn-ghost">
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
      </div>
      {isOpen && <Menu items={items} setIsOpen={setIsOpen} />}
    </div>
  );
};

export default Nav;
