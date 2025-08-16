// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type UserInfo = {
  _id: string;
  username: string;
  email: string;
  role: string;
  fullName?: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  createdAt?: string;
  lastLogin?: string;
  isVerified?: boolean;
  services?: string[];
  rating?: number;
  completedJobs?: number;
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
  userInfo: UserInfo | null;
  updateUserInfo: (updatedInfo: Partial<UserInfo>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const login = (user: UserInfo) => {
    setIsLoggedIn(true);
    setUserInfo({
      ...user,
      lastLogin: new Date().toISOString(),
      createdAt: user.createdAt || new Date().toISOString(),
      isVerified: user.isVerified || false,
    });
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userInfo", JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  const updateUserInfo = (updatedInfo: Partial<UserInfo>) => {
    if (userInfo) {
      const newUserInfo = { ...userInfo, ...updatedInfo };
      setUserInfo(newUserInfo);
      localStorage.setItem("userInfo", JSON.stringify(newUserInfo));
    }
  };

  useEffect(() => {
    const loadUserData = () => {
      try {
        const loggedIn = localStorage.getItem("isLoggedIn") === "true";
        const storedUser = localStorage.getItem("userInfo");

        if (loggedIn && storedUser && storedUser !== "undefined") {
          const parsedUser: UserInfo = JSON.parse(storedUser);
          if (parsedUser && parsedUser._id) {
            setUserInfo({
              ...parsedUser,
              lastLogin: parsedUser.lastLogin || new Date().toISOString(),
              createdAt: parsedUser.createdAt || new Date().toISOString(),
              isVerified: parsedUser.isVerified || false,
            });
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error("Error reading user from localStorage:", error);
        localStorage.removeItem("userInfo");
      }
    };

    loadUserData();
  }, []);

  return (
    <AuthContext.Provider 
      value={{ isLoggedIn, login, logout, userInfo, updateUserInfo }}
    >
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