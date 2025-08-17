import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type UserInfo = {
  _id: string;
  username: string;
  email: string;
  role: string;

  // 🔹 Optional fields for Profile, Dashboard, etc.
  fullName?: string;
  phone?: string;
  address?: string;
  lastLogin?: string;
  services?: string[];
  rating?: number;
  completedJobs?: number;
  profileImage?: string;
  isVerified?: boolean;
  createdAt?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: (token: string, user: UserInfo) => void;
  logout: () => void;
  updateUserInfo: (updates: Partial<UserInfo>) => void; // ✅ new
  userInfo: UserInfo | null;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: UserInfo) => {
    try {
      localStorage.setItem("token", token);
      localStorage.setItem("userInfo", JSON.stringify(user));
    } catch (e) {
      console.error("Storage error:", e);
    }
    setToken(token);
    setUserInfo(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    } catch (e) {
      console.error("Storage error:", e);
    }
    setToken(null);
    setUserInfo(null);
    setIsLoggedIn(false);
  };

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfo((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem("userInfo", JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
      return updated;
    });
  };

  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("userInfo");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUserInfo(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error initializing auth:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, updateUserInfo, userInfo, token }}
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
