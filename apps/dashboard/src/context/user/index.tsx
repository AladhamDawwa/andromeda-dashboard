import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";
import { TUser } from "@/types/user";

interface TUserContext {
  isAuthenticated: boolean;
  handleLogin: (user: TUser) => void;
  handleLogout: () => void;
}

const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    Boolean(Cookies.get("user_token"))
  );

  const handleLogin = (user: TUser) => {
    const { access, refresh } = user;
    Cookies.set("user_token", access);
    Cookies.set("refresh_token", refresh);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    Cookies.remove("user_token");
    Cookies.remove("refresh_token");
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ isAuthenticated, handleLogin, handleLogout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): TUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
