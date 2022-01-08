import { useEffect, useState, createContext } from "react";
import { authService } from "../services";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await authService.getCurrentUser();
      if (res.status === 200) {
        setCurrentUser(res.data.user);
      }
      setTimeout(() => {
        setFetching(false);
      }, 1500);
    } catch (err) {
      setTimeout(() => {
        setFetching(false);
      }, 1500);
    }
  };

  return (
    <AuthContext.Provider
      value={{ fetching, currentUser, setCurrentUser, setFetching }}
    >
      {!fetching && children}
    </AuthContext.Provider>
  );
};
