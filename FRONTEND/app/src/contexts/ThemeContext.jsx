import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const ModeContext = createContext({
  mode: "dark",
  setMode: () => {},
});

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("dark");

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

ModeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
//for possible future implementation of themes
// export const ThemeContext = createContext();

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState("retro");

//   return (
//     <ThemeContext.Provider value={{ theme, setTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// }
// ThemeProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
