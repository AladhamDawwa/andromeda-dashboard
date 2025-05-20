import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { TUser } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface TUserContext {
  isAuthenticated: boolean;
  handleLogin: (user: TUser) => void;
  handleLogout: () => void;
}

const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("user_token");

      setIsAuthenticated(Boolean(token));
    };
    checkAuth();
  }, []);

  const handleLogin = async (user: TUser) => {
    const { access, refresh } = user;
    await AsyncStorage.setItem("user_token", access);
    await AsyncStorage.setItem("refresh_token", refresh);

    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user_token");
    await AsyncStorage.removeItem("refresh_token");

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
