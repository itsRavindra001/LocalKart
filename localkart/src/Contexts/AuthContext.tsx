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

  // 🔹 Optional fields
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
  updateUserInfo: (updates: Partial<UserInfo>) => void;
  userInfo: UserInfo | null;
  token: string | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const storedUser = typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;

const [token, setToken] = useState<string | null>(storedToken);
const [userInfo, setUserInfo] = useState<UserInfo | null>(
  storedUser ? JSON.parse(storedUser) : null
);
const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
  !!storedToken && !!storedUser
);

  /** ✅ Login: save token + user */
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

  /** ✅ Logout: clear token + user */
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

  /** ✅ Update user info in state + localStorage */
  const updateUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfo((prev) => {
      if (!prev) return prev; // nothing to update
      const updated = { ...prev, ...updates };
      try {
        localStorage.setItem("userInfo", JSON.stringify(updated));
      } catch (e) {
        console.error("Storage error:", e);
      }
      return updated;
    });
  };

  /** ✅ Restore auth state from localStorage on first load */
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("userInfo");

      if (storedToken && storedUser) {
        const parsedUser = JSON.parse(storedUser) as UserInfo;
        setToken(storedToken);
        setUserInfo(parsedUser);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error restoring auth state:", error);
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
