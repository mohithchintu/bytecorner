import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken.slice(0, -12));
      setUid(savedToken.slice(-12));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (newToken, id) => {
    localStorage.setItem("token", newToken + id);
    setUid(id);
    setToken(newToken);
    setIsAuthenticated(true);
  };

  const getid = () => {
    return uid;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUid("");
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ isAuthenticated, login, logout, getid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
