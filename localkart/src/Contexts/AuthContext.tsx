import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';


type UserInfo = {
  username: string;
  email: string;
  role: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  login: (user: UserInfo) => void;
  logout: () => void;
  userInfo: UserInfo | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const login = (user: UserInfo) => {
    setIsLoggedIn(true);
    setUserInfo(user);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userInfo', JSON.stringify(user));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserInfo(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('userInfo');

    if (loggedIn && storedUser && storedUser !== 'undefined') {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserInfo(parsedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error('Error parsing stored userInfo:', error);
        localStorage.removeItem('userInfo'); // clear bad data
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
