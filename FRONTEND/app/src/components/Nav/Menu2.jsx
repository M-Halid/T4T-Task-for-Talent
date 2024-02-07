import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";

const Menu2 = ({ items, setIsOpen }) => {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(
    items.find((item) => item.path === location.pathname)?.name || items[0].name
  );
  const navigate = useNavigate();
  const menuRef = useRef();

  const handleClick = (item) => {
    setActiveItem(item.name);
    navigate(item.path);
    setIsOpen(false);
    if (item.name === "Sign Out") {
      localStorage.clear();
      window.location.reload();
    }
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        !menuRef.current.contains(event.target) ||
        event.target.tagName === "A"
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [setIsOpen]);

  useEffect(() => {
    setActiveItem(
      items.find((item) => item.path === location.pathname)?.name ||
        items[0].name
    );
  }, [location.pathname, items]);

  return (
    <div
      ref={menuRef}
      className="menu shadow-lg bg-base-300  rounded-box w-30 absolute top-full right-0 border border-base-100  z-10 "
    >
      <ul>
        {items.map((item) => (
          <li key={item.name}>
            <a
              className={activeItem === item.name ? "active" : ""}
              onClick={() => handleClick(item)}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

Menu2.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default Menu2;
