import { createContext, useState } from "react";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [talentProfile, setTalentProfile] = useState(null);
  const [taskProfile, setTaskProfile] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  return (
    <AuthContext.Provider
      value={{
        authToken,
        setAuthToken,
        isLoggedIn,
        setIsLoggedIn,
        userProfile,
        setUserProfile,
        talentProfile,
        setTalentProfile,
        taskProfile,
        setTaskProfile,
        userEmail,
        setUserEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
