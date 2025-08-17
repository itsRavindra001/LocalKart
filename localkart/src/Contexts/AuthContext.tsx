// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type UserInfo = {
  _id: string;
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, user: UserInfo) => void;
  logout: () => void;
  userInfo: UserInfo | null;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: UserInfo) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(user));
    setToken(token);
    setUserInfo(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setToken(null);
    setUserInfo(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem("token");
        const storedUser = localStorage.getItem("userInfo");

        if (storedToken && storedUser) {
          // In a real app, you might want to verify the token here
          setToken(storedToken);
          setUserInfo(JSON.parse(storedUser));
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo");
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};